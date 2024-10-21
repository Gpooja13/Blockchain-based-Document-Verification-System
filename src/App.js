import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Update this line
import Home from "./Screens/Home";
import SideBar from "./Components/SideBar";
import Navbar from "./Components/Navbar";
import Admin from "./Screens/Admin";
import Upload from "./Screens/Upload";
import Verify from "./Screens/Verify";
import Contact from "./Screens/Contact";
import About from "./Screens/About";
import View from "./Screens/View";
import { useGlobalContext } from "./context/context";

const App = () => {
  const { initializeWeb3 } = useGlobalContext();

  useEffect(() => {
    initializeWeb3();
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <div className="flex h-[90vh]">
          <SideBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/view" element={<View />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
