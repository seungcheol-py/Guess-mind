const timer = document.getElementById("jsTimer");

let gameover = false;
let interval = null;

export const setTimer = () => {
  let time = 30;

  const changeTime = () => {
    if (time >= 2 && gameover === false) {
      time -= 1;
      timer.innerText = `${time}초 남았습니다`;
    } else {
      timer.innerText = "";
      clearInterval(interval);
    }
  };
  interval = setInterval(changeTime, 1000);
};
export const makeGameoverTrue = () => (gameover = true);

export const makeGameoverFalse = () => (gameover = false);
