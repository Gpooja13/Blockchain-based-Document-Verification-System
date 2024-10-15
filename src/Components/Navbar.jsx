import React, { useState } from "react";

export default function Navbar() {
  const [connected, setConnected] = useState(false);

  const connect = async () => {
    if (window.ethereum) {
      try {
        const selectedAccount = await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            return accounts[0];
          })
          .catch(() => {
            throw new Error("No account selected 👍");
          });

        window.userAddress = selectedAccount;
        console.log("Connected account:", selectedAccount);
        window.localStorage.setItem("userAddress", selectedAccount); // Save the user address
        setConnected(true);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("No Ethereum wallet detected. Please install MetaMask.");
      // Optional: disable buttons or show warnings here if needed
    }
  };

  const disconnect = () => {
    window.userAddress = null; // Clear the user address
    window.localStorage.removeItem("userAddress"); // Remove it from local storage
    setConnected(false);
  };

  return (
    <div className="h-[10vh] flex items-center justify-between bg-gray-100 px-5">
      <div className="flex items-center">
        <img src="/logo.webp" alt="" width={"50px"} />
        <p className="text-2xl">
          <strong>DocCheck</strong>
        </p>
      </div>

      <button
        type="button"
        onClick={connect}
        className={`${
          connected ? "hidden" : ""
        } rounded-lg border border-red-500 bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200`}
      >
        Login
      </button>
      <button
        type="button"
        onClick={disconnect}
        className={`${
          !connected ? "hidden" : ""
        } rounded-lg border border-red-500 bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200`}
      >
        Logout
      </button>
    </div>
  );
}
