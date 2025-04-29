import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../axios';
import './Auth.css';

const AuthPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '', visibility: 'public' });
  const [isLogin, setIsLogin] = useState(true);
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isLogin
        ? await api.post('/auth/login', formData)
        : await api.post('/auth/register', formData);
      
      localStorage.setItem('token', response.data.token);
      history.push('/home');
    } catch (error) {
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleFormSubmit}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {!isLogin && (
          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleInputChange}
            required
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Don’t have an account? Register here' : 'Already have an account? Login here'}
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
