const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  getAllTopics,
  updateTopicStatus,
  createTopic,
  getProgressReport
} = require('../controllers/topicController');

router.get('/', auth, getAllTopics);
router.get('/progress-report', auth, getProgressReport);
router.post('/status', auth, updateTopicStatus);
router.post('/', createTopic); 

module.exports = router;
