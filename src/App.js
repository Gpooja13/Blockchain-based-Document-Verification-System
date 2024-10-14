import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Screens/Home";
import SideBar from "./Components/SideBar";
import Navbar from "./Components/Navbar";
import Admin from "./Screens/Admin";
import Upload from "./Screens/Upload";
import { abi, address, explore, network } from "./Constants/constants";
// const Web3 = require('web3');
import Web3 from "web3";

const App = () => {
  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState("");

  // // Setting up contract details
  // window.CONTRACT = {
  //   address: address,
  //   network: network,
  //   explore: explore,
  //   abi: abi, // ABI from your constants
  // };

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

        console.log("Contract Address:", contractAddress); // Log the address for debugging

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

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/admin",
          element: <Admin get_ChainID={get_ChainID} contract={contract} userAddress={userAddress} />,
        },
        {
          path: "/upload",
          element: <Upload />,
        },
        {
          path: "/verify",
          element: <Upload />, // You may want a different component here for verification
        },
      ],
    },
  ]);

  return (
    <div>
      <Navbar />
      <div className="flex h-[100vh]">
        <SideBar />
        <RouterProvider router={appRouter} />
      </div>
    </div>
  );
};

export default App;
