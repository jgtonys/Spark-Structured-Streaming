let express = require('./config/express');
let config = require('./config/config');
let SocketIo = require('socket.io'); // 추가
let socketEvents = require('./config/socket.js');

const server = express.listen(config.port, () => {
    console.log(`Express server has started on port ${config.port}`);
});

const io = SocketIo(server);

socketEvents(io);

//const io = require('socket.io')(server);
