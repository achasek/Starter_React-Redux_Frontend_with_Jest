import { configureStore } from '@reduxjs/toolkit';

import blogReducer from './reducers/blogReducer/blogReducer';
import notificationReducer from './reducers/notificationReducer/notificationReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer
  }
});

console.log(store.getState(), 'state in store.js');

export default store;