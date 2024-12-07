import { configureStore } from '@reduxjs/toolkit'
import socialReducer from './features/PostandComments/socialSlice'
import userReducer from './features/User/userSlice';

export default configureStore({
  reducer: {
    social:socialReducer,
    user:userReducer
  }
})