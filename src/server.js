import express from "express";
import { join } from "path";
import socketIO from "socket.io";
import morgan from "morgan";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));
app.use(morgan("dev"));

app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
  console.log(`Server running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);

io.on("connection", socket => {
  socket.on("newMessage", ({ message }) => {
    socket.broadcast.emit("messageNotify", {
      message,
      nickname: socket.nickname || "Anonymous"
    });
  });
  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });
});

// newMessage라는 이벤트가 일어나면 이벤트를 발생시킨 socket의 nickname을 같이 보낼 것이다.
// nickname이 없다면 Anonymous
// setNickname이라는 이벤트가 일어나면 socket object 안에 nickname을 담아 보낼 것이다.
