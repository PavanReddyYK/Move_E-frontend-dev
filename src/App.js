import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Dash from "./components/Dash";
import SignIn from "./components/SignIn";


function App() {
  return <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/signUp' element={<Register/>}/>
      <Route path='/dash' element={<Dash/>}/>
    </Routes>
    </BrowserRouter>
  </div>;
}

export default App;
