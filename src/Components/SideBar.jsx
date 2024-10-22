import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GrConnect } from "react-icons/gr";
import { useGlobalContext } from "../context/context";
import { FaUniversity } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { MdFindInPage } from "react-icons/md";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { MdCloudUpload } from "react-icons/md";
import { RiInformation2Fill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { BiSolidFileFind } from "react-icons/bi";

export default function SideBar() {
  const menuItems = [
    { icon: <GoHomeFill/>, title: "Home", link: "/" },
    { icon: <MdVerified />, title: "Verify", link: "/verify" },
    { icon: <BiSolidFileFind/>, title: "View", link: "/view" },
    { icon: <MdCloudUpload />, title: "Validate", link: "/upload" },
    { icon: <FaUniversity />, title: "Institute", link: "/admin" },
    { icon: <RiInformation2Fill />, title: "About", link: "/about" },
    { icon: <TbMessageChatbotFilled />, title: "Contact", link: "/contact" },
  ];
  const [selected, setSelected] = useState(menuItems[0]);
  const { userAddress, chain, userBalance } = useGlobalContext();
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
    <div className="z-10 drop-shadow-sm">
      <aside className="w-72 flex-none bg-blue-100 p-2 h-full">
        <div className="flex flex-wrap items-center justify-center gap-3 h-[15vh] border-b-2 border-white">
          <div className="h-12 w-12 border-white border-2  rounded-full flex items-center justify-center">
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
                    <span className="ml-4 text-2xl">{item.icon}</span>
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
