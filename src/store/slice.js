import {createSlice} from "@reduxjs/toolkit";

const initialValues = {
    user:{}
}

const userSlice = createSlice({
    name: 'user',
    initialState:initialValues,
    reducers : {
        setUsers : (state,{payload})=>{
            state.user = payload
        }
    }
})

export const {setUsers} = userSlice.actions;

export default userSlice.reducer;