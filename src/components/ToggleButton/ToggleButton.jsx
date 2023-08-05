/* eslint-disable indent */
import { useState, useEffect, forwardRef, useImperativeHandle  } from 'react';

import Button from '../Button/Button';

import PropTypes from 'prop-types';

const ToggleButton = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  // when i moved the toggleButton to app to work conditionally for login and newBlog form
  // i had a problem of the newBlog form showing by default after loggin in when what I want is for it to be hidden by default
  // so by connecting the state of the user; since when you login, the user state changes from null to truthy, to the useEffect
  // it fixed the problem since whenever user state changes, visibilty is set to false by default now
  // and by adding props.blogs to dependency array, it hides the newBlog form after a new blog is posted as well
  // but we dont need to add props.blogs anymore since useRef solves this issue
  useEffect(() => {
    setVisible( false );
  }, [props.user]);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  const toggleOffLabel = props.buttonLabel2 || 'Cancel';

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button handleClick={toggleVisibility} buttonLabel={props.buttonLabel} />
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <Button handleClick={toggleVisibility} buttonLabel={toggleOffLabel} />
      </div>
    </div>
  );
});

ToggleButton.propTypes = {
    buttonLabel: PropTypes.string.isRequired
};

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;