import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./pages/LoginPage";

import CheckLostItem from "./pages/CheckLostItem";

import AddFoundItem from "./pages/AddFoundItem";


function App() {

  return (

    <BrowserRouter>

      <ToastContainer />

      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/check"
          element={<CheckLostItem />}
        />

        <Route
          path="/add"
          element={<AddFoundItem />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;