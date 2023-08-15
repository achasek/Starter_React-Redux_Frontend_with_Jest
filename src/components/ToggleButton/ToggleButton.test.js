import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleButton from './ToggleButton';

// add test to blog.test that checks if only the title is rendered and all other details are not defined or shown until toggle button clicked, then check here if those elements are now shown/defined
// add mock func call to handleLike and check that if button is called 2 times, that it was passed down as props twice. Start with : expect(addBlog.mock.calls).toHaveLength(2);

describe('<Togglable />', () => {
  let container;

  beforeEach(() => {
    container = render(
      <ToggleButton buttonLabel="show...">
        <div className="testDiv" >
          togglable content
        </div>
      </ToggleButton>
    ).container;
  });

  test('renders its children', async () => {
    await screen.findAllByText('togglable content');
  });

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show...');
    await user.click(button);

    const div = container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('toggled content can be closed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show...');
    await user.click(button);

    const closeButton = screen.getByText('Cancel');
    await user.click(closeButton);

    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
});