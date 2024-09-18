import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/globals.scss';

function App() {
  const [users, setUsers] = useState([]); // Initialize users as an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const [editingUserId, setEditingUserId] = useState(null); // Track the user being edited
  const [editFormData, setEditFormData] = useState({}); // Track form data for editing
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', password: '' }); // Form data for new user


  useEffect(() => {
    // Fetch the users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data); // Assuming response.data contains the array of users
        setLoading(false); // Data fetched, stop loading
      } catch (err) {
        setError(err); // Set error if fetching fails
        setLoading(false); // Stop loading if there was an error
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete the user. Please try again.');
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditFormData({
      name: user.name,
      email: user.email,
      password: user.password, // You can choose to leave this out if you don't want to edit the password
    });
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditFormData({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleSaveEdit = async (userId) => {
    try {
      // Send PATCH request to update the user
      await axios.patch(`http://localhost:3000/api/users/${userId}`, editFormData);

      // Update the users state with the updated data
      setUsers(users.map(user => (user._id === userId ? { ...user, ...editFormData } : user)));

      setEditingUserId(null); // Exit edit mode
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update the user. Please try again.');
    }
  };

  const handleCreateUserChange = (e) => {
    const { name, value } = e.target;
    setNewUserForm({
      ...newUserForm,
      [name]: value,
    });
  };

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users', newUserForm);
      setUsers([...users, response.data]); // Add the newly created user to the list
      setIsModalOpen(false); // Close the modal
      setNewUserForm({ name: '', email: '', password: '' }); // Reset the form
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create the user. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message
  }

  if (error) {
    return <div>Error loading users: {error.message}</div>; // Show an error message
  }

  return (
    <div>
      <h1>User List</h1>
      <button onClick={() => setIsModalOpen(true)}>New User</button>
      <div className="user-grid">
        {users && users.length > 0 ? (
          users.map(user => (
            <div key={user._id} className="user-card">
              {editingUserId === user._id ? (
                // Edit mode
                <div>
                  <div>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div>
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div>
                    <label>Password:</label>
                    <input
                      type="password"
                      name="password"
                      value={editFormData.password}
                      onChange={handleEditChange}
                    />
                  </div>
                  <button onClick={() => handleSaveEdit(user._id)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                // View mode
                <div>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                  <button onClick={() => handleEditClick(user)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create New User</h2>
            <form onSubmit={handleCreateUserSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newUserForm.name}
                  onChange={handleCreateUserChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={newUserForm.email}
                  onChange={handleCreateUserChange}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={newUserForm.password}
                  onChange={handleCreateUserChange}
                  required
                />
              </div>
              <button type="submit">Create</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
