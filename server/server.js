const path = require('path');
const http = require('http')
const express = require('express')
var app = express()
const setting = require('./config')
const server = http.Server(app).listen(setting.port)
const socketio = require('socket.io')
var io = socketio(server)
const config = require('./io_config')

app.use(express.static(path.join(__dirname, './dist/')));

io.on('connection', function (socket) {
  console.log('socket connected:');
  // 更改路由
  socket.on('changeRoute', function (socket) {
    console.log('changeRoute:', socket);
    io.emit('getRoute', socket);
  });
  // 获取路由地址
  socket.on('getRoute', function (data) {
    console.log('getRoute:', data);
  });
  // 视频播放暂停
  socket.on('videoPlay', function (data) {
    console.log('videoPlay:', data);
    io.emit('videoPlay', data);
  });
  // 更改视频步骤
  socket.on('changeState', function (data) {
    console.log('changeState:', data);
    io.emit('changeState', data);
  });
  // 视频重置
  socket.on('replay', function (data) {
    console.log('replay:', data);
    io.emit('replay', data);
  });

  socket.on('l2state', function (data) {
    io.emit('l2state', data);
  });

  config.events.map(event => {
    socket.on(event, (data) => {
      console.log("handler:", event);
      //if (!handleEvent(event, data)) {
      io.emit(event, data)
      //}
    });
  });
});

// create an empty modbus client
var ModbusRTU = require("modbus-serial")
var client = new ModbusRTU();

client.connectRTUBuffered("COM3", {baudRate: 9600});
client.open(() => {
  console.log("open handler");
});
client.setID(1);
setInterval(function () {
  client.readDiscreteInputs(1, 1).then((data) => {
    console.log("---------", data);
    io.emit(config.event, {"eventType": config.eventType, "data": data.buffer.toString()});
  })
}, 300)
