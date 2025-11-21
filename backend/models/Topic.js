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

topicSchema.statics.seedSampleTopics = async function () {
  const count = await this.countDocuments();

  if (count > 0) return;

  const sampleData = [
    {
      title: "JavaScript Fundamentals",
      subtopics: [
        {
          title: "Closures",
          level: "Medium",
          youtubeLink: "https://youtu.be/1JsJx1x35c0",
          leetcodeLink: "",
          codeforcesLink: "",
          articleLink: "https://javascript.info/closure"
        },
        {
          title: "Event Loop",
          level: "Hard",
          youtubeLink: "https://youtu.be/8aGhZQkoFbQ",
          leetcodeLink: "",
          codeforcesLink: "",
          articleLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop"
        }
      ]
    },
    {
      title: "Data Structures",
      subtopics: [
        {
          title: "Arrays",
          level: "Easy",
          youtubeLink: "https://youtu.be/Wp8oiO_CZZE",
          leetcodeLink: "https://leetcode.com/problems/two-sum/",
          codeforcesLink: "",
          articleLink: "https://www.geeksforgeeks.org/arrays-in-cpp/"
        },
        {
          title: "Binary Trees",
          level: "Medium",
          youtubeLink: "https://youtu.be/fAAZixBzIAI",
          leetcodeLink: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
          codeforcesLink: "",
          articleLink: "https://www.geeksforgeeks.org/binary-tree-data-structure/"
        }
      ]
    },
    {
      title: "Algorithms",
      subtopics: [
        {
          title: "Binary Search",
          level: "Easy",
          youtubeLink: "https://youtu.be/fDKIpIMQ6l0",
          leetcodeLink: "https://leetcode.com/problems/binary-search/",
          codeforcesLink: "",
          articleLink: "https://www.geeksforgeeks.org/binary-search/"
        },
        {
          title: "Dynamic Programming Basics",
          level: "Hard",
          youtubeLink: "https://youtu.be/oBt53YbR9Kk",
          leetcodeLink: "https://leetcode.com/problems/climbing-stairs/",
          codeforcesLink: "",
          articleLink: "https://www.geeksforgeeks.org/dynamic-programming/"
        }
      ]
    },
    {
      title: "React",
      subtopics: [
        {
          title: "useState & useEffect",
          level: "Easy",
          youtubeLink: "https://youtu.be/0ZJgIjIuY7U",
          leetcodeLink: "",
          codeforcesLink: "",
          articleLink: "https://react.dev/learn/state-a-components-memory"
        },
        {
          title: "React Performance Optimization",
          level: "Medium",
          youtubeLink: "https://youtu.be/0Xy3Uu9SL3o",
          leetcodeLink: "",
          codeforcesLink: "",
          articleLink: "https://react.dev/learn/optimizing-performance"
        }
      ]
    }
  ];

  await this.insertMany(sampleData);
  console.log("sample topics seeded");
};

module.exports = mongoose.model('Topic', topicSchema);
