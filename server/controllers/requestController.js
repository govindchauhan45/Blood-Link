const Request = require('../models/Request');
const User = require('../models/User');
const { haversineDistance } = require('../utils/geo');

async function createRequest(req, res) {
  try {
    const { patientName, bloodGroup, location, urgency, radiusKm = 20 } = req.body;
    const createdBy = req.user ? req.user._id : null;
    const reqDoc = await Request.create({ patientName, bloodGroup, location, urgency, createdBy });

    // Find nearby donors matching blood group and availability
    const donors = await User.find({ bloodGroup, availability: true }).select('-password');
    const nearby = donors.map(d => ({ donor: d, distance: haversineDistance(location.lat, location.lng, d.location.lat || 0, d.location.lng || 0) }))
      .filter(x => x.distance <= radiusKm)
      .sort((a,b) => a.distance - b.distance);

    const io = req.app.get('io');
    // Notify nearby donors via socket rooms
    for (const item of nearby) {
      try {
        io.to(`user:${item.donor._id}`).emit('emergency_request', { request: reqDoc, distanceKm: item.distance });
      } catch (e) {
        // ignore per-donor emit errors
      }
    }

    res.json({ request: reqDoc, notified: nearby.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating request' });
  }
}

async function listRequests(req, res) {
  try {
    const rows = await Request.find().sort({ createdAt: -1 });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching requests' });
  }
}

module.exports = { createRequest, listRequests };
