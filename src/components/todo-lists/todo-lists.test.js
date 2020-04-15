import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoLists from './index';

test('renders TodoLists component without crashing', () => {
  render( <TodoLists />);
});

test('renders dashboard title', () => {
    const { getByText } = render(<TodoLists />);
    const title = getByText(/DASHBOARD/i);
    expect(title).toBeInTheDocument();
});

  