import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { MdFlight } from 'react-icons/md';
import '../styles/Auth.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 900);
  };

  return (
    <div className="auth-root">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon"><MdFlight size={22} /></div>
          <span className="auth-logo-text">Pacific Travel</span>
        </div>

        <h2 className="auth-title">Create account</h2>
        <p className="auth-sub">Set up your admin account</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Full name</label>
            <div className="auth-input-wrap">
              <FiUser className="auth-input-icon" size={16} />
              <input
                type="text"
                placeholder="Admin User"
                value={form.name}
                onChange={e => set('name', e.target.value)}
              />
            </div>
          </div>

          <div className="auth-field">
            <label>Email address</label>
            <div className="auth-input-wrap">
              <FiMail className="auth-input-icon" size={16} />
              <input
                type="email"
                placeholder="admin@example.com"
                value={form.email}
                onChange={e => set('email', e.target.value)}
              />
            </div>
          </div>

          <div className="auth-field">
            <label>Password</label>
            <div className="auth-input-wrap">
              <FiLock className="auth-input-icon" size={16} />
              <input
                type={showPwd ? 'text' : 'password'}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={e => set('password', e.target.value)}
              />
              <button type="button" className="auth-eye-btn" onClick={() => setShowPwd(v => !v)}>
                {showPwd ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          <div className="auth-field">
            <label>Confirm password</label>
            <div className="auth-input-wrap">
              <FiLock className="auth-input-icon" size={16} />
              <input
                type={showPwd ? 'text' : 'password'}
                placeholder="Repeat password"
                value={form.confirm}
                onChange={e => set('confirm', e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
