const { TASK_STATUSES } = require('../models/Task');

const buildTaskQuery = (req, userId) => {
  const { search, status } = req.query;
  const query = { user: userId };

  if (search?.trim()) {
    const regex = new RegExp(search.trim(), 'i');
    query.$or = [{ title: regex }, { description: regex }];
  }

  if (status && TASK_STATUSES.includes(status)) {
    query.status = status;
  }

  return query;
};

module.exports = buildTaskQuery;
