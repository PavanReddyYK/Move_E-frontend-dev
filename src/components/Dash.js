import React from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

const Dash = () => {
  let { token } = useParams();
  sessionStorage.setItem("token", token);
  return (
    <div style={{marginTop:"56px"}}>
      <Card/>
    </div>
  );
};

export default Dash;
