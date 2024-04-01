 import './App.css' 
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Variant from './pages/Variant' 

function App() { 

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Variant />}></Route> 
      </Routes>
    </>
  );
}

export default App
