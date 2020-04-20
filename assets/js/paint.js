import { getSocket } from "./socket";
import events from "../../src/events";

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("brushRange");
const clickMode = document.getElementById("mode");
const controls = document.getElementById("controls");

const WIDTH = 490;
const HEIGHT = 490;

canvas.width = WIDTH;
canvas.height = HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, WIDTH, HEIGHT);
//맨 처음 배경 화면을 만든다.
//context는 canvas 안에서 픽셀을 다루는 것이다
//한 점 한 점을 다루는 것이다.

ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 2.5;

let painting = false;
let wordChange = false;

const handlePath = (x, y) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
};

const handleStroke = (x, y, color = null) => {
  let currentColor = ctx.strokeStyle;
  if (color !== null) {
    ctx.strokeStyle = color;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.strokeStyle = currentColor;
};

function ifMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  const color = ctx.strokeStyle;
  // console.log(event);
  if (!painting) {
    handlePath(x, y);
    getSocket().emit(events.sendPath, { x, y });
  } else {
    handleStroke(x, y);
    // color를 안 보내주니까 색의 변화는 피할 수 있다. 아름답다.
    // color 변화만 if에 넣어주니까 color가 없으면 if가 작동하지 않는다.
    getSocket().emit(events.sendStroke, { x, y, color });
  }
}
//offsetX, offsetY 좌표를 확인하기
//이건 캔버스 위에서의 x,y 좌표이다.
//clientX, clientY는 윈도우 안에서의 x,y 좌표이다.

//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
//ctx는 위에 참조
//클릭 안 하고 움직이면 path만 만들고 있는 중이다.
//클릭하고 움직이면 if 절은 작동하지 않는다
//lineTo: path의 마지막 점을 괄호 안의 점과 이어준다.
function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

export const fillCanvas = (color = null) => {
  let currentColor = ctx.fillStyle;
  if (color !== null) {
    ctx.fillStyle = color;
  }
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = currentColor;
};

function canvasClick() {
  if (wordChange) {
    fillCanvas();
    getSocket().emit(events.sendFill, { color: ctx.fillStyle });
  }
}
//fill을 누르면 wordChange가 true로 바뀐다.

function handleRightClick(event) {
  event.preventDefault();
}
//우클릭 방지하기

export const preventDrawing = () => {
  canvas.removeEventListener("mousemove", ifMouseMove);
  canvas.removeEventListener("mousedown", startPainting);
  canvas.removeEventListener("mouseup", stopPainting);
  canvas.removeEventListener("mouseleave", stopPainting);
  canvas.removeEventListener("click", canvasClick);
  canvas.removeEventListener("contextmenu", handleRightClick);
};

export const enableDrawing = () => {
  canvas.addEventListener("mousemove", ifMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", canvasClick);
  canvas.addEventListener("contextmenu", handleRightClick);
};

export const hideCanvasControls = () => (controls.style.opacity = 0);

export const showCanvasControls = () => (controls.style.opacity = 1);

if (canvas) {
  hideCanvasControls();
}
//mousedown은 클릭이랑 효과가 똑같다.
//클릭하면 painting 값이 true로 바뀌고
//다시 떼면 painting 값이 false로 바뀐다

//addEventListener는 처음에 작동시키면 CCTV처럼 계속 돌아가면서 인식함

//캔버스 오른쪽 마우스 클릭하면 나오는 것이
//contextmenu이다.

function changeColor(event) {
  //console.log(event.target.style) 통해서 그 안에 있는 항목 확인
  //그 항목 중에 backgroundColor 확인
  const selectedColor = event.target.style.backgroundColor;
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
}

//Array.from 메소드는 object에서 array를 만든다.
// console.log(Array.from(color))
Array.from(color).forEach((color) =>
  color.addEventListener("click", changeColor)
);
// Array.from(color).forEach(potato => potato.addEventListener('click',changeColor));
//이렇게 바꿔도 된다. 그냥 array 안에 있는 각각의 아이템들을 대표하는 것이다.

function handleRange(event) {
  //console.log(event); 검색 후 value를 찾아냄
  //console.log(event.target.value);
  ctx.lineWidth = event.target.value;
}

if (range) {
  //range가 정의되어 있다면 (확인차 좋음)
  range.addEventListener("input", handleRange);
}

function changeWord() {
  if (wordChange === false) {
    clickMode.innerText = "Paint";
    wordChange = true;
  } else {
    clickMode.innerHTML = "Fill";
    wordChange = false;
  }
}

clickMode.addEventListener("click", changeWord);

//if(clickMode.innerText='Paint')가 아니라
//if(clickMode.innerText=='Paint')

//if(clickMode.innerText=='Paint'){
//   canvas.addEventListener('click',filling);
//}
//이렇게 입력하면
//맨 처음에만 고려되어지기 때문에
//호출되도록 해야한다.

export const handleReceivePath = ({ x, y }) => handlePath(x, y);

export const handleReceiveStroke = ({ x, y, color }) =>
  handleStroke(x, y, color);

export const handleFill = ({ color }) => fillCanvas(color);

export const resetCanvas = () => fillCanvas("#fff");
