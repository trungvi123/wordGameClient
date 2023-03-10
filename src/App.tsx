import React from "react";
import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ToastComp from "./components/Toast";
import { useSelector } from "react-redux";
import { IRootState } from "./components/interface";

function App() {
  const isAdmin = useSelector((e:IRootState)=>e.auth.isAdmin)

  return (
    <div
      className="App position-relative" // for toast comp
      aria-live="polite" // for toast comp
      aria-atomic="true" // for toast comp
    >
      <ToastComp></ToastComp>
      <Routes>
        {publicRoutes.map((e) => {
          return (
            <Route
              key={e.path}
              element={<e.element></e.element>}
              path={e.path}
            ></Route>
          );
        })}
        {isAdmin &&
          privateRoutes.map((e) => {
            return (
              <Route
                key={e.path}
                element={<e.element></e.element>}
                path={e.path}
              ></Route>
            );
          })}
      </Routes>
    </div>
  );
}

export default App;
