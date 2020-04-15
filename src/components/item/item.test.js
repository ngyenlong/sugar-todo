import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {status, itemType} from '../../common/constant'
import Item from './index';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
test('renders Item component without crashing', () => {
  render( <DndProvider backend={Backend}><Item  /></DndProvider>);
});

test('checkboxes must use click', () => {
    render(<DndProvider backend={Backend}><Item  data={{id: 1, name: 'hello world', status: status.OPEN}}/></DndProvider>);
    const checkbox = document.querySelector("input[type='checkbox']");
    expect(checkbox.checked).toBe(false)
})

  