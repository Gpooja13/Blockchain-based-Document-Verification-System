import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screens/Home";
import Admin from "./Screens/Admin";
import Upload from "./Screens/Upload";
import Verify from "./Screens/Verify";
import Contact from "./Screens/Contact";
import About from "./Screens/About";
import View from "./Screens/View";
import { useGlobalContext } from "./context/context";
import MainLayout from "./Components/MainLayout";
import SignUp from "./Screens/SignUp";
import SignIn from "./Screens/SignIn";

const App = () => {
  const { initializeWeb3, contract, ownerAddress, setOwnerAddress } =
    useGlobalContext();

  const getOnwerInfo = async () => {
    try {
      if (!contract) {
        throw new Error("Smart contract is not initialized.");
      }

      const ownerInfo = await contract.methods.owner().call();
      setOwnerAddress(ownerInfo.toLowerCase());
    } catch (error) {
      console.error("Error fetching exporter information:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    initializeWeb3();
  }, []);

  useEffect(() => {
    if (contract) {
      getOnwerInfo();
    }
  }, [contract]);

  return (
    <Router>
      <Routes>
        {/* Wrap routes with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/view" element={<View />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
