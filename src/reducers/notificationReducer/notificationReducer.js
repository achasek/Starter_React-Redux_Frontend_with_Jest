import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      state = action.payload;
      console.log(JSON.parse(JSON.stringify(state)));
      return state;
    }
  }
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;