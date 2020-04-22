import {
  preventDrawing,
  hideCanvasControls,
  enableDrawing,
  showCanvasControls,
  resetCanvas,
} from "./paint";
import { preventChat, enableChat } from "./chat";
import { setTimer, makeGameoverTrue, makeGameoverFalse } from "./timer";

const board = document.getElementById("jsPlayerBoard");
const notif = document.getElementById("jsNotif");

const changePlayer = (players) => {
  board.innerHTML = "";
  players.forEach((player) => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

export const handlePlayerUpdate = ({ sockets }) => changePlayer(sockets);

const setNotif = () => {
  notif.innerText = "무엇을 그린 것인지 맞춰보세요";
};

export const handleStartGame = () => {
  preventDrawing();
  hideCanvasControls();
  setNotif();
  makeGameoverFalse();
  setTimer();
};

export const handleLeaderNotif = ({ word }) => {
  enableDrawing();
  showCanvasControls();
  notif.innerText = `당신이 출제자입니다. <${word}> 그려보세요.`;
  preventChat();
};

export const handleEnding = () => {
  notif.innerText = "게임이 종료되었습니다.";
  preventDrawing();
  hideCanvasControls();
  resetCanvas();
  enableChat();
  makeGameoverTrue();
};

export const startNotif = () => (notif.innerText = "게임이 곧 시작됩니다.");
