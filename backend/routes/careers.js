const express = require('express');
const router = express.Router();
const {
  getAllCareers,
  getCareerById,
  getDomains,
  getCareerSuggestions
} = require('../controllers/careerController');

router.get('/', getAllCareers);
router.get('/domains', getDomains);
router.get('/suggestions', getCareerSuggestions);
router.get('/:id', getCareerById);

module.exports = router;