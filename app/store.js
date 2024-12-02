import { configureStore } from '@reduxjs/toolkit'
import socialReducer from './features/PostandComments/socialSlice'
export default configureStore({
  reducer: {socialReducer}
})