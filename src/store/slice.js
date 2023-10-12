import {createSlice} from "@reduxjs/toolkit";

const initialValues = {
    user:{},
    movies:[]
}

const userSlice = createSlice({
    name: 'move-E',
    initialState:initialValues,
    reducers : {
        setUsers : (state,{payload})=>{
            state.user = payload
        },
        setMovies : (state,{payload})=>{
            state.movies = payload
        }
    }
})

export const {setUsers, setMovies} = userSlice.actions;

export default userSlice.reducer;