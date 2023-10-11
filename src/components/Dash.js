import React from "react";
import { useParams } from "react-router-dom";

const Dash = () => {
  let { token } = useParams();
  sessionStorage.setItem("token", token);
  return (
    <div style={{marginTop : "56px"}}>
      <>Dash</>
    </div>
  );
};

export default Dash;
