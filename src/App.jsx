import React, { useEffect, useState, } from "react";
import Home from "../src/Pages/Home";
import Signup from "../src/Pages/Signup";
import Login from "../src/Pages/Login";
import Create from "../src/Pages/Create";
import View from "../src/Pages/ViewPost";
import { Routes, Route, useNavigate,useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
import { Postcontextprovider } from "./context/postContext";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged In");
        if (location.pathname === '/login' || location.pathname === '/signup') {
          navigate("/");
        }
      } else {
        console.log("Logged Out");
        if (location.pathname !== '/login' && location.pathname !== '/signup') {
          navigate("/login");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);


  return (
    <div>
      {/* <ToastContainer theme="dark" /> */}
      <Postcontextprovider>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view/:id" element={<View />} />
      </Routes>
      </Postcontextprovider>
    </div>
  );
};

export default App;
