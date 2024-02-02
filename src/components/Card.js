import React from "react";
import { NavLink } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";

const Card = (params) => {
  let { movies, searchValue } = params;

  return (
    <div className="container">
      <div className="row">
        {movies.length ? (
          movies.map((movie) => {
            let { _id, title, poster } = movie;
            title = title.length > 21 ? `${title.substring(0, 21)}...` : title;
            return (
              <div className="col-lg-3 col-md-4 col-sm-6 my-3" key={_id}>
                <NavLink to={`/movie/${_id}`} className="hovered-link">
                  <div className="card">
                    <div className="card-info">
                      <div className="text-center">
                        <h4 className="text-decoration-none text-light">{title}</h4>
                      </div>
                      <div>
                        <img
                          className="p-1"
                          src={poster}
                          alt={_id}
                          style={{ width: "100%" }}
                        />
                      </div>
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
            <PacmanLoader
              color={"#f2eaeadb"}
              size={50}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Card;
