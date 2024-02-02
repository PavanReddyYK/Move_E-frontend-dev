import React, { useEffect, useState } from "react";
// import { FaSearch } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { FaClapperboard,FaCentos } from "react-icons/fa6";
import { CgPlayButtonR } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { setSearchValue, setUser, setWatchList } from "../store/slice";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const Nav = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const user = useSelector((state)=>state.movieApp.user)

  const [isDesktop, setIsDesktop] = useState(true);

  const token = user.name?sessionStorage.getItem('token'):"";

  const sweetAlertHandler = (title, iconStatus) =>{
    const mySwal = withReactContent(Swal) 
    mySwal.fire({
      title:title,
      icon:iconStatus,
    })
  }

  const handleLogout = () => {
    axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/user/logoutUser`,{},{
      headers : {Authorization: sessionStorage.getItem('token')}
    })
    .then((res)=>{
      console.log(res.data.message)
      sessionStorage.removeItem('token')
      dispatch(setUser({}))
      dispatch(setWatchList([]))
      sweetAlertHandler()
      sweetAlertHandler("Logged out successfully","success")
      navigate('/')
    })
    .catch((err)=>{
      console.log("Error in Logging out",
                  err.response.statusText,
                  err.response.data);
      sweetAlertHandler("couldn't logout","warning")
    })
  };

  const handleSearch = (e)=>{
    dispatch(setSearchValue(e.target.value))
  }

  useEffect(() => {
    const handleResize = () => {
      // Update the state based on the window width
      setIsDesktop(window.innerWidth >= 768);
    };

    // Attach the event listener for window resize
    window.addEventListener('resize', handleResize);

    // Call the handleResize function initially to set the initial state
    handleResize();

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // The empty dependency array ensures that this effect runs once on component mount


  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary" style={{backgroundColor:"#0a1f64d9"}}>
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand text-white" aria-current="page">
            Move-E <CgPlayButtonR/>
          </NavLink>
          <button
            className="navbar-toggler btn btn-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon bg-light"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {token?
                <NavLink to={`/${token}`} className={`nav-link ${location.pathname === `/${token}` ? "text-secondary" : "text-light"}`} aria-current="page">
                  Home
                </NavLink>:
                <NavLink to="/" className={`nav-link ${location.pathname === "/" ? "text-secondary" : "text-light"}`} aria-current="page">
                  Home
                </NavLink>}
              </li>
              <li className="nav-item">
                <NavLink to="/watchlist" className={`nav-link ${location.pathname === "/watchlist" ? "text-secondary" : "text-light"}`} aria-current="page">
                  Watchlist
                  </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className={`nav-link ${location.pathname === "/contact" ? "text-secondary" : "text-light"}`} aria-current="page">
                  Contact
                  </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className={`nav-link ${location.pathname === "/about" ? "text-secondary" : "text-light"}`} aria-current="page">
                  About
                  </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className={`form-control me-5 ${!isDesktop && 'mb-5'}`}
                type="search"
                placeholder="Search a Movie"
                aria-label="Search"
                disabled = {location.pathname!=='/'}
                onChange={handleSearch}
              />
              {/* <button className="btn btn-outline-light me-5" type="button" onClick={handleSearch}>
                <FaSearch />
              </button> */}
            </form>
          <div>
          {user.name ? (
            <div className="position-relative">
            <button className="btn btn-link user-icon">
              <h5 className="text-light m-0">
                <FaUser />
              </h5>
            </button>
            {user.name && (
              <div className="user-details rounded">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <div className="d-grid">
                <button
                  className="btn btn-outline-dark mx-4"
                  onClick={() => {
                    handleLogout()
                  }}
                >
                  Logout
                </button>
                </div>
              </div>
            )}
            </div>
          ) : 
            (
              location.pathname !== '/auth/signIn' ?
              <button className="btn btn-outline-light" onClick={() => navigate('/auth/signIn')}>
                SignIn
              </button>
              :<button className="btn btn-outline-light" onClick={() => navigate('/auth/signUp')}>
                SignUp
              </button>
            )
        }
        </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
