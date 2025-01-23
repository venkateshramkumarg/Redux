import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    users:[]
}


export const fetchUsers=createAsyncThunk('users/fetchUsers',async()=>{
    const response=await fetch('api/users');
    return response.json();
})



const usersSlice=createSlice({
    name:"users",
    initialState,
    reducers:{

    },
    extraReducers(builder){
        builder
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.users=action.payload.users;
        })
    }
})


export const {selectAllUsers}=(state)=>state.users

export default usersSlice.reducer;