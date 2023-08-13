import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateBlogForm from './CreateBlogForm';
import userEvent from '@testing-library/user-event';

test('<CreateBlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = jest.fn();
  const user = userEvent.setup();

  render(<CreateBlogForm addBlog={addBlog} />);

  const titleInput = screen.getByPlaceholderText('title of blog');
  const authorInput = screen.getByPlaceholderText('author of blog');
  const urlInput = screen.getByPlaceholderText('url of blog');

  const sendButton = screen.getByText('Post');

  screen.debug();

  await user.type(titleInput, 'testing title form...');
  await user.type(authorInput, 'testing author form...');
  await user.type(urlInput, 'testing url form...');
  await user.click(sendButton);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe('testing title form...');
  expect(addBlog.mock.calls[0][0].author).toBeDefined();
  expect(addBlog.mock.calls[0][0].url).toBeDefined();
});