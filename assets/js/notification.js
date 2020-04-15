const body = document.querySelector("body");

const notificationWindow = (text, color) => {
  const notification = document.createElement("div");
  notification.innerHTML = text;
  notification.style.backgroundColor = color;
  notification.className = "notification";
  body.appendChild(notification);
};

export const handleNewUser = ({ nickname }) => {
  notificationWindow(`${nickname} just joined`, "rgb(0, 122, 255)");
};

export const handleDisconnected = ({ nickname }) => {
  notificationWindow(`${nickname} just left`, "rgb(255, 59, 48)");
};
