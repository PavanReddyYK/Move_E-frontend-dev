import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Dash from "./components/Dash";


function App() {
  return <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/dash' element={<Dash/>}/>
    </Routes>
    </BrowserRouter>
  </div>;
}

export default App;
