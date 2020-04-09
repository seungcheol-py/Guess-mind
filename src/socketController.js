import events from "./events";

const socketController = (socket) => {
  socket.on("newMessage", ({ message }) => {
    socket.broadcast.emit("messageNotify", {
      message,
      nickname: socket.nickname || "Anonymous",
    });
  });
  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
  });
};

// newMessage라는 이벤트가 일어나면 이벤트를 발생시킨 socket의 nickname을 같이 보낼 것이다.
// nickname이 없다면 Anonymous
// setNickname이라는 이벤트가 일어나면 socket object 안에 nickname을 담아 보낼 것이다.

export default socketController;
