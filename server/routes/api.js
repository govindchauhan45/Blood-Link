const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Bank = require('../models/Bank');
const Request = require('../models/Request');
const { haversineDistance } = require('../utils/geo');

// GET /api/banks - return all banks
router.get('/banks', async (req, res) => {
  try {
    const banks = await Bank.find().lean();
    res.json(banks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch banks' });
  }
});

// POST /api/register - create a donor
router.post('/register', async (req, res) => {
  try {
    const { name, bloodGroup, phone, city, location, available, password } = req.body;
    if (!name || !bloodGroup || !phone) return res.status(400).json({ message: 'Missing required fields' });
    const existing = await User.findOne({ phone });
    if (existing) return res.status(400).json({ message: 'Phone already registered' });
    const hash = password ? await bcrypt.hash(password, 10) : '';
    const user = await User.create({ name, bloodGroup, phone, city, location, availability: !!available, password: hash });
    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to register donor' });
  }
});

// GET /api/donors - list donors, filter by bloodGroup and city
router.get('/donors', async (req, res) => {
  try {
    const { bloodGroup, city, lat, lng } = req.query;
    const filter = {};
    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (city) filter.city = city;
    const donors = await User.find(filter).select('-password').lean();
    let list = donors;
    if (lat && lng) {
      const la = parseFloat(lat);
      const ln = parseFloat(lng);
      list = list.map(d => ({ ...d, distance: haversineDistance(la, ln, (d.location && d.location.lat) || 0, (d.location && d.location.lng) || 0) }));
      list.sort((a,b) => a.distance - b.distance);
    }
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch donors' });
  }
});

// POST /api/request - create an emergency request
router.post('/request', async (req, res) => {
  try {
    const { bloodGroup, patientName, location, urgency } = req.body;
    if (!bloodGroup || !patientName || !location) return res.status(400).json({ message: 'Missing required fields' });
    const r = await Request.create({ bloodGroup, patientName, location, urgency });

    // find nearby donors and notify via socket if available
    try {
      const donors = await User.find({ bloodGroup, availability: true }).select('-password').lean();
      const nearby = donors.map(d => ({ donor: d, distance: haversineDistance(location.lat, location.lng, (d.location && d.location.lat) || 0, (d.location && d.location.lng) || 0) }))
        .filter(x => x.distance <= 20)
        .sort((a,b) => a.distance - b.distance);
      const io = req.app.get('io');
      if (io) {
        for (const item of nearby) {
          io.to(`user:${item.donor._id}`).emit('emergency_request', { request: r, distanceKm: item.distance });
        }
      }
    } catch (e) {
      console.error('Notify donors error', e);
    }

    res.status(201).json({ request: r });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create request' });
  }
});

module.exports = router;
