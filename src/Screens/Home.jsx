import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-w-0 flex-1 overflow-auto bg-blue-50 p-4"><Outlet/></main>
  );
};

export default Home;
