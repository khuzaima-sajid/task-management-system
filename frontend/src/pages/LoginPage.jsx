import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await authApi.login({ email, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm">
        <h1 className="mb-5 text-2xl font-semibold">Login</h1>

        {error && <p className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-600">{error}</p>}

        <div className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            required
            className="w-full rounded-md border border-slate-300 p-2 outline-none ring-blue-500 focus:ring"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
            className="w-full rounded-md border border-slate-300 p-2 outline-none ring-blue-500 focus:ring"
          />
          <button
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-2 font-medium text-white disabled:opacity-60"
          >
            {loading ? 'Please wait...' : 'Login'}
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-600">
          New here?{' '}
          <Link to="/register" className="text-blue-600">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
