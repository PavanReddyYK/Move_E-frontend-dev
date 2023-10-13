import React from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
  const { id } = useParams();
  return (
    <div style={{ marginTop: "56px", color: "yellow" }}>
      <h2>Movie id : {id}</h2>
    </div>
  );
};

export default Movie;
