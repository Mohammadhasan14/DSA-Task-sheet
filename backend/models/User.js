const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  progress: [{
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
    status: { type: String, enum: ['done', 'pending'], default: 'pending' },
    subtopics: [{
      subTopicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic.subtopics' },
      status: { type: String, enum: ['done', 'pending'], default: 'pending' }
    }]
  }]
});


module.exports = mongoose.model('User', userSchema);
