import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

// add a beforeEach that logs the user in before testing some of these things since token may expire if we dont do this

test('renders content', () => {
  const blog = {
    title: 'Jest Test Blog',
    author: 'Jest',
    url: 'www.jest.com',
    // needs a user attached for test. thisiskyra id
    user: '64c07adce56d84be2f5d69a0'
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText('Jest Test Blog');

  // screen.debug() with no arg prints the entire component
  // screen.debug();
  // whereas with an arg, it only prints the arg provided
  screen.debug(element);

  expect(element).toBeDefined();
});

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Jest Test Blog',
    author: 'Jest',
    url: 'www.jest.com',
    likes: 1,
    // needs a user attached for test. thisiskyra id
    user: '64c07adce56d84be2f5d69a0'
  };

  const mockHandler = jest.fn();

  render(
    <Blog blog={blog} handleLike={mockHandler} />
  );

  const user = userEvent.setup();
  const button = screen.getByText('Like');
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});