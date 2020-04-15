import events from "../../src/events";
import { handleNewUser, handleDisconnected } from "./notification";
import { handleNewMessage } from "./chat";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = (aSocket) => (socket = aSocket);
// 변수 이름이 겹치므로 aSocket이라고 하겠다.;

export const initSocket = (aSocket) => {
  updateSocket(aSocket);
  aSocket.on(events.newUser, handleNewUser);
  aSocket.on(events.disconnected, handleDisconnected);
  aSocket.on(events.newMessage, handleNewMessage);
};
