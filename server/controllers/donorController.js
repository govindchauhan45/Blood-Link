const User = require('../models/User');
const { haversineDistance } = require('../utils/geo');

async function getDonors(req, res) {
  try {
    const { bloodGroup, lat, lng } = req.query;
    const filter = { availability: true };
    if (bloodGroup) filter.bloodGroup = bloodGroup;
    const donors = await User.find(filter).select('-password');
    let list = donors.map(d => ({
      id: d._id,
      name: d.name,
      bloodGroup: d.bloodGroup,
      phone: d.phone,
      city: d.city,
      availability: d.availability,
      location: d.location
    }));
    if (lat && lng) {
      const la = parseFloat(lat);
      const ln = parseFloat(lng);
      list = list.map(d => ({ ...d, distance: haversineDistance(la, ln, d.location.lat || 0, d.location.lng || 0) }));
      list.sort((a,b) => a.distance - b.distance);
    }
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching donors' });
  }
}

async function toggleAvailability(req, res) {
  try {
    const user = req.user;
    user.availability = !!req.body.availability;
    if (req.body.location) user.location = req.body.location;
    await user.save();
    res.json({ success: true, availability: user.availability, location: user.location });
  } catch (err) {
    res.status(500).json({ message: 'Error updating availability' });
  }
}

module.exports = { getDonors, toggleAvailability };
