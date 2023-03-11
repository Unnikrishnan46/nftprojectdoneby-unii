import blogReducer from "./reducers/BlogReducer";
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    blog: blogReducer,
  }
})

export default store;