import React from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
// import { FaClapperboard,FaCentos } from "react-icons/fa6";
import { CgPlayButtonR } from "react-icons/cg";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";

const Nav = () => {
  const navigate = useNavigate()
  const user = useSelector((state)=>state.movieApp.user)
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary" style={{position:'absolute',backgroundColor:"#0a1f64d9"}}>
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand text-light" aria-current="page">
            Move-E <CgPlayButtonR/>
            </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-light" aria-current="page">
                  Home
                  </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link text-light" aria-current="page">
                  Contact
                  </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link text-light" aria-current="page">
                  About
                  </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-1"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-light me-5" type="submit">
                <FaSearch />
              </button>
            </form>
            <div>
              {user.name?<div><FaUser/></div>:
              <button className="btn btn-outline-light" onClick={()=>navigate('/auth/signIn')}>
                SignIn
                </button>}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
