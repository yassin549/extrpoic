import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Simulate successful registration
    console.log('Simulating registration for:', email);
    // In a real app, you would dispatch an action or call an API here.
    // For now, we'll just redirect to the dashboard.
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center">
      <div className="bg-card-dark p-8 rounded-lg shadow-lg w-full max-w-md border border-subtle-border">
        <h2 className="text-2xl font-bold text-light-text mb-2 text-center">Create an Account</h2>
        <p className="text-mid-gray mb-6 text-center">Join now and start winning</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-light-text mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-muted-surface border border-subtle-border rounded-md p-2 text-light-text focus:ring-primary-blue focus:border-primary-blue"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-light-text mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-muted-surface border border-subtle-border rounded-md p-2 text-light-text focus:ring-primary-blue focus:border-primary-blue"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-error-red text-sm text-center mb-4">{error}</p>}
          <button type="submit" className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white font-bold py-2 px-4 rounded-md transition-colors">
            Sign Up
          </button>
        </form>
        <p className="text-mid-gray text-sm text-center mt-4">
          Already have an account? <Link to="/login" className="text-primary-blue hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
