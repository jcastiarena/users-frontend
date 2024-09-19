import { useState } from 'react';
import { createUser } from '../services/userService';
import PropTypes from 'prop-types';

const CreateUserModal = ({ onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await createUser(formData);
      console.log('New user created:', newUser.data);
      onUserCreated(newUser.data);
      onClose(); // Close the modal after creating the user
    } catch (error) {
      console.error('Error creating user', error);
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit">Create</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

CreateUserModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUserCreated: PropTypes.func.isRequired
};

export default CreateUserModal;
