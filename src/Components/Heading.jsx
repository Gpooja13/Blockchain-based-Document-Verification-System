import React, { useEffect } from "react";
import { firebaseAuth } from "../Utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";

export default function Heading({ title, showBreadcrum }) {
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
    <div className="bg-gray-100 h-[10vh] w-[78.9vw] drop-shadow-md flex justify-between items-center">
      <div className="ml-5">
        <nav aria-label="breadcrumb">
          {showBreadcrum && <ol class="inline-flex items-center space-x-4 pt-2 text-sm font-medium">
            <li class="inline-flex items-center">
              <Link
                to={"/"}
                class="text-secondary-500 hover:text-secondary-600 ml-3"
              >
                Home
              </Link>
            </li>
            <li class="inline-flex items-center space-x-4">
              <span class="text-secondary-400">/</span>
              <Link to={""} class="text-secondary-500 hover:text-secondary-600">
                {title}
              </Link>
            </li>
          </ol>}
          <div>
            <h2 className="mx-3 text-xl font-bold">{title}</h2>
          </div>
        </nav>
      </div>
      <div className="mr-6">
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
    </div>
  );
}
