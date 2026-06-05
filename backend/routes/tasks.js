const express = require('express');
const Joi = require('joi');
const auth = require('../middleware/auth');
const { taskLimiter } = require('../middleware/rateLimiter');
const validate = require('../middleware/validation');
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

const taskSchema = Joi.object({
  title: Joi.string().trim().max(200).required(),
  description: Joi.string().allow('').max(2000).default(''),
  status: Joi.string().valid('Pending', 'In Progress', 'Completed').default('Pending'),
  dueDate: Joi.date().iso().allow(null, ''),
});

const partialTaskSchema = Joi.object({
  title: Joi.string().trim().max(200),
  description: Joi.string().allow('').max(2000),
  status: Joi.string().valid('Pending', 'In Progress', 'Completed'),
  dueDate: Joi.date().iso().allow(null, ''),
}).min(1);

router.use(taskLimiter);
router.use(auth);

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', validate(taskSchema), createTask);
router.put('/:id', validate(partialTaskSchema), updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
