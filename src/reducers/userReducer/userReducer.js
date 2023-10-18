import { createSlice } from '@reduxjs/toolkit';
import { setNotification } from '../notificationReducer/notificationReducer';
import userService from '../../services/login';
import blogService from '../../services/blogs';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      state = action.payload;
      console.log(JSON.parse(JSON.stringify(state)), 'user in reducer');
      return state;
    }
  }
});

export const { setUser } = userSlice.actions;

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const incomingUser = await userService.login(user);
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user));
      blogService.setToken(incomingUser.token);
      console.log(
        `logging in as ${incomingUser.username} : ${
          incomingUser.token
        }`,
      );
      dispatch(setUser(incomingUser));
      dispatch(setNotification(`Welcome ${incomingUser.name}`));
    } catch(error) {
      console.log(error.response.data.error);
      dispatch(setNotification(`Error logging in: ${error.response.data.error}`));
    }
  };
};

export default userSlice.reducer;