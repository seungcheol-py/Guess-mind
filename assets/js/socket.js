import events from "../../src/events";
import { handleNewUser, handleDisconnected } from "./notification";
import { handleNewMessage } from "./chat";
import { handleReceivePath, handleReceiveStroke, handleFill } from "./paint";
import {
  handlePlayerUpdate,
  handleStartGame,
  handleLeaderNotif,
  handleEnding,
} from "./player";

let socket = null;

export const getSocket = () => socket;

export const initSocket = (aSocket) => {
  socket = aSocket;
  socket.on(events.newUser, handleNewUser);
  socket.on(events.disconnected, handleDisconnected);
  socket.on(events.newMessage, handleNewMessage);
  socket.on(events.receivePath, handleReceivePath);
  socket.on(events.receiveStroke, handleReceiveStroke);
  socket.on(events.receiveFill, handleFill);
  socket.on(events.playerUpdate, handlePlayerUpdate);
  socket.on(events.startGame, handleStartGame);
  socket.on(events.leaderNotif, handleLeaderNotif);
  socket.on(events.ending, handleEnding);
};
