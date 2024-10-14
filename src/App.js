import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Update this line
import Home from "./Screens/Home";
import SideBar from "./Components/SideBar";
import Navbar from "./Components/Navbar";
import Admin from "./Screens/Admin";
import Upload from "./Screens/Upload";
import Verify from "./Screens/Verify";
import { abi, address } from "./Constants/constants"; // Network removed for simplicity
import Web3 from "web3";
import Contact from "./Screens/Contact";
import About from "./Screens/About";
import View from "./Screens/View";

const App = () => {
  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState("");

  const get_ChainID = async () => {
    if (window.ethereum) {
      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        console.log("Chain ID:", chainId);
        return chainId;
      } catch (error) {
        console.error("Error getting chain ID:", error);
      }
    } else {
      console.error("Ethereum object does not exist");
    }
  };

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);
        const contractAddress = address; // Use the validated contract address
        const contractABI = abi; // Use the correct ABI

        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const userAddress = accounts[0]; // Get the user's address
          setUserAddress(userAddress); // Store the user's address

          const contractInstance = new web3.eth.Contract(
            contractABI,
            contractAddress
          );
          setContract(contractInstance);
        } catch (error) {
          console.error("Error initializing contract:", error);
        }
      } else {
        console.error("Please install MetaMask!");
      }
    };

    initializeWeb3();
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <div className="flex h-[100vh]">
          <SideBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/admin"
              element={<Admin get_ChainID={get_ChainID} contract={contract} userAddress={userAddress} />}
            />
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
