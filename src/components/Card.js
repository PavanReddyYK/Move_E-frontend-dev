import React from "react";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

const Card = () => {
  const movies = useSelector(state=>state.movieApp.movies)

  return (
    <div className="movie page">
      <div className="grid grid-4-col">
        {movies.map((movie) => {
          const {_id, title, poster} = movie
          console.log("iddd: "+ _id,"titleeee: "+ title)
          return (
            <NavLink to ={`/movie/${_id}`} key={_id}>
              <div className="d-flex flex-wrap">
              <div className="card">
                <div className="card-info">
                  <h4>{title}</h4> 
                  <img src={poster} alt={_id} style={{width:"200px"}}/>
                </div>
              </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>

    // <div>
    //   <div className="container mt-3">
    //     <h2>Card Ima</h2>
    //     <p>Image at th (card-img-top):</p>
    //     <div className="card">
    //       <img
    //         className="card-img-top"
    //         src="../images/benz.jfif"
    //         alt="Card image"

    //       />
    //       <div className="card-body">
    //         <h4 className="card-title">John Doe</h4>
    //         <p className="card-text">
    //           Some example text some example text. John Doe is an architect and
    //           engineer
    //         </p>
    //         <a href="#" className="btn btn-primary">
    //           See Profile
    //         </a>
    //       </div>
    //     </div>
    //     <br />
    //   </div>
    //   <div className="card w-50">
    //     <div className="card-body">
    //       <h5 className="card-title">Card title</h5>
    //       <p className="card-text">
    //         With supporting text below as a natural lead-in to additional
    //         content.
    //       </p>
    //       <a href="#" className="btn btn-primary">
    //         Button
    //       </a>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Card;
