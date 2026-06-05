import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import SearchFilter from '../components/SearchFilter';
import TaskDetails from '../components/TaskDetails';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { taskApi } from '../services/api';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState({ percentage: 0 });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [detailsTask, setDetailsTask] = useState(null);
  const navigate = useNavigate();

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (status !== 'All') params.status = status;

      const { data } = await taskApi.getTasks(params);
      setTasks(data.tasks || []);
      setProgress(data.progress || { percentage: 0 });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, search, status]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleSubmit = async (payload) => {
    setSaving(true);
    setError('');

    try {
      if (editingTask) {
        await taskApi.updateTask(editingTask._id, payload);
      } else {
        await taskApi.createTask(payload);
      }

      setIsFormOpen(false);
      setEditingTask(null);
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;

    try {
      await taskApi.deleteTask(id);
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const openCreate = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold text-slate-900">Task Dashboard</h1>
          <div className="flex gap-2">
            <button onClick={openCreate} className="rounded-md bg-blue-600 px-4 py-2 text-white">
              Create Task
            </button>
            <button onClick={logout} className="rounded-md bg-slate-200 px-4 py-2 text-slate-700">
              Logout
            </button>
          </div>
        </div>

        {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</p>}

        <ProgressBar percentage={progress.percentage || 0} />
        <SearchFilter search={search} setSearch={setSearch} status={status} setStatus={setStatus} />

        {loading ? (
          <div className="rounded-lg bg-white p-6 text-center text-slate-500 shadow-sm">Loading tasks...</div>
        ) : (
          <TaskList tasks={tasks} onEdit={openEdit} onDelete={handleDelete} onView={setDetailsTask} />
        )}
      </div>

      <TaskForm
        open={isFormOpen}
        task={editingTask}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmit}
        loading={saving}
      />

      <TaskDetails task={detailsTask} onClose={() => setDetailsTask(null)} />
    </div>
  );
};

export default DashboardPage;
