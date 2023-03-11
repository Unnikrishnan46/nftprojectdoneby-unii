import { createSlice } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState = {
  blogList: [],
}

export const blogReducer = createSlice({
  name: 'blog',
  initialState: initialState,
  reducers: {
    setBlogList: (state, payload) => {
      state.blogList = payload.payload;
    }
  },

  extraReducers: (builder) => {
  }
})

export const {setBlogList} = blogReducer.actions

export default blogReducer.reducer
