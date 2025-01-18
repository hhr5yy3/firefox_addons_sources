"use strict";
var circle = document.querySelector("#ext > div.circle-wrapper");
var title = document.getElementById("title");
var time = document.getElementById("time");
var start = document.getElementById("control");
var working_time = 1500;
var rest_time = 300;
var total_time = working_time;
var seconds = working_time;
var Timer;
var colors = ["#e74c3c", "#2ecc71"];
var color = colors[0];
var alarm = new Audio("alarm.mp3");

alarm.volume = 0.3;

function secondsToTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = (time - minutes * 60).toString();
  var ret = "";
  ret = minutes.toString();
  if (ret.length === 1) ret = "0" + ret;
  if (seconds.length === 1) seconds = "0" + seconds;
  ret += " : " + seconds;
  return ret;
}

function setTime() {
  var new_time = secondsToTime(--seconds);
  var percentage = 100 - (seconds / total_time) * 100;
  circle.style.background =
    "conic-gradient(" + color + " " + percentage.toString() + "%, 0, grey 0%)";
  time.textContent = new_time;
  if (seconds === 0) {
    if (circle.classList.contains("working")) {
      seconds = rest_time + 1;
      total_time = rest_time;
      color = colors[1];
      title.textContent = "Rest!";
      circle.classList.remove("working");
    } else {
      seconds = working_time + 1;
      total_time = working_time;
      color = colors[0];
      title.textContent = "Work!";
      circle.classList.add("working");
    }
    circle.style.backgroundColor = color;
    alarm.play();
    setTime();
  }
}

time.textContent = secondsToTime(working_time);

start.onclick = function() {
  if (start.classList.contains("start")) {
    Timer = window.setInterval(setTime, 1000);
    start.textContent = "Reset";
    start.classList.remove("start");
  } else {
    seconds = working_time + 1;
    total_time = working_time;
    color = colors[0];
    setTime();
    clearInterval(Timer);
    start.textContent = "Start";
    start.classList.add("start");
  }
};
