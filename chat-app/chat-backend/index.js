// chat-backend/index.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// allow CORS from anywhere (for testing). In production restrict origin.
const io = new Server(server, {
  cors: { origin: '*' }
});

// Optional: in-memory last messages (not persistent) — show last 100 on connect
const lastMessages = [];

io.on('connection', (socket) => {
  console.log('user connected', socket.id);

  // send history
  socket.emit('history', lastMessages);

  socket.on('sendMessage', (msg) => {
    // msg = { user, text, time }
    // add to history (bounded)
    lastMessages.push(msg);
    if (lastMessages.length > 200) lastMessages.shift();

    // broadcast to all clients
    io.emit('receiveMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
