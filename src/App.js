import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "./components/Register";
import Dash from "./components/Dash";
import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOtp from "./components/VerifyOtp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="" element={<SignIn />} />
            <Route path="/auth/signIn/forgotPassword" element={<ForgotPassword />} />
            <Route path="/auth/signIn/verifyOtp" element={<VerifyOtp/>} />
            <Route path="/auth/signUp" element={<Register />} />
            <Route path="/dash" element={<Dash />} />
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
