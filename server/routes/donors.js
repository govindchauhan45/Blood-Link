const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getDonors, toggleAvailability } = require('../controllers/donorController');

router.get('/', getDonors);
router.patch('/me/availability', auth, toggleAvailability);

module.exports = router;
