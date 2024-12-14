import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentuserID:''
    
  },
  reducers: {
    addId:(state,action) =>{
      state.currentuserID = action.payload.currentuserID;
    }
  }
})

// Action creators are generated for each case reducer function
export const { addId } = userSlice.actions

export default userSlice.reducer