import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    visibility: 'public',
  });
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', formData);
      alert('Registration successful!');
      history.push('/'); // Redirect to login page after successful registration
    } catch (error) {
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
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
        <select
          name="visibility"
          value={formData.visibility}
          onChange={handleInputChange}
          required
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
