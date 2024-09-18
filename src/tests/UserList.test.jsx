import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../components/UserForm';
import axios from 'axios';

jest.mock('axios');

describe('UserForm Component', () => {
  test('renders the form and submits user data', async () => {
    render(<UserForm />);

    fireEvent.change(screen.getByLabelText(/Name:/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email:/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password:/), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText(/Create User/));

    expect(axios.post).toHaveBeenCalledWith('/api/users', {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    });
  });
});
