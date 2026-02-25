import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { MdFlight } from 'react-icons/md';
import '../styles/Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email) { setError('Please enter your email address.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 900);
  };

  return (
    <div className="auth-root">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon"><MdFlight size={22} /></div>
          <span className="auth-logo-text">Pacific Travel</span>
        </div>

        {sent ? (
          <div className="auth-success-state">
            <div className="auth-success-icon"><FiCheckCircle size={44} /></div>
            <h2 className="auth-title">Check your email</h2>
            <p className="auth-sub">
              We've sent a password reset link to <strong>{email}</strong>.
              Check your inbox and follow the instructions.
            </p>
            <Link to="/login" className="auth-btn auth-btn-link">Back to Sign In</Link>
          </div>
        ) : (
          <>
            <h2 className="auth-title">Forgot password?</h2>
            <p className="auth-sub">
              Enter your email and we'll send you a reset link.
            </p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label>Email address</label>
                <div className="auth-input-wrap">
                  <FiMail className="auth-input-icon" size={16} />
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? <span className="auth-spinner" /> : 'Send Reset Link'}
              </button>
            </form>

            <p className="auth-switch">
              <Link to="/login" className="auth-back-link">
                <FiArrowLeft size={14} /> Back to Sign In
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
