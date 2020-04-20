import events from "./events";
import { chooseWord } from "./words";

let sockets = [];
let progress = false;
let painter = null;

const choosePainter = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  // broadcast를 아예 함수로 만들겠다.
  const superBroadcast = (event, data) => io.emit(event, data);
  const sendPlayerUpdate = () =>
    superBroadcast(events.playerUpdate, { sockets });
  const startGame = () => {
    if (progress === false) {
      progress = true;
      painter = choosePainter();
      const word = chooseWord();
      setTimeout(() => {
        superBroadcast(events.startGame);
        io.to(painter.id).emit(events.leaderNotif, { word });
      }, 2000);
    }
  };
  const endGame = () => {
    progress = false;
    superBroadcast(events.ending);
  };

  socket.on(events.setNickname, ({ nickname }) => {
    broadcast(events.newUser, { nickname });
    socket.nickname = nickname;
    sockets.push({ id: socket.id, nickname, points: 0 });
    sendPlayerUpdate();
    if (sockets.length >= 2) {
      startGame();
    }
  });

  // socket.on(
  //   events.notifyNickname,
  //   ({ nickname }) => (socket.nickname = nickname)
  // );

  socket.on(events.disconnect, () => {
    sockets = sockets.filter((eachSocket) => eachSocket.id !== socket.id);
    broadcast(events.disconnected, { nickname: socket.nickname });
    sendPlayerUpdate();
    if (progress === true) {
      if (sockets.length === 1 || socket.id === painter.id) {
        progress = false;
        endGame();
      }
    }
  });

  socket.on(events.sendMessage, ({ message }) =>
    broadcast(events.newMessage, { message, nickname: socket.nickname })
  );

  socket.on(events.sendPath, ({ x, y }) =>
    broadcast(events.receivePath, { x, y })
  );

  socket.on(events.sendStroke, ({ x, y, color }) =>
    broadcast(events.receiveStroke, { x, y, color })
  );

  socket.on(events.sendFill, ({ color }) =>
    broadcast(events.receiveFill, { color })
  );
};

export default socketController;
