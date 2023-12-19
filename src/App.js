import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "./components/auth/Register";
import Dash from "./components/Dash";
import SignIn from "./components/auth/SignIn";
import ForgotPassword from "./components/auth/ForgotPassword";
import VerifyOtp from "./components/auth/VerifyOtp";
import {useSelector} from "react-redux";
import Nav from './components/Nav';
import Contact from './components/Contact';
import About from './components/About';
import './App.css'
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";
// import Watchlist from './components/Watchlist';

function App() {
  const user = useSelector((state)=>state.movieApp.user)
  console.log("user from app: ", user.email?user.email:"not found")
  return (
    <div className="bodyContainer">
      <BrowserRouter>
          <Nav/>
          <Routes>
            {user.email?
              <Route path="/:token" element={<Dash/>}/>:
              <Route path="/" element={<Dash/>}/>
              }
              <Route path="/movie/:id" element={<Movie />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth/signIn" element={<SignIn />} />
              <Route path="/auth/signIn/forgotPassword" element={<ForgotPassword/>}/>
              <Route path="/auth/signIn/verifyOtp/:email" element={<VerifyOtp/>}/>
              <Route path="/auth/signUp" element={<Register />} />
              <Route path="*" element={<NotFound/>}/>
              {/* <Route path="/watchlist/download" element={<Watchlist/>} /> */}
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
