const TaskDetails = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Task Details</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            ✕
          </button>
        </div>

        <div className="space-y-3 text-sm text-slate-700">
          <div>
            <span className="font-semibold">Title: </span>
            {task.title}
          </div>
          <div>
            <span className="font-semibold">Description: </span>
            {task.description || 'No description'}
          </div>
          <div>
            <span className="font-semibold">Status: </span>
            {task.status}
          </div>
          <div>
            <span className="font-semibold">Due Date: </span>
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
