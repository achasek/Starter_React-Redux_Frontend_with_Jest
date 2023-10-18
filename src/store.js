import { configureStore } from '@reduxjs/toolkit';

import blogReducer from './reducers/blogReducer/blogReducer';
import notificationReducer from './reducers/notificationReducer/notificationReducer';
import userReducer from './reducers/userReducer/userReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer
  }
});

console.log(store.getState(), 'state in store.js');

export default store;