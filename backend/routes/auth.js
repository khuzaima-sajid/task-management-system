const express = require('express');
const Joi = require('joi');
const { register, login } = require('../controllers/authController');
const validate = require('../middleware/validation');

const router = express.Router();

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

router.post('/register', validate(authSchema), register);
router.post('/login', validate(authSchema), login);

module.exports = router;
