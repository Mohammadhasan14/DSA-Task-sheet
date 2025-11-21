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



userSchema.statics.createDefaultAdmin = async function () {
  const adminEmail = "admin@gmail.com";

  const existingAdmin = await this.findOne({ email: adminEmail });
  if (existingAdmin) {
    console.log("admin already exists");
    return;
  }

  const bcrypt = require("bcryptjs");
  const hashedPassword = await bcrypt.hash("pass@123", 10);

  await this.create({
    username: "admin",
    email: adminEmail,
    password: hashedPassword,
  });

  console.log("default admin created => admin@gmail.com / pass@123");
};

module.exports = mongoose.model('User', userSchema);
