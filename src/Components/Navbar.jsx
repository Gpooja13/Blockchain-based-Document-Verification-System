import React, { useState, useEffect } from "react";
import { firebaseAuth } from "../Utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";

export default function Navbar() {
  const navigate = useNavigate();
  const { connected, setConnected, connect } = useGlobalContext();

  const disconnect = () => {
    window.userAddress = null; // Clear the user address
    window.localStorage.removeItem("userAddress"); // Remove it from local storage
    setConnected(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(firebaseAuth); // Sign out the user
      navigate("/signin"); // Redirect after sign out completes
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/signin"); 
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="h-[10vh] flex items-center justify-between bg-indigo-100 border-2 border-b-indigo-200 px-5">
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
        onClick={() => {
          disconnect();
          handleSignOut();
        }}
        className={`${
          !connected ? "hidden" : ""
        } rounded-lg border border-red-500 bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200`}
      >
        Logout
      </button>
    </div>
  );
}
