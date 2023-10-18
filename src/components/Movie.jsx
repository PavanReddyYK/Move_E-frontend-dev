import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const Movie = () => {
  const { id } = useParams();
  let [movie, setMovie] = useState({title:false});
  const user = useSelector(state=>state.movieApp.user)

  useEffect(() => {
    axios
      .get(`http://localhost:${process.env.REACT_APP_DEV_BACKEND_PORT}/v1/movie/fetchMovieById/${id}`)
      .then((response) => {
        // console.log(response.data.movieData)
        setMovie(response.data.movieData);
      })
      .catch((error) => {
        console.log("Error fetching movie object", error.response);
      });
  }, [id]);

  const handleWatchList=()=>{
    if(!user.name){
      alert('Please login to add this movie in your watch list')
      return;
      }
      else{
        axios.post(`http://localhost:${process.env.REACT_APP_DEV_BACKEND_PORT}/v1/movie/addMovieToWatchlist`,
        {movieId:id},
        {
          headers:{Authorization: sessionStorage.getItem('token')}
        })
        .then((response)=>{
          alert('Added to Watch List Successfully');
        })
        .catch((error)=>{
          console.log('Error adding the movie to watch list',error.response.data);
          alert(error.response.message)
        })
      }
  }

  return (
    <div className="container bg-dark" style={{ marginTop: "56px" }}>
      {movie.title?(
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-4 my-4">
          <img src={movie.poster} style={{ width: "100%" }} alt="img" />
          <div className="container">
            <button className="btn btn-outline-light mt-2" type="button" onClick={()=>handleWatchList()}>Watchlist <BsFillBookmarkCheckFill/></button>
          </div>
        </div>
        <div className="col-lg-8 col-md-8 col-sm-8">
          <div
            style={{
              color: "white ",
            }}
          >
            <h3 className="text-center"><strong>{movie.title}</strong>{" ("+movie.year+")"}</h3>
            <p><b>IMDB : </b>{movie.imdb.rating+"/10 " +"  ("+ movie.imdb.votes+" votes)"}</p>
            <p><b>Genre : </b>{movie.genres.toString()}</p>
            <p><b>Runtime : </b>{movie.runtime+"m"}</p>
            <p><b>Cast : </b>{movie.cast.toString()}</p>
            <p><b>plot : </b>{movie.plot}</p>
            <p><b>Director : </b>{movie.directors}</p>
            <p><b>Writers : </b>{movie.writers.toString()}</p>
            <p><b>Synopsis : </b>{movie.fullplot}</p>

          </div>
        </div>
      </div>
      ):<p>Loading...</p>}
    </div>
  );
};

export default Movie;

{/* <div style={{ color: "white" }}>
  {Object.keys(movie).map((key) => (
    <h6 key={key}>
      {key}: {JSON.stringify(movie[key])}
    </h6>
  ))}
</div> */}