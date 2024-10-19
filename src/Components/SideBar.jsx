import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GrConnect } from "react-icons/gr";

export default function SideBar({ userAddress, chain, userBalance }) {
  const menuItems = [
    { icon: "", title: "Home", link: "/" },
    { icon: "", title: "Verify", link: "/verify" },
    { icon: "", title: "View", link: "/view" },
    { icon: "", title: "Validate", link: "/upload" },
    { icon: "", title: "Institute", link: "/admin" },
    { icon: "", title: "About", link: "/about" },
    { icon: "", title: "Contact", link: "/contact" },
  ];
  const [selected, setSelected] = useState(menuItems[0]);
  const location = useLocation();

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.substr(0, 7)}...${address.substr(address.length - 8)}`;
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const activeMenuItem = menuItems.find((item) => item.link === currentPath);
    if (activeMenuItem) {
      setSelected(activeMenuItem);
    }
  }, [location.pathname]);

  return (
    <div className="z-50">
      <aside className="w-72 flex-none bg-blue-200 p-2">
        <div className="flex flex-wrap items-center justify-center gap-3 h-[15vh] border-b-2 border-white">
          <div className="h-14 w-14 border-white border-2  rounded-full flex items-center justify-center">
            <GrConnect className="h-[70%] w-[70%] object-center" />
          </div>
          <div>
            <div className="text-sm font-medium text-secondary-500">
              Address: {truncateAddress(userAddress)}
            </div>
            <div className="text-xs text-secondary-400">Network: {chain}</div>
            <div className="text-xs text-secondary-400">
              Balance: {userBalance}
            </div>
          </div>
        </div>
        <div>
          <ul>
            {menuItems.map((item, index) => {
              return (
                <Link key={index} to={item.link}>
                  <li
                    onClick={() => setSelected(menuItems[index])}
                    className={`h-[10vh] flex items-center justify-start text-lg hover:bg-slate-300 ${
                      selected.title === item.title
                        ? "border-r-green-500 border-4"
                        : ""
                    }`}
                  >
                    <p className="m-5">{item.title}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}
