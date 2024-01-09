import React from "react";
import { NavLink } from "react-router-dom";
import RotateLoader from "react-spinners/RotateLoader";
import RiseLoader from "react-spinners/RiseLoader";
import RingLoader from "react-spinners/RingLoader";
import BounceLoader from "react-spinners/BounceLoader";
import ClockLoader from "react-spinners/ClockLoader";
import MoonLoader from "react-spinners/MoonLoader";

const Card = (params) => {
  let { movies, searchValue } = params;

  return (
    <div className="container">
      <div className="row">
        {movies.length ? (
          movies.map((movie) => {
            let { _id, title, poster } = movie;
            title = title.length > 12 ? `${title.substring(0, 12)}...` : title;
            return (
              <div className="col-lg-3 col-md-4 col-sm-6 my-3" key={_id}>
                <NavLink to={`/movie/${_id}`} className="hovered-link">
                  <div className="card">
                    <div className="card-info text-center">
                      <h4 className="text-decoration-none">{title}</h4>
                      <img
                        className="p-1"
                        src={poster}
                        alt={_id}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })
        ) : searchValue.length >= 2 ? (
          <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="p-4" style={{ backgroundColor: "#bccaf1b8" }}>
              <div>
                <div className="typing-demo">No Result Found!!</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-center vh-100">
            <RiseLoader
              color={"#f2eaeadb"}
              // loading={loading}
              // cssOverride={override}
              size={100}
              // aria-label="Loading Spinner"
              // data-testid="loader"
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Card;
