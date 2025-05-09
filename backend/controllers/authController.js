const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    // console.log('received signup requesst:', req.body);
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'Please fill all the fields' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ token, user: { id: newUser._id, username, email } });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', err });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    // console.log('received login requesst:', req.body);
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials or user not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ token, user: { id: user._id, username: user.username, email } });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', err });
    }
};
