import { handleMessageNotify } from "./chat";

const socket = io("/");

// server.js의 io와 다른 io
// /socket.io/socket.io.js 에서 정의되어 있다.

function sendMessage(message) {
  socket.emit("newMessage", { message });
  console.log(`You : ${message}`);
}

// 클라이언트가 연결되면 메시지를 보낼 수 있게 된다.
// 브라우저의 console에서 sendMessage("Hi") 이런 식으로

function setNickname(nickname) {
  socket.emit("setNickname", { nickname });
}

socket.on("messageNotify", handleMessageNotify);

//연결된 클라이언트는 메시지를 받는다.
