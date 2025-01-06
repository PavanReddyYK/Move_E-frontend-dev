import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { filterWatchList } from './../helper/helper';

const initialValues = {
    user:{},
    watchList:[],
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
        setWatchList : (state,{payload})=>{
            state.watchList = payload
        },
        pushToWatchList : (state,{payload})=> {
            state.watchList = [...state.watchList, payload]
        },
        removeFromWatchList : (state,{payload})=> {
            state.watchList = state.watchList.filter(item => item.id !== payload.id);
        },
        setMovies : (state,{payload})=>{
            state.movies = payload
        },
        setSearchValue : (state,{payload})=>{
            state.searchValue = payload
        }
    }
})

export const {setUser, setWatchList, pushToWatchList, setMovies, setSearchValue} = userSlice.actions;

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

export const loadWatchList =()=> async (dispatch)=>{
    try{
        const response = await axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/movie/fetchMovieWatchList`,{},{
            headers: {Authorization: sessionStorage.getItem('token')}
        })
        const data = response.data;
        console.log('loadWatchList',response.data)
        if(data.message !== 'none'){
            console.log("first",data.watchList.movies)
            const watchList = filterWatchList(data.watchList.movies)
            console.log("jssj",watchList)
            dispatch(setWatchList(watchList))
        }
    } catch (error){
        throw error
    }
}

export default userSlice.reducer;