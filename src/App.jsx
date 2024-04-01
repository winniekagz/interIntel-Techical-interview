 import './App.css' 
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Variant from './pages/Variant'
import ExpandableTable from './pages/ExpandableTable';

function App() { 

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Variant />}></Route>
        <Route exact path="/expandable" element={<ExpandableTable />}></Route>
      </Routes>
    </>
  );
}

export default App
