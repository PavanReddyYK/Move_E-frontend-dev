import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5343/v1/movie/fetchMovieById/${id}`)
      .then((response) => {
        setMovie(response.data.movie);
      })
      .catch((error) => {
        console.log("Error fetching movie object", error.response);
      });
  }, [id]);

  return (
    <div className="container" style={{ marginTop: "56px"}}>
      <div
        style={{
          background: "white ",
        }}
      >
        <h2>Movie id : {id}</h2>
        <div style={{color:"black"}}>
          {Object.keys(movie).map((key) => (
            <h6 key={key}>
              {key}: {JSON.stringify(movie[key])}
            </h6>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
