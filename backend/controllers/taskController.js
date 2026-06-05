const mongoose = require('mongoose');
const { Task } = require('../models/Task');
const buildTaskQuery = require('../middleware/searchFilter');

const getProgress = (tasks) => {
  if (!tasks.length) {
    return { total: 0, completed: 0, percentage: 0 };
  }

  const completed = tasks.filter((task) => task.status === 'Completed').length;
  return {
    total: tasks.length,
    completed,
    percentage: Math.round((completed / tasks.length) * 100),
  };
};

const getTasks = async (req, res, next) => {
  try {
    const query = buildTaskQuery(req, req.user.id);
    const tasks = await Task.find(query).sort({ createdAt: -1 });

    return res.json({ tasks, progress: getProgress(tasks) });
  } catch (error) {
    return next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const taskId = new mongoose.Types.ObjectId(req.params.id);
    const task = await Task.findOne({ _id: taskId, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json(task);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    return next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user.id });
    return res.status(201).json(task);
  } catch (error) {
    return next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const taskId = new mongoose.Types.ObjectId(req.params.id);
    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json(task);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const taskId = new mongoose.Types.ObjectId(req.params.id);
    const task = await Task.findOneAndDelete({ _id: taskId, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    return next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
