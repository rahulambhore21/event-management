import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Auth.css'
import { useApi } from '../../Context/Context';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const api = useApi();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Clear form fields when toggling between login and register
    setName('');
    setEmail('');
    setCollege('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('All fields are required');
      return;
    }
    
    if (!isLogin) {
      if (!name || !college) {
        setError('All fields are required');
        return;
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
    }
    
    try {
      let response;
      
      if (isLogin) {
        response = await api.login(email, password);
      } else {
        response = await api.register({ 
          name, email, college, password, confirmPassword, role 
        });
      }
      
      // Save token and user info to localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || (isLogin ? 'Login failed. Please try again.' : 'Registration failed. Please try again.'));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>
          <p>{isLogin ? 'Sign in to continue to your account' : 'Register to join our community'}</p>
        </div>
        
        <div className="auth-body">
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="form-group">
                  <input 
                    type="text"
                    className="form-input"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text"
                    className="form-input"
                    placeholder="College/University"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                  />
                </div>
              </>
            )}
            
            <div className="form-group">
              <input 
                type="email"
                className="form-input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <input 
                type="password"
                className="form-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            {!isLogin && (
              <>
                <div className="form-group">
                  <input 
                    type="password"
                    className="form-input"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <select 
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </>
            )}
            
            {isLogin && (
              <div className="remember-forgot">
                <label className="form-checkbox">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="auth-link">Forgot password?</a>
              </div>
            )}
            
            <button type="submit" className="auth-btn">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          <div className="auth-footer">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span className="auth-link" onClick={toggleForm}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth