import { createSlice } from '@reduxjs/toolkit';

const modifiedSlice = createSlice({
  name: 'modifiedBlog',
  initialState: false,
  reducers: {
    toggleModifiedBlog(state, action) {
      state = action.payload;
      return !state;
    }
  }
});

export const { toggleModifiedBlog } = modifiedSlice.actions;

export default modifiedSlice.reducer;