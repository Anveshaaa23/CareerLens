const express = require('express');
const router = express.Router();
const { addComment, getComments } = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

router.post('/', protect, addComment);
router.get('/:career_id', getComments);

module.exports = router;