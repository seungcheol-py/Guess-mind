import events from "../../src/events";
import { initSocket } from "./socket";

const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");

const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";
const NICKNAME = "nickname";

const nickname = localStorage.getItem(NICKNAME);

const login = (nickname) => {
  const socket = io("/");
  socket.emit(events.setNickname, { nickname });
  initSocket(socket);
};
// 로그인 한 이후에 initSocket()이 작동하도록
// To prevent notification "~~ just joined" when I refresh the page

// const login = (nickname) => {
//   const socket = io("/");
//   socket.emit(events.notifyNickname, { nickname });
//   initSocket(socket);
// };

// 새로고침하면 나오는 파란색 창을 없애기 위한 코드

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  login(nickname);
}

const handleFormSubmit = (event) => {
  event.preventDefault(); //새로고침은 하는 것이 더 좋다고 본다.
  const input = loginForm.querySelector("input"); // loginForm 내부에 input이 있으니 가능
  const { value } = input;
  input.value = ""; //칸에 적힌 글자 없애준다
  localStorage.setItem(NICKNAME, value);
  body.className = LOGGED_IN;
  login(value);
};

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}
