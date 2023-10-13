import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { loadMovies } from "../store/slice";

const Dash = () => {
  let { token } = useParams();
  console.log("🚀 ~ file: Dash.js:7 ~ Dash ~ token:", token)
  sessionStorage.setItem("token", token);

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(loadMovies())
  },[])

loadMovies()

  return (
    <div style={{marginTop:"56px"}}>
      <Card/>
    </div>
  );
};

export default Dash;
