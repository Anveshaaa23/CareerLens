const express = require('express');
const router = express.Router();
const { registerProfessional, getProfessionalProfile } = require('../controllers/professionalController');
const { protect } = require('../middleware/auth');

router.post('/register', protect, registerProfessional);
router.get('/me', protect, getProfessionalProfile);

module.exports = router;