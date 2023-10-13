import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialValues = {
    user:{},
    movies:[]
}

const userSlice = createSlice({
    name: 'move-E',
    initialState:initialValues,
    reducers : {
        setUser : (state,{payload})=>{
            state.user = payload
        },
        setMovies : (state,{payload})=>{
            state.movies = payload
        }
    }
})

export const {setUser, setMovies} = userSlice.actions;
export const loadMovies =()=> async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:${process.env.REACT_APP_DEV_BACKEND_PORT}/v1/movie/fetchAllMovies`);
        const data = response.data;

        if (data.message === "success" && data.movies) {
            const movies = data.movies; 
            dispatch(setMovies(movies))
        }
    } catch (error) {
        throw error;
    }
}


export default userSlice.reducer;