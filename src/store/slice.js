import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialValues = {
    user:{},
    movies:[],
    searchValue:"",
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
        },
        setSearchValue : (state,{payload})=>{
            state.searchValue = payload
        }
    }
})

export const {setUser, setMovies, setSearchValue} = userSlice.actions;

export const loadMovies =()=> async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/movie/fetchAllMovies`);
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