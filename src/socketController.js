import events from "./events";

const socketController = (socket) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  // broadcast를 아예 함수로 만들겠다.
  socket.on(events.setNickname, ({ nickname }) => {
    broadcast(events.newUser, { nickname });
    socket.nickname = nickname;
  });
  socket.on(events.disconnect, () => {
    broadcast(events.disconnected, { nickname: socket.nickname });
  });
  socket.on(events.sendMessage, ({ message }) => {
    broadcast(events.newMessage, { message, nickname: socket.nickname });
  });
};

export default socketController;
