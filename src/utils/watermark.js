let id = "uniqueIdProhibitsDuplication",
  watermarkText = "";

function createWatermark() {
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id));
  }
  // 创建一个画布
  const can = document.createElement("canvas");
  // 设置画布的长宽
  can.width = 250;
  can.height = 200;
  const cans = can.getContext("2d");
  // 旋转角度
  cans.rotate((-20 * Math.PI) / 180);
  cans.font = "16px Vedana";
  // 设置填充绘画的颜色、渐变或者模式
  cans.fillStyle = "rgba(200, 200, 200, 0.35)";
  // 设置文本内容的当前对齐方式
  cans.textAlign = "left";
  // 设置在绘制文本时使用的当前文本基线
  cans.textBaseline = "Middle";
  // 在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
  cans.fillText(watermarkText, can.width / 8, can.height / 2);
  const div = document.createElement("div");
  div.id = id;
  div.style.pointerEvents = "none"; //禁用鼠标事件
  div.style.top = "30px";
  div.style.left = "0px";
  div.style.position = "fixed";
  div.style.zIndex = "999999";
  div.style.width = document.documentElement.clientWidth - 20 + "px";
  div.style.height = document.documentElement.clientHeight - 20 + "px";
  div.style.background = "url(" + can.toDataURL("image/png") + ") left top repeat";
  document.body.appendChild(div);
  mutationFun();
}

// 添加水印
function set(text = "Vue3 ElePlus Admin") {
  watermarkText = text;
  createWatermark();
  window.addEventListener("resize", createWatermark);
}

// 移除水印
function remove() {
  document.body.removeChild(document.getElementById(id));
  window.removeEventListener("resize", createWatermark);
}

// 监听元素的变化
function mutationFun() {
  const mutation = new MutationObserver((el) => {
    mutation.disconnect();
    createWatermark();
  });
  const config = {
    attributes: true,
    subtree: true,
    childList: true,
  };
  mutation.observe(document.getElementById(id), config);
}

export default {
  set,
  remove,
};
