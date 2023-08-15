import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

// add a beforeEach that logs the user in before testing some of these things since token may expire if we dont do this

test('renders content: but only renders title when toggleButton is not toggled', () => {
  const blog = {
    title: 'Jest Test Blog',
    author: 'Jest',
    url: 'www.jest.com',
    // needs a user attached for test. thisiskyra id
    user: '64c07adce56d84be2f5d69a0'
  };

  const { container } = render(<Blog blog={blog} />);

  const elementToView = screen.getByText('Jest Test Blog');
  const elementHidden = container.querySelector('.togglableContent');

  // screen.debug() with no arg prints the entire component
  // screen.debug();
  // whereas with an arg, it only prints the arg provided
  screen.debug(elementToView);

  expect(elementToView).toBeDefined();
  expect(elementHidden).toHaveStyle('display: none');
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

  console.log(mockHandler.mock.calls, 'FIRST MOCK CONSOLE');
  expect(mockHandler.mock.calls).toHaveLength(1);
});

test('clicking the button twice calls event handler twice', async () => {
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
  await user.click(button);

  console.log(mockHandler.mock.calls);

  expect(mockHandler.mock.calls).toHaveLength(2);
});