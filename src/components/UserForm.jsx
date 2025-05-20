import React, { useState } from 'react';
import Swal from 'sweetalert2';
import validateUser from '../utils/Validate'; // Make sure this function is correctly implemented
import { addUser } from '../api'; // Make sure this API is correctly configured
import './style.css'; // Your custom styles (optional)

const UserForm = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    group: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    const validationErrors = validateUser(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log("helloo");
      
      return;
    }

    try {
      const response = await addUser(formData); // API call to add user

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data?.message || 'User added successfully!',
      });

      setFormData({ firstName: '', lastName: '', email: '', group: '' });
      if (onUserAdded) onUserAdded();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || error.message || 'Something went wrong!',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>Add User</h2>

      <div className="form-group">
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <span className="error-text">{errors.firstName}</span>}
      </div>

      <div className="form-group">
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <span className="error-text">{errors.lastName}</span>}
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Group:</label>
        <select name="group" value={formData.group} onChange={handleChange}>
          <option value="">Select Group</option>
          <option value="CSE">CSE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
        </select>
        {errors.group && <span className="error-text">{errors.group}</span>}
      </div>

      <button type="submit" className="submit-btn">Add User</button>
    </form>
  );
};

export default UserForm;
