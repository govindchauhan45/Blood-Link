require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { connectDB } = require('./config/db');
const apiRoutes = require('./routes/api');
const Bank = require('./models/Bank');

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: '*' } });

  app.use(cors());
  app.use(express.json());

  // attach io for routes to emit
  app.set('io', io);

  app.use('/api', apiRoutes);

  // simple health
  app.get('/', (req, res) => res.json({ ok: true }));

  // seed banks if none
  try {
    const count = await Bank.countDocuments();
    if (count === 0) {
      await Bank.create([
        { name: 'City Blood Bank - Mumbai', address: 'Mumbai Central', city: 'Mumbai', lat: 19.0760, lng: 72.8777, phone: '+91 22 1234 5678' },
        { name: 'Central Blood Bank - Delhi', address: 'Karol Bagh', city: 'Delhi', lat: 28.7041, lng: 77.1025, phone: '+91 11 2345 6789' },
        { name: 'Bangalore Blood Center', address: 'MG Road', city: 'Bangalore', lat: 12.9716, lng: 77.5946, phone: '+91 80 2345 6789' }
      ]);
      console.log('Seeded banks');
    }
  } catch (err) {
    console.error('Seeding banks failed', err);
  }

  io.on('connection', (socket) => {
    socket.on('join', (room) => {
      socket.join(room);
    });
    socket.on('authenticate', (token) => {
      const jwt = require('jsonwebtoken');
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
        if (decoded && decoded.id) socket.join(`user:${decoded.id}`);
      } catch (e) { }
    });
  });

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch(err => { console.error(err); process.exit(1); });
