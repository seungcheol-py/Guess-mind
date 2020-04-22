import { getSocket } from "./socket";
import events from "../../src/events";

const message = document.getElementById("jsMessage");
const messageForm = document.getElementById("jsMessageForm");

const appendMessage = (text, nickname) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="author ${nickname ? "out" : "self"}">${
    nickname ? nickname : "You"
  }: ${text}</span>
  `;
  message.appendChild(li);
};

const handleForm = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  const { value } = input;
  getSocket().emit(events.sendMessage, { message: value });
  input.value = "";
  appendMessage(value);
};

export const handleNewMessage = ({ message, nickname }) => {
  appendMessage(message, nickname);
};

if (messageForm) {
  messageForm.addEventListener("submit", handleForm);
}

export const preventChat = () => (messageForm.style.display = "none");
export const enableChat = () => (messageForm.style.display = "flex");
