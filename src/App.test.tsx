import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

var todoItems: Array<any> = [];
todoItems.push({index: 1, value: "learn react", done: false});
todoItems.push({index: 2, value: "Go shopping", done: true});
todoItems.push({index: 3, value: "buy flowers", done: true});

test('renders learn react link', () => {
  const { getByText } = render(<App initItems={todoItems}/>);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
