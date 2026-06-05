const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne().where('email').equals(email);

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await User.create({ email, password });
    const token = generateToken(user._id);

    return res.status(201).json({
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne().where('email').equals(email);

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    return res.json({
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login };
