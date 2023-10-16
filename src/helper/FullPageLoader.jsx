import React from "react";
// import ClipLoader from "react-spinners";
// import Spinner from "react-bootstrap/Spinner";
import Spinner from "../assets/Spinner.gif";

const FullPageLoader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <img src={Spinner} alt="Loading..."/>
      </div>
    </div>
  );
};

export default FullPageLoader;
