import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import TaskList from './TaskList';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} }))
}));

describe('TaskList', () => {
  it('renders without crashing', () => {
    render(
      <AuthProvider>
        <TaskList />
      </AuthProvider>
    );
    expect(screen.getByText(/Task List/i)).toBeInTheDocument();
  });

  it('allows adding a new task', async () => {
    render(
      <AuthProvider>
        <TaskList />
      </AuthProvider>
    );

    const taskInput = screen.getByPlaceholderText('Task Title');
    const addButton = screen.getByText('Add');

    fireEvent.change(taskInput, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(await screen.findByText('New Task')).toBeInTheDocument();
  });
});