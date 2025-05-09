const mongoose = require('mongoose');
const Topic = require('../models/Topic');
const User = require('../models/User');

exports.getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find();
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const enrichedTopics = topics.map(topic => {
            const userProgress = user.progress.find(p => p.topicId.equals(topic._id));
            const subtopicsWithStatus = topic.subtopics.map(sub => {
                const userSub = userProgress?.subtopics?.find(s => s.subTopicId.equals(sub._id));
                return {
                    ...sub.toObject(),
                    status: userSub?.status || 'pending'
                };
            });
            console.log("topic", topic)
            console.log("topic.toObject()", topic.toObject())
            return {
                ...topic.toObject(),
                status: userProgress?.status || 'pending',
                subtopics: subtopicsWithStatus
            };
        });
        res.json(enrichedTopics);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getProgressReport = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const topics = await Topic.find();
        const doneTopicIds = user.progress
            .filter(p => p.status === 'done')
            .map(p => p.topicId.toString());

        const report = {
            Easy: { total: 0, done: 0 },
            Medium: { total: 0, done: 0 },
            Hard: { total: 0, done: 0 }
        };

        topics.forEach(topic => {
            topic.subtopics.forEach(sub => {
                if (['Easy', 'Medium', 'Hard'].includes(sub.level)) {
                    report[sub.level].total++;
                    if (doneTopicIds.includes(topic._id.toString())) {
                        report[sub.level].done++;
                    }
                }
            });
        });
        const result = {};
        for (const level of ['Easy', 'Medium', 'Hard']) {
            const { total, done } = report[level];
            result[level] = total > 0 ? ((done / total) * 100).toFixed(2) + '%' : '0%';
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.updateTopicStatus = async (req, res) => {
    const { topicId, subTopicId, status } = req.body;
    // console.log("req.body on updateTopicStatus", req.body);

    if (!topicId || !subTopicId || !status) {
        return res.status(400).json({ msg: 'topicId, subTopicId, and status are required' });
    }

    if (!['done', 'pending'].includes(status)) {
        return res.status(400).json({ msg: 'Invalid status value' });
    }

    if (!mongoose.Types.ObjectId.isValid(topicId) || !mongoose.Types.ObjectId.isValid(subTopicId)) {
        return res.status(400).json({ msg: 'Invalid topic or subtopic ID format' });
    }

    const topicObjectId = new mongoose.Types.ObjectId(topicId);
    const subTopicObjectId = new mongoose.Types.ObjectId(subTopicId);

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const topic = await Topic.findById(topicObjectId);
        if (!topic) return res.status(404).json({ msg: 'Topic not found' });

        const subExists = topic.subtopics.find(sub => sub._id.equals(subTopicObjectId));
        if (!subExists) {
            return res.status(400).json({ msg: 'Subtopic not found in this topic' });
        }

        let progressIndex = user.progress.findIndex(p => p.topicId.equals(topicObjectId));
        // console.log("progressIndex", progressIndex);

        if (progressIndex === -1) {
            user.progress.push({
                topicId: topicObjectId,
                status: 'pending',
                subtopics: [{ subTopicId: subTopicObjectId, status }]
            });
        } else {
            const userTopicProgress = user.progress[progressIndex];

            const subIndex = userTopicProgress.subtopics.findIndex(s => s.subTopicId.equals(subTopicObjectId));

            if (subIndex === -1) {
                userTopicProgress.subtopics.push({ subTopicId: subTopicObjectId, status });
            } else {
                userTopicProgress.subtopics[subIndex].status = status;
            }

            const doneCount = userTopicProgress.subtopics.filter(s => s.status === 'done').length;
            if (doneCount === topic.subtopics.length) {
                userTopicProgress.status = 'done';
            } else {
                userTopicProgress.status = 'pending';
            }
        }

        await user.save();
        // console.log("user", user);
        // console.log("user.progress", user.progress[0].subtopics[0]);
        res.json({ msg: 'Subtopic status updated', topicStatus: user.progress[progressIndex]?.status || 'pending' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.createTopic = async (req, res) => {
    const { title, subtopics } = req.body;

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ msg: 'Topic title is required and must be a string' });
    }

    if (!Array.isArray(subtopics)) {
        return res.status(400).json({ msg: 'Subtopics must be an array' });
    }

    for (let i = 0; i < subtopics.length; i++) {
        const { title, level } = subtopics[i];
        if (!title || !['Easy', 'Medium', 'Hard'].includes(level)) {
            return res.status(400).json({ msg: `Subtopic ${i + 1} is invalid or missing fields` });
        }
    }

    try {
        const topic = await Topic.create({ title, subtopics });
        res.status(201).json(topic);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to create topic' });
    }
};