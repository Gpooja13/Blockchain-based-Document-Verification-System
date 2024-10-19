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
  const [fileHash, setFileHash] = useState(null);
  const [message, setMessage] = useState("");
  const [isFileHashed, setIsFileHashed] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userBalance, setUserBalance] = useState(null);
  const [chain, setChain] = useState(null);

  const get_ChainID = async () => {
    if (window.ethereum) {
      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        console.log("Chain ID:", chainId);
        setChain(chainId);
        return chainId;
      } catch (error) {
        console.error("Error getting chain ID:", error);
      }
    } else {
      console.error("Ethereum object does not exist");
    }
  };

  const getSha3 = async (file) => {
    if (!file) {
      setMessage("No file selected");
      return;
    }

    setMessage("Hashing Your Document 😴...");
    const reader = new FileReader();

    reader.readAsText(file, "UTF-8");

    reader.onload = async (evt) => {
      try {
        const web3 = new Web3(Web3.givenProvider);
        const hashedfile = await web3.utils.soliditySha3(evt.target.result);

        setFileHash(hashedfile);
        setIsFileHashed(true);
        setMessage("Document Hashed 😎");
        console.log(`Document Hash: ${hashedfile}`);
      } catch (error) {
        console.error("Error hashing the file", error);
        setMessage("Error hashing the file");
      }
    };

    reader.onerror = () => {
      setMessage("Error reading the file");
      setFileHash(null);
    };
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setMessage("");
    setIsFileHashed(false);
    setFileHash(null);

    if (selectedFile) {
      getSha3(selectedFile);
    }
  };

  const getEthBalance = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider);
      const balance = await web3.eth.getBalance(userAddress);
      const formattedBalance = web3.utils.fromWei(balance).substr(0, 6);
      setUserBalance(formattedBalance);
    } catch (err) {
      console.error("Error fetching balance:", err);
      setUserBalance("n/a");
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
          getEthBalance();
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
        <div className="flex h-[90vh]">
          <SideBar userAddress={userAddress} chain={chain} userBalance={userBalance} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/admin"
              element={
                <Admin
                  get_ChainID={get_ChainID}
                  contract={contract}
                  userAddress={userAddress}
                />
              }
            />
            <Route
              path="/upload"
              element={
                <Upload
                  get_ChainID={get_ChainID}
                  contract={contract}
                  userAddress={userAddress}
                  handleFileChange={handleFileChange}
                  fileHash={fileHash}
                  message={message}
                  setMessage={setMessage}
                  isFileHashed={isFileHashed}
                  file={file}
                  loading={loading}
                  setLoading={setLoading}
                />
              }
            />
            <Route
              path="/verify"
              element={
                <Verify
                  contract={contract}
                  userAddress={userAddress}
                  handleFileChange={handleFileChange}
                  fileHash={fileHash}
                  message={message}
                  setMessage={setMessage}
                  isFileHashed={isFileHashed}
                  file={file}
                  loading={loading}
                  setLoading={setLoading}
                />
              }
            />
            <Route path="/view" element={<View message={message} setMessage={setMessage} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
