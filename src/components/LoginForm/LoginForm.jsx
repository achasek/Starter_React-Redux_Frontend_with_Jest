/* eslint-disable no-trailing-spaces */
import { useState } from 'react';
import { setNotification } from '../../reducers/notificationReducer/notificationReducer';
import { useDispatch } from 'react-redux';

// components/page imports

// utils / API imports
import loginService from '../../services/login';
import blogService from '../../services/blogs';
import PropTypes from 'prop-types';

const LoginForm = ({ setUser, notificationTimeout }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(false);

  const dispatch = useDispatch();

  // only censors password in the console.log statement in handleLogin()
  const passwordCensor = (password) => {
    let str = [];
    for (let i = 0; i < password.length; i++) {
      str.push('*');
    }
    str = str.join('');
    return str;
  };

  const viewPassword = (event) => {
    event.preventDefault();
    setSeePassword(!seePassword);
  };

  // move some functionalilty of this to app.js just like was done with CreateBlogForm
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      console.log(
        `logging in as ${username} : ${passwordCensor(password)} : ${
          user.token
        }`,
      );
      dispatch(setNotification(`Welcome ${user.name}`));
      notificationTimeout(5000);
    } catch (error) {
      console.log(error.name, error.message);
      dispatch(setNotification('Invalid Username or Password'));
      notificationTimeout(5000);
    }
  };

  return (
    // old conditional rendering prior to props.children implementation and ToggleButton component
    // <>
    //     {!showLogin ?
    //     <>
    //         <Button handleClick={() => setShowLogin(true)} buttonLabel='Login' />
    //     </>
    //     :
    //     <>
    //         <h1>Login Form</h1>
    //             <form onSubmit={handleLogin}>
    //             <div>
    //                 username:
    //             <input
    //                 type="text"
    //                 value={username}
    //                 name="Username"
    //                 onChange={({ target }) => setUsername(target.value)}
    //             />
    //             </div>
    //             <div>
    //                 password:
    //             <input
    //                 type={seePassword ? "text" : "password"}
    //                 value={password}
    //                 name="Password"
    //                 onChange={({ target }) => setPassword(target.value)}
    //             />
    //             </div>
    //             <button onClick={viewPassword}>See password</button>
    //             <button type="submit">login</button>
    //         </form>
    //         <Button handleClick={() => setShowLogin(false)} buttonLabel='Cancel' />
    //     </>
    //     }
    // </>
    <>
      <h1>Login Form</h1>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            id="password"
            type={seePassword ? 'text' : 'password'}
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
      <button onClick={viewPassword}>See password</button>
    </>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
