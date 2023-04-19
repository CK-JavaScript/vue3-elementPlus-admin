<template>
  <div class="home">
    <div class="userInfo">
      <el-avatar :size="50" :src="storeUser.userInfo.avatar" />
      <div>
        <p class="name">你好 {{ storeUser.userInfo.username }}</p>
      </div>
    </div>
    <div class="charts-case">
      <div class="charts-chunk">
        <div ref="chartsDiscount" style="width: 100%; height: 400px"></div>
      </div>
      <div class="charts-chunk">
        <div ref="chartsCake" style="width: 100%; height: 400px"></div>
      </div>
      <div class="charts-chunk">
        <div ref="chartsColumn" style="width: 100%; height: 400px"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { useUser } from "@/store/user.js";
const storeUser = useUser();

// 定义变量内容
const chartsDiscount = ref();
const chartsCake = ref();
const chartsColumn = ref();
const chartsObj = {
  chartsDiscount: "",
  chartsCake: "",
  chartsColumn: "",
  myCharts: [],
};

// 初始化折线图
function initDeicount() {
  chartsObj.chartsDiscount = echarts.init(chartsDiscount.value);
  const option = {
    title: {
      text: "周访问量",
      top: "2%",
      left: "2%",
    },
    legend: {
      top: "8%",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        stack: "Total",
        type: "line",
      },
    ],
  };
  chartsObj.chartsDiscount.setOption(option);
  chartsObj.myCharts.push(chartsObj.chartsDiscount);
}

// 初始化饼图
function initCake() {
  chartsObj.chartsCake = echarts.init(chartsCake.value);
  const option = {
    title: {
      text: "周访问量",
      top: "2%",
      left: "2%",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "8%",
      left: "center",
    },
    series: [
      {
        name: "地区值",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "周一" },
          { value: 735, name: "周二" },
          { value: 560, name: "周三" },
          { value: 580, name: "周四" },
          { value: 484, name: "周五" },
          { value: 300, name: "周六" },
          { value: 167, name: "周日" },
        ],
      },
    ],
  };
  chartsObj.chartsCake.setOption(option);
  chartsObj.myCharts.push(chartsObj.chartsCake);
}

// 初始化柱状图
function initColumn() {
  chartsObj.chartsColumn = echarts.init(chartsColumn.value);
  var option = {
    title: {
      text: "周访问量",
      top: "2%",
      left: "2%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    series: [
      {
        type: "bar",
        data: [1048, 735, 560, 580, 484, 300, 167],
      },
    ],
  };
  chartsObj.chartsColumn.setOption(option);
  chartsObj.myCharts.push(chartsObj.chartsColumn);
}

// 批量设置 echarts resize
function initEChartsResize() {
  var myEvent = new Event("resize");
  window.addEventListener("resize", () => {
    nextTick(() => {
      for (let i = 0; i < chartsObj.myCharts.length; i++) {
        setTimeout(() => {
          chartsObj.myCharts[i].resize();
        }, 1000);
      }
    });
  });
  window.dispatchEvent(myEvent);
}

onMounted(() => {
  initDeicount();
  initCake();
  initColumn();
  initEChartsResize();
});

onActivated(() => {
  initEChartsResize();
});
</script>

<style lang="scss" scoped>
.userInfo {
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0 20px;
  border: 1px solid #eee;
  background-color: #fff;
  .name {
    font-size: 20px;
    font-weight: 600;
  }
}
.charts-case {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  grid-template-areas:
    "a b"
    "c c";
  margin-top: 10px;
}
.charts-chunk {
  border: 1px solid #eee;
}
.charts-chunk:nth-child(0) {
  grid-area: a;
}
.charts-chunk:nth-child(1) {
  grid-area: b;
}
.charts-chunk:last-child {
  grid-area: c;
}
</style>
