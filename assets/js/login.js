import events from "../../src/events";

const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");

const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";
const NICKNAME = "nickname";

const nickname = localStorage.getItem(NICKNAME);

const login = (nickname) => {
  window.socket = io("/");
  window.socket.emit(events.setNickname, { nickname });
};

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  login(nickname);
}

const handleFormSubmit = (event) => {
  event.preventDefault();
  const input = loginForm.querySelector("input"); // loginForm 내부에 input이 있으니 가능
  const { value } = input;
  input.value = ""; //칸에 적힌 글자 없애준다
  localStorage.setItem(NICKNAME, value);
  login(value);
};

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}
