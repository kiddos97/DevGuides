import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    ID:{
        alluserid:[]
    }
    
  },
  reducers: {
    addId:(state,action) =>{
        const {id} = action.payload
        state.ID.alluserid.push(id)
    }
  }
})

// Action creators are generated for each case reducer function
export const { addId } = userSlice.actions

export default userSlice.reducer