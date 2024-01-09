import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdBookmarkRemove } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { pushToWatchList } from "../store/slice";

const Movie = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  let [movie, setMovie] = useState({title:false});
  const user = useSelector(state=>state.movieApp.user)
  const watchList = useSelector(state => state.movieApp.watchList)

const sweetAlertHandler = (msg,iconStatus)=>{    
  const mySwal = withReactContent(Swal)
  mySwal.fire({
    title: msg,
    icon: iconStatus,
  });
}

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DEV_BASE_URL}/movie/fetchMovieById/${id}`)
      .then((response) => {
        setMovie(response.data.movieData);
      })
      .catch((error) => {
        console.log("Error fetching movie object", error.response);
      });
  }, [id]);

  const handleWatchList=()=>{
    if(!user.name){
      sweetAlertHandler("SignIn to watchList movies",'warning')
      return;
      }
      else if(watchList.includes(id)){
        sweetAlertHandler('Already in watchList','info')
      }
      else{
        axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/movie/addMovieToWatchlist`,
        {movieId:id},
        {
          headers:{Authorization: sessionStorage.getItem('token')}
        })
        .then((response)=>{
          sweetAlertHandler(response.data.message,'success')
          dispatch(pushToWatchList(id))
        })
        .catch((error)=>{
          console.log('Error adding the movie to watch list',error.response.data);
          alert(error.response.message)
        })
      }
  }

  useEffect(()=>{
  },[watchList])

  const handleRemove =()=> {
    console.log("remove called")
  }

  return (
    <div className="container bg-dark" style={{ marginTop: "56px" }}>
      {movie.title?(
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-4 my-4">
          <img src={movie.poster} style={{ width: "100%" }} alt="img" />
          <div className="container">
            {
              watchList.includes(id)?
              <button className="btn btn-outline-light mt-2" type="button" onClick={()=>handleRemove()}>
                Remove <MdBookmarkRemove/></button>
              :<button className="btn btn-outline-light mt-2" type="button" onClick={()=>{handleWatchList()}}>
                Watchlist <BsFillBookmarkCheckFill/></button>
            }
          </div>
        </div>
        <div className="col-lg-8 col-md-8 col-sm-8">
          <div
            style={{
              color: "white ",
            }}
          >
            <h3 className="text-center"><strong>{`${movie.title} (${movie.year})`}</strong></h3>
            <p><b>IMDB : </b>{`${movie.imdb.rating}/10  (${movie.imdb.votes} votes)`}</p>
            <p><b>Genre : </b>{movie.genres.toString()}</p>
            <p><b>Runtime : </b>{`${movie.runtime}m`}</p>
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