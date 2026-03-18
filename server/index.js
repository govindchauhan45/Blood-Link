require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const donorRoutes = require('./routes/donors');
const requestRoutes = require('./routes/requests');

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blood-donation';

async function main() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: '*' } });

  app.use(cors());
  app.use(express.json());

  // attach io instance to app so controllers can access it via req.app.get('io')
  app.set('io', io);

  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/donors', donorRoutes);
  app.use('/api/requests', requestRoutes);

  // socket auth & rooms
  io.on('connection', (socket) => {
    socket.on('authenticate', (token) => {
      try {
        const jwt = require('jsonwebtoken');
        const secret = process.env.JWT_SECRET || 'dev-secret';
        const decoded = jwt.verify(token, secret);
        if (decoded && decoded.id) {
          const room = `user:${decoded.id}`;
          socket.join(room);
        }
      } catch (err) {
        // ignore invalid token
      }
    });
  });

  server.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
}

main().catch(err => { console.error(err); process.exit(1); });
