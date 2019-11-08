var express = require("express");
var app = express();

var http = require('http').Server(app);

const io = require('socket.io')(http);

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname+'/index.html');
});

http.listen(process.env.PORT || 3000);

io.on("connection",function(socket){
  socket.on('client_to_server', function(data){
      // 受信時の処理
      statusDic = data;

      io.sockets.emit('server_to_client', statusDic);
  });
});

// 送受信された記録を管理する変数
let statusDic = {
  gorin:{vis:0,ani:0},
  ring:{vis:0,ani:0},
  bigSphere:{vis:0,ani:0},
  skyplane:{vis:0,ani:0},
  aboveBox:{vis:0,ani:0},
  ocean:{vis:0,ani:0}
}