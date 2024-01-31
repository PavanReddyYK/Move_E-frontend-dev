import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { loadMovies } from "../store/slice";
// import useFullPageLoader from "../helper/useFullPageLoader";

const Dash = () => {
  let { token } = useParams();
  // const [loader, showLoader, hideLoader] = useFullPageLoader()
  console.log("🚀 ~ file: Dash.js:7 ~ Dash ~ token:", token)
  sessionStorage.setItem("token", token);

  let movies = useSelector((state) => state.movieApp.movies);
  let searchValue = useSelector((state)=>state.movieApp.searchValue)
  let filteredMovies = [];

  const dispatch = useDispatch()

  useEffect(()=>{
    // showLoader()
    dispatch(loadMovies())
    // hideLoader()
  },[])
  
  if(searchValue.length>=2){
    filteredMovies = movies.filter((movie)=>movie.title.substring(0,searchValue.length).toLowerCase()===searchValue.toLowerCase())
  }

  useEffect(()=>{
  },[searchValue])

  return (
    <div style={{marginTop:"56px"}}>
      {/* {loader} */}
      <Card movies={searchValue.length>2?filteredMovies:movies} searchValue={searchValue}/>
    </div>
  );
};

export default Dash;
