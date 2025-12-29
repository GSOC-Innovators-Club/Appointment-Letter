import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [regNo, setRegNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await login(email.trim(), regNo.trim());
    setLoading(false);
    if (res.success) {
      onClose?.();
    } else {
      setError(res.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
          <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="enter your vit bhopal email id"
          type="email"
          className="mt-1 block w-full rounded-md border-gray-200 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Registration Number</label>
        <input
          value={regNo}
          onChange={e => setRegNo(e.target.value)}
          placeholder="enter your registration number in uppercase"
          className="mt-1 block w-full rounded-md border-gray-200 shadow-sm"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;