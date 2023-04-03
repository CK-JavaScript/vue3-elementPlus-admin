<template>
  <div class="home">
    <div ref="chartsDiscount" style="width: 500px; height: 400px"></div>
    <div ref="chartsCake" style="width: 500px; height: 400px"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";

// 定义变量内容
const chartsDiscount = ref();
const chartsCake = ref();

const initDeicount = () => {
  const myChart = echarts.init(chartsDiscount.value);
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };
  myChart.setOption(option);
};

const initCake = () => {
  var myChart = echarts.init(chartsCake.value);
  var option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
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
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };
  myChart.setOption(option);
};

onMounted(() => {
  initDeicount();
  initCake();
});
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
}
</style>
