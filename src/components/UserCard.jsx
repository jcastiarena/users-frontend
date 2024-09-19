import { useState } from 'react';
import EditUserForm from './EditUserForm';
import { editUser, deleteUser } from '../services/userService';
import PropTypes from 'prop-types';

const UserCard = ({ user, onUserUpdated, onUserDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveEdit = async (updatedUser) => {
    try {
      console.log('Attempting to edit user:', user);
      const savedUser = await editUser(user._id, updatedUser);
      console.log('User updated:', savedUser);
      onUserUpdated(savedUser.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(user._id);
        onUserDeleted(user._id);
      } catch (error) {
        console.error('Failed to delete user', error);
      }
    }
  };

  return (
    <div className="user-card">
      {isEditing ? (
        <EditUserForm
          user={user}
          onSave={handleSaveEdit}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onUserUpdated: PropTypes.func.isRequired,
  onUserDeleted: PropTypes.func.isRequired,
};

export default UserCard;
