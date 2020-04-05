(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleMessageNotify = handleMessageNotify;

function handleMessageNotify(data) {
  var message = data.message,
      nickname = data.nickname;
  console.log("".concat(nickname, ": ").concat(message));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXQuanMiXSwibmFtZXMiOlsiaGFuZGxlTWVzc2FnZU5vdGlmeSIsImRhdGEiLCJtZXNzYWdlIiwibmlja25hbWUiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQU8sU0FBU0EsbUJBQVQsQ0FBNkJDLElBQTdCLEVBQW1DO0FBQUEsTUFDaENDLE9BRGdDLEdBQ1ZELElBRFUsQ0FDaENDLE9BRGdDO0FBQUEsTUFDdkJDLFFBRHVCLEdBQ1ZGLElBRFUsQ0FDdkJFLFFBRHVCO0FBRXhDQyxFQUFBQSxPQUFPLENBQUNDLEdBQVIsV0FBZUYsUUFBZixlQUE0QkQsT0FBNUI7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBoYW5kbGVNZXNzYWdlTm90aWZ5KGRhdGEpIHtcclxuICBjb25zdCB7IG1lc3NhZ2UsIG5pY2tuYW1lIH0gPSBkYXRhO1xyXG4gIGNvbnNvbGUubG9nKGAke25pY2tuYW1lfTogJHttZXNzYWdlfWApO1xyXG59XHJcbiJdfQ==
},{}],2:[function(require,module,exports){
"use strict";

var _chat = require("./chat");

var socket = io("/"); // server.js의 io와 다른 io
// /socket.io/socket.io.js 에서 정의되어 있다.

function sendMessage(message) {
  socket.emit("newMessage", {
    message: message
  });
  console.log("You : ".concat(message));
} // 클라이언트가 연결되면 메시지를 보낼 수 있게 된다.
// 브라우저의 console에서 sendMessage("Hi") 이런 식으로


function setNickname(nickname) {
  socket.emit("setNickname", {
    nickname: nickname
  });
}

socket.on("messageNotify", _chat.handleMessageNotify); //연결된 클라이언트는 메시지를 받는다.
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfYzQ1NTA2MWEuanMiXSwibmFtZXMiOlsic29ja2V0IiwiaW8iLCJzZW5kTWVzc2FnZSIsIm1lc3NhZ2UiLCJlbWl0IiwiY29uc29sZSIsImxvZyIsInNldE5pY2tuYW1lIiwibmlja25hbWUiLCJvbiIsImhhbmRsZU1lc3NhZ2VOb3RpZnkiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsSUFBTUEsTUFBTSxHQUFHQyxFQUFFLENBQUMsR0FBRCxDQUFqQixDLENBRUE7QUFDQTs7QUFFQSxTQUFTQyxXQUFULENBQXFCQyxPQUFyQixFQUE4QjtBQUM1QkgsRUFBQUEsTUFBTSxDQUFDSSxJQUFQLENBQVksWUFBWixFQUEwQjtBQUFFRCxJQUFBQSxPQUFPLEVBQVBBO0FBQUYsR0FBMUI7QUFDQUUsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLGlCQUFxQkgsT0FBckI7QUFDRCxDLENBRUQ7QUFDQTs7O0FBRUEsU0FBU0ksV0FBVCxDQUFxQkMsUUFBckIsRUFBK0I7QUFDN0JSLEVBQUFBLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLGFBQVosRUFBMkI7QUFBRUksSUFBQUEsUUFBUSxFQUFSQTtBQUFGLEdBQTNCO0FBQ0Q7O0FBRURSLE1BQU0sQ0FBQ1MsRUFBUCxDQUFVLGVBQVYsRUFBMkJDLHlCQUEzQixFLENBRUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoYW5kbGVNZXNzYWdlTm90aWZ5IH0gZnJvbSBcIi4vY2hhdFwiO1xyXG5cclxuY29uc3Qgc29ja2V0ID0gaW8oXCIvXCIpO1xyXG5cclxuLy8gc2VydmVyLmpz7J2YIGlv7JmAIOuLpOuluCBpb1xyXG4vLyAvc29ja2V0LmlvL3NvY2tldC5pby5qcyDsl5DshJwg7KCV7J2Y65CY7Ja0IOyeiOuLpC5cclxuXHJcbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKG1lc3NhZ2UpIHtcclxuICBzb2NrZXQuZW1pdChcIm5ld01lc3NhZ2VcIiwgeyBtZXNzYWdlIH0pO1xyXG4gIGNvbnNvbGUubG9nKGBZb3UgOiAke21lc3NhZ2V9YCk7XHJcbn1cclxuXHJcbi8vIO2BtOudvOydtOyWuO2KuOqwgCDsl7DqsrDrkJjrqbQg66mU7Iuc7KeA66W8IOuztOuCvCDsiJgg7J6I6rKMIOuQnOuLpC5cclxuLy8g67iM65287Jqw7KCA7J2YIGNvbnNvbGXsl5DshJwgc2VuZE1lc3NhZ2UoXCJIaVwiKSDsnbTrn7Ag7Iud7Jy866GcXHJcblxyXG5mdW5jdGlvbiBzZXROaWNrbmFtZShuaWNrbmFtZSkge1xyXG4gIHNvY2tldC5lbWl0KFwic2V0Tmlja25hbWVcIiwgeyBuaWNrbmFtZSB9KTtcclxufVxyXG5cclxuc29ja2V0Lm9uKFwibWVzc2FnZU5vdGlmeVwiLCBoYW5kbGVNZXNzYWdlTm90aWZ5KTtcclxuXHJcbi8v7Jew6rKw65CcIO2BtOudvOydtOyWuO2KuOuKlCDrqZTsi5zsp4Drpbwg67Cb64qU64ukLlxyXG4iXX0=
},{"./chat":1}]},{},[2])