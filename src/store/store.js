import {applyMiddleware, configureStore} from "@reduxjs/toolkit";
import movieReducer from "./slice";
import thunk from "redux-thunk";

export const store = configureStore({
    reducer:{
        movieApp : movieReducer
    }
},applyMiddleware(thunk))