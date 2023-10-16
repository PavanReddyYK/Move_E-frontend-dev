import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { loadMovies } from "../store/slice";
import useFullPageLoader from "../helper/useFullPageLoader";

const Dash = () => {
  let { token } = useParams();
  const [loader, showLoader, hideLoader] = useFullPageLoader()
  console.log("🚀 ~ file: Dash.js:7 ~ Dash ~ token:", token)
  sessionStorage.setItem("token", token);

  const dispatch = useDispatch()

  useEffect(()=>{
    showLoader()
    dispatch(loadMovies())
    hideLoader()
  },[])

  return (
    <div style={{marginTop:"56px"}}>
      {loader}
      <Card/>
    </div>
  );
};

export default Dash;
