import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import List from './index';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

test('renders List component without crashing', () => {
  render( <DndProvider backend={Backend}><List  /></DndProvider>);
});

test('click title to open input', () => {
    const { getByTitle } = render( <DndProvider backend={Backend}><List  /></DndProvider>);
    const title = getByTitle(/click to edit/i);
    fireEvent.click(title)
    const input = document.querySelector('.todo-item input');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe(title.innerHTML)
});

test('click add new list', () => {
    const { getByText } = render( <DndProvider backend={Backend}><List  /></DndProvider>);
    const addBtn = getByText(/playlist_add/i);
    fireEvent.click(addBtn)
    const input = document.querySelector('.add-input');
    expect(input).toBeInTheDocument();
});
  