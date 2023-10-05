import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from './reducers/notificationReducer/notificationReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  }
});

console.log(store.getState(), 'state in store.js');

export default store;