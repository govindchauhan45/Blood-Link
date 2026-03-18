const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createRequest, listRequests } = require('../controllers/requestController');

router.get('/', listRequests);
router.post('/', auth, createRequest);

module.exports = router;
