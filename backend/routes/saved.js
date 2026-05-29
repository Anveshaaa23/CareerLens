const express = require('express');
const router = express.Router();
const { saveCareer, unsaveCareer, getSavedCareers, checkSaved } = require('../controllers/savedController');
const { protect } = require('../middleware/auth');

router.post('/', protect, saveCareer);
router.delete('/:career_id', protect, unsaveCareer);
router.get('/', protect, getSavedCareers);
router.get('/check/:career_id', protect, checkSaved);

module.exports = router;