const statusColor = {
  Pending: 'bg-amber-100 text-amber-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Completed: 'bg-emerald-100 text-emerald-700',
};

const TaskList = ({ tasks, onEdit, onDelete, onView }) => {
  if (!tasks.length) {
    return <div className="rounded-lg bg-white p-6 text-center text-slate-500 shadow-sm">No tasks found.</div>;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task._id} className="rounded-lg bg-white p-4 shadow-sm">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColor[task.status]}`}>
              {task.status}
            </span>
          </div>
          <p className="mb-3 text-sm text-slate-600">{task.description || 'No description provided.'}</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <button onClick={() => onView(task)} className="rounded-md bg-slate-100 px-3 py-1 text-slate-700">
              View
            </button>
            <button onClick={() => onEdit(task)} className="rounded-md bg-blue-100 px-3 py-1 text-blue-700">
              Edit
            </button>
            <button onClick={() => onDelete(task._id)} className="rounded-md bg-red-100 px-3 py-1 text-red-700">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
