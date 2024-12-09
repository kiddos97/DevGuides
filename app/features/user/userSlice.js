import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    ID:''
    
  },
  reducers: {
    addId:(state,action) =>{
      state.ID = action.payload.ID;
    }
  }
})

// Action creators are generated for each case reducer function
export const { addId } = userSlice.actions

export default userSlice.reducer