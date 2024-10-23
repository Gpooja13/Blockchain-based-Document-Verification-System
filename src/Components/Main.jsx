import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className="min-w-0 flex-1 overflow-auto bg-blue-50 "><Outlet/></main>
  );
};

export default Main;
