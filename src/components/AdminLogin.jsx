import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const SECRET_ADMIN_PASSWORD = '123456';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === SECRET_ADMIN_PASSWORD) {
      localStorage.setItem('adminAuthtoken', 'true-authenticated-admin');
      
      navigate('/admin');
    } else {
      setError('Falsches Passwort!');
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white border rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {error && <p className="text-sm text-center text-red-500">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Anmelden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
