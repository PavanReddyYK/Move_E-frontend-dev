import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { loadMovies, loadWatchList, setUser } from "../store/slice";
import axios from "axios";
// import useFullPageLoader from "../helper/useFullPageLoader";

const Dash = () => {
  let { token } = useParams();
  const dispatch = useDispatch()
  // const [loader, showLoader, hideLoader] = useFullPageLoader()
  console.log("🚀 ~ file: Dash.js:7 ~ Dash ~ token:", token)
  if (token) {
    sessionStorage.setItem("token", token);
    dispatch(loadWatchList())
  }

  let movies = useSelector((state) => state.movieApp.movies);
  let searchValue = useSelector((state) => state.movieApp.searchValue)
  let filteredMovies = [];


  const fetchUserDetails = () => {
    if (sessionStorage.getItem('token')) {
      axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/user/fetchUserDetails`, {},
        { headers: { Authorization: sessionStorage.getItem('token') } }
      ).then((res) => {
        console.log("fetchUserDetails user: ", res.data);
        dispatch(setUser(res.data.user));
      }).catch((error) => {
        console.log("error in fetchUserDetails through token in URL: ", error);
      })
    }
  }

  useEffect(() => {
    // showLoader()
    dispatch(loadMovies())
    if (token) {
      fetchUserDetails();
    }
    // hideLoader()
  }, [])

  if (searchValue.length >= 2) {
    filteredMovies = movies.filter((movie) => movie.title.substring(0, searchValue.length).toLowerCase() === searchValue.toLowerCase())
  }

  useEffect(() => {
  }, [searchValue])

  return (
    <div style={{ marginTop: "56px" }}>
      {/* {loader} */}
      <Card movies={searchValue.length > 2 ? filteredMovies : movies} searchValue={searchValue} />
    </div>
  );
};

export default Dash;