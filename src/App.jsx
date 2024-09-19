import { useState, useEffect } from 'react';
import UserList from './components/UserList';
import CreateUserModal from './components/CreateUserModal';
import './styles/globals.scss';
import { getUsers } from './services/userService';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch the list of users from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleUserCreated = (newUser) => {
    setUsers((prevUsers) => {
      if (Array.isArray(prevUsers)) {
        return [...prevUsers, newUser]; // Append the new user to the existing users array
      }
      return [newUser]; // In case prevUsers is not an array, initialize it with the new user
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading users: {error.message}</div>;

  return (
    <div>
      <h1>Users</h1>
      <button onClick={() => setIsModalOpen(true)}>New User</button>
      <UserList users={users} setUsers={setUsers} />
      {isModalOpen && (
        <CreateUserModal
          onClose={() => setIsModalOpen(false)}
          onUserCreated={handleUserCreated}
        />
      )}
    </div>
  );
}

export default App;
