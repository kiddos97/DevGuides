import { configureStore } from '@reduxjs/toolkit'
import socialReducer from './features/PostandComments/socialSlice'
import userReducer from './features/user/userSlice';
import searchReducer from './features/search/searchSlice';
export default configureStore({
  reducer: {
    social:socialReducer,
    user:userReducer,
    search:searchReducer
  }
})