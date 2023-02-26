import React from "react";
import { Routes, Route } from "react-router-dom";
import {publicRoutes} from "./routes"
import "./App.css";


function App() {
  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((e)=>{
          return <Route key={e.path} element={<e.element></e.element>} path={e.path}></Route>
        })}
      </Routes>
    </div>
  );
}

export default App;
