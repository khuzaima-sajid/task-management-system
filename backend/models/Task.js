const mongoose = require('mongoose');

const TASK_STATUSES = ['Pending', 'In Progress', 'Completed'];

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      default: '',
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: TASK_STATUSES,
      default: 'Pending',
    },
    dueDate: {
      type: Date,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

taskSchema.index({ title: 'text', description: 'text' });

module.exports = {
  Task: mongoose.model('Task', taskSchema),
  TASK_STATUSES,
};
