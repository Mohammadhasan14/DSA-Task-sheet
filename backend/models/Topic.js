const mongoose = require('mongoose');

const subtopicSchema = new mongoose.Schema({
  title: String,
  level: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  youtubeLink: String,
  leetcodeLink: String,
  codeforcesLink: String,
  articleLink: String
});

const topicSchema = new mongoose.Schema({
  title: String,
  subtopics: [subtopicSchema]
});

module.exports = mongoose.model('Topic', topicSchema);
