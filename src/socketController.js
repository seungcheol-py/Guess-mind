import events from "./events";
import { chooseWord } from "./words";

let sockets = [];
let progress = false;
let painter = null;
let word = null;
let timeout = null;

const choosePainter = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  // broadcast를 아예 함수로 만들겠다.
  const superBroadcast = (event, data) => io.emit(event, data);
  const sendPlayerUpdate = () =>
    superBroadcast(events.playerUpdate, { sockets });
  const startGame = () => {
    if (sockets.length >= 2) {
      if (progress === false) {
        progress = true;
        clearTimeout(timeout);
        painter = choosePainter();
        word = chooseWord();
        superBroadcast(events.startNotify);
        setTimeout(() => {
          superBroadcast(events.startGame);
          io.to(painter.id).emit(events.leaderNotif, { word });
        }, 3000);
        timeout = setTimeout(endGame, 33000);
      }
    }
  };
  const endGame = () => {
    progress = false;
    superBroadcast(events.ending);
    setTimeout(() => startGame(), 5000);
    clearTimeout(timeout);
  };
  const addPoints = (id) => {
    sockets = sockets.map((socket) => {
      if (socket.id === id) {
        socket.points += 10;
      }
      return socket;
    });
    sendPlayerUpdate();
    endGame();
  };

  socket.on(events.setNickname, ({ nickname }) => {
    broadcast(events.newUser, { nickname });
    socket.nickname = nickname;
    sockets.push({ id: socket.id, nickname, points: 0 });
    sendPlayerUpdate();
    startGame();
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

  socket.on(events.sendMessage, ({ message }) => {
    if (message === word) {
      superBroadcast(events.newMessage, {
        message: `${socket.nickname}!! 정답인 ${word} 맞추었습니다.`,
        nickname: "운영자",
      });
      addPoints(socket.id);
    } else {
      broadcast(events.newMessage, { message, nickname: socket.nickname });
    }
  });

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
