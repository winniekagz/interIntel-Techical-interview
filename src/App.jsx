 import './App.css' 
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Variant from './pages/Variant' 
import Landing from './pages/Landing';

function App() { 

  return (
    <>
      <Routes>
        <Route exact path="/variant" element={<Variant />}></Route>
        <Route exact path="/" element={<Landing />}></Route>
      </Routes>
    </>
  );
}

export default App
