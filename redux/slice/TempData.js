import { createSlice } from "@reduxjs/toolkit";


//initiall state

const initialState ={
   token:null
}


 const dataSlice=createSlice({
    name:"tempData",
    initialState,
    reducers:{
        updateToken:(state,action)=>{
            state.token=action.payload
        }
    }
})


export const { updateToken } = dataSlice.actions;

export const tempDatareducer=dataSlice.reducer

