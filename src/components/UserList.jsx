import PropTypes from 'prop-types';
import UserCard from './UserCard';

const UserList = ({ users, setUsers }) => {
  // Ensure users is an array before mapping
  if (!Array.isArray(users)) {
    return <div>No users found.</div>;
  }

  const handleUserUpdated = (updatedUser) => {
    setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user));
  };

  const handleUserDeleted = (userId) => {
    setUsers(users.filter(user => user._id !== userId));
  };

  return (
    <div className="user-grid">
      {users.map(user => (
        <UserCard
          key={user._id}
          user={user}
          onUserUpdated={handleUserUpdated}
          onUserDeleted={handleUserDeleted}
        />
      ))}
    </div>
  );
};

// Add prop types validation
UserList.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default UserList;
