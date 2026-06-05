import { useEffect, useState } from 'react';

const initialState = {
  title: '',
  description: '',
  status: 'Pending',
  dueDate: '',
};

const TaskForm = ({ open, task, onClose, onSubmit, loading }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (!open) return;

    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'Pending',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : '',
      });
    } else {
      setForm(initialState);
    }
  }, [open, task]);

  if (!open) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      ...form,
      dueDate: form.dueDate || null,
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold">{task ? 'Edit Task' : 'Create Task'}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full rounded-md border border-slate-300 p-2 outline-none ring-blue-500 focus:ring"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
            className="w-full rounded-md border border-slate-300 p-2 outline-none ring-blue-500 focus:ring"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 p-2 outline-none ring-blue-500 focus:ring"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <input
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 p-2 outline-none ring-blue-500 focus:ring"
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-md bg-slate-100 px-4 py-2 text-slate-700">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white disabled:opacity-60"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
