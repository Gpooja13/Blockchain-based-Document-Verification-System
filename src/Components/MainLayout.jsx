import React from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import Main from "./Main";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex h-[90vh]">
        <SideBar />
        <Main>
          <Outlet /> {/* This renders the children components */}
        </Main>
      </div>
    </div>
  );
};

export default MainLayout;
