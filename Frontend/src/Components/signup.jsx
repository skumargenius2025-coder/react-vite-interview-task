import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const Signup = ({ onClose, onSwitchToLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Demo signup - replace with actual API call
    onSignupSuccess({ 
      name: formData.firstName.toLowerCase(), 
      email: formData.email 
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      
      <div 
        className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
        >
          <FaTimes size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-white/80">Start your interview journey today</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white/90 text-sm font-semibold mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label className="block text-white/90 text-sm font-semibold mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white/90 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white/90 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
              placeholder="Create password"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white/90 text-sm font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
              placeholder="Confirm password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all mb-4"
          >
            Create Account →
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="px-4 text-white/60 text-sm">or</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        <button className="w-full bg-white/10 border border-white/20 text-white font-semibold py-3 rounded-lg mb-4 hover:bg-white/20 transition-all flex items-center justify-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <rect x="2" y="2" width="10" height="10" fill="#F25022"/>
            <rect x="12" y="2" width="10" height="10" fill="#7FBA00"/>
            <rect x="2" y="12" width="10" height="10" fill="#00A4EF"/>
            <rect x="12" y="12" width="10" height="10" fill="#FFB900"/>
          </svg>
          Sign up with Microsoft
        </button>

        <p className="text-center text-white/80">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-primary font-semibold hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;