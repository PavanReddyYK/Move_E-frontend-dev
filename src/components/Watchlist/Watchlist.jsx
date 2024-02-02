import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Watchlist = () => {
  let [watchListedMovies, setWatchListedMovies] = useState([]);
  const movieList = useSelector((state) => state.movieApp.movies);
  const watchList = useSelector((state) => state.movieApp.watchList);
  const value = 12;

  const filterMovies = () => {
    if (watchList) {
      const watchListedMovi = movieList.filter((movie) =>
        watchList.includes(movie._id)
      );
      setWatchListedMovies(watchListedMovi);
      console.log("-watchListedMovies------", watchListedMovies);
      console.log("---------------watchList", watchList);
    }
  };

  useEffect(() => {
    filterMovies();
  }, [watchList, movieList]);

  const handleDownload = async () => {
    console.log("download called");
    await axios
      .post(
        `${process.env.REACT_APP_DEV_BASE_URL}/pdf/generateWatchListPdf`,
        {},
        {
          headers: { Authorization: sessionStorage.getItem("token") },
        }
      )
      .then((response) => {
        // Check if the response is successful (status code 200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the response as a blob (binary data)
        return response.blob();
      })
      .then((blob) => {
        // Create a download link for the blob
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "example.pdf";
        document.body.appendChild(a);
        a.click();
        // Remove the temporary link
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.log("error downloading watchlist", error);
      });
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center min-vh-100"
      style={{ marginTop: "56px" }}
    >
      {/* <h1 className="">download</h1>
      <div className="mb-3 d-grid gap-2">
        <button
          type="button"
          onClick={() => handleDownload()}
          className="btn btn-outline-light"
        >
          download
        </button>
      </div> */}
      {watchListedMovies.length !== 0 ? (
        <ul>
          {watchListedMovies.map((movie) => (
            <li key={movie._id} className="m-3">
              <div className="card text-white">
                <div className="card-header">
                  <h4>{`${movie.title} (${movie.year})`}</h4>
                </div>
                <div className="card-body">
                  <Row>
                    <Col lg={3}>
                      {/* <div className="col-lg-3 col-md-4 col-sm-6 my-3"> */}
                      <div>
                        <img className="card-img-top" src={movie.poster} />
                      </div>
                    </Col>
                    <Col lg={9}>
                      <div>
                        <table className="table table-borderless text-white">
                          <tbody>
                            {/* <tr>
                              <td>
                                <b>year :</b>
                              </td>
                              <td>{`${movie.year}`}</td>
                            </tr> */}
                            <tr>
                              <td>
                                <b>IMDB :</b>
                              </td>
                              <td>
                                <p className="card-text mb-0">
                                  <CircularProgressbar
                                    value={movie.imdb.rating}
                                    maxValue={10}
                                    strokeWidth={12}
                                    text={`${movie.imdb.rating}`}
                                    styles={{
                                      root: { width: "50px" },
                                      path: { stroke: "orange" }, // Customize the color of the progress bar
                                      text: { fontSize: "33px", fill: "white" }, // Customize the size and color of the text
                                    }}
                                  />
                                  <p className="text-muted d-inline ms-3">{`(${movie.imdb.votes} votes)`}</p>
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <b>genres :</b>
                              </td>
                              <td>{`${movie.genres}`}</td>
                            </tr>
                            <tr>
                              <td>
                                <b>languages:</b>
                              </td>
                              <td>{`${movie.languages}`}</td>
                            </tr>
                            <tr>
                              <td>
                                <b>directors :</b>
                              </td>
                              <td>{`${movie.directors}`}</td>
                            </tr>
                            <tr>
                              <td>
                                <b>cast :</b>
                              </td>
                              <td>{`${movie.cast}`}</td>
                            </tr>
                            <tr>
                              <td>
                                <b>plot :</b>
                              </td>
                              <td>{`${movie.plot}`}</td>
                            </tr>
                            <tr>
                              <td>
                                <b>runtime :</b>
                              </td>
                              <td>{`${movie.runtime} min`}</td>
                            </tr>
                          </tbody>
                        </table>
                        {/* <Row>
                        <Col lg={2}>
                        <b className="d-block">IMDB : 
                        </b>
                        <b className="d-block">year : </b>
                        <b className="d-block">genres : </b>
                        <b className="d-block">genres : </b>
                        <b className="d-block">directors : </b>
                        <b className="d-block">plot : </b>
                        <b className="d-block">languages : </b>
                        <b className="d-block">cast : </b>
                        <b className="d-block">runtime : </b>
                        </Col>
                        <Col lg={10}>
                        <p className="text-muted d-inline ms-3">{`(${movie.imdb.votes} votes)`}</p>
                      <p className="card-text"><b>year : </b>{`${movie.year}`}</p>
                      <p className="card-text"><b>genres : </b>{`${movie.genres}`}</p>
                      <p className="card-text"><b>directors : </b>{`${movie.directors}`}</p>
                      <p className="card-text"><b>plot : </b>{`${movie.plot}`}</p>
                      <p className="card-text"><b>languages : </b>{`${movie.languages}`}</p>
                      <p className="card-text"><b>cast : </b>{`${movie.cast}`}</p>
                      <p className="card-text"><b>runtime : </b>{`${movie.runtime} min`}</p>
                        </Col>
                      </Row> */}
                        {/* <p className="card-text m-0"><b className="me-3">IMDB : 
                          </b><CircularProgressbar 
                              value={movie.imdb.rating}  
                              maxValue={10} 
                              strokeWidth={12}
                              text={`${movie.imdb.rating}`}
                              styles={{
                                root: { width: '50px' },
                                path: { stroke: 'orange' }, // Customize the color of the progress bar
                                text: { fontSize: '33px', fill: 'white' }, // Customize the size and color of the text                      
                              }}
                            />
                      <p className="text-muted d-inline ms-3">{`(${movie.imdb.votes} votes)`}</p></p>
                      <p className="card-text"><b>year : </b>{`${movie.year}`}</p>
                      <p className="card-text"><b>genres : </b>{`${movie.genres}`}</p>
                      <p className="card-text"><b>directors : </b>{`${movie.directors}`}</p>
                      <p className="card-text"><b>plot : </b>{`${movie.plot}`}</p>
                      <p className="card-text"><b>languages : </b>{`${movie.languages}`}</p>
                      <p className="card-text"><b>cast : </b>{`${movie.cast}`}</p>
                      <p className="card-text"><b>runtime : </b>{`${movie.runtime} min`}</p>
                      <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <>No movies to watch</>
      )}
    </div>
  );
};

export default Watchlist;
