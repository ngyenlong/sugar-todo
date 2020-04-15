import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateForm from './index';

test('renders createform component without crashing', () => {
  render(<CreateForm />);
});

test('onchange input and reset value after submit', () => {
    const { getByPlaceholderText, getByText } = render(<CreateForm />);
    const input = getByPlaceholderText(/New To-Do List/i);
    const button = getByText(/Create/i)
    fireEvent.change(input, { target: { value: 'New todo' } })
    expect(input.value).toBe('New todo')
    fireEvent.click(button)
    expect(input.value).toBe('')
})

  