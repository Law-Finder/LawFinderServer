const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const logger = require('../common/logger');

io.on('connection', (socket) => {
    logger.warn(`Client ${socket.id} connected from ${socket.handshake.address}`);
    socket.on('disconnect', () => {
        logger.warn(`Client ${socket.id} disconnected from ${socket.handshake.address}`);
    });
});

module.exports = server;
