import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

const Card = (params) => {
  let movies = params.movies
  // let movies = useSelector((state) => state.movieApp.movies);
  // let searchValue = useSelector((state)=>state.movieApp.searchValue)
  // let filteredMovies = [];
  
  // useEffect(()=>{
  //   console.log("🚀 ~ file: Card.js:9 ~ Card ~ searchValue:", searchValue)
  //   filteredMovies = movies.filter((movie)=>movie.title.substring(0,searchValue.length).toLowerCase()===searchValue.toLowerCase())
  //   console.log(filteredMovies.length)
  //   movies = filteredMovies;
  //   console.log(movies.length)
  // },[searchValue])

  return (
    <div className="movie page container">
      <div className="row">
        {movies.map((movie) => {
        // {movies.filter((movie)=>search===''?movies:movie.title.substring(0,search.length).toLowerCase===search.toLowerCase).map((movie) => {
          let { _id, title, poster } = movie;
          title = title.length > 10 ? title.substring(0, 12) + "..." : title;
          return (
            <div className="col-lg-3 col-md-4 col-sm-6 my-3" key={_id}>
              <NavLink to={`/movie/${_id}`} className="hovered-link">
                <div className="card">
                  <div className="card-info text-center">
                    <h4 className="text-decoration-none">{title}</h4>
                    <img className="p-1" src={poster} alt={_id} style={{ width: "100%" }} />
                  </div>
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
      }
  export default Card;



  // return (
//     <div className="movie page">
//       <div className="grid grid-4-col">
//         {movies.map((movie) => {
//           let {_id, title, poster} = movie
//           title = title.length>10?(title.substring(0,12)+"..."):title
//           console.log("iddd: "+ _id,"titleeee: "+ title)
//           return (
//             <div className="container d-flex">
//             <NavLink to ={`/movie/${_id}`} key={_id}>
//               <div className="d-flex flex-wrap">
//               <div className="card">
//                 <div className="card-info text-center">
//                   <h4 className="text-decoration-none">{title}</h4>
//                   <img src={poster} alt={_id} style={{width:"200px"}}/>
//                 </div>
//               </div>
//               </div>
//             </NavLink>
//             </div>
//           );
//         })}
//       </div>
//     </div>
// );

// -----------------------------------------------------


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








// return (
//   <div className="container">
//     <div className="row">
//       {movies.map((movie) => {
//         let { _id, title, poster } = movie;
//         title = title.length > 10 ? title.substring(0, 12) + '...' : title;
//         console.log('iddd: ' + _id, 'titleeee: ' + title);
//         return (
//           <div className="col-lg-3 col-md-4 col-sm-6" key={_id} style={{height:"300px"}}>
//             <NavLink to={`/movie/${_id}`}>
//               <div className="card">
//                 <div className="card-info text-center">
//                   <h4 className="text-decoration-none">{title}</h4>
//                   <div className="image-container">
//                     <img src={poster} alt={_id} />
//                   </div>
//                 </div>
//               </div>
//             </NavLink>
//           </div>
//         );
//       })}
//     </div>
//   </div>
// );