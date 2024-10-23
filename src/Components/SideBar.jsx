import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GrConnect } from "react-icons/gr";
import { useGlobalContext } from "../context/context";
import { FaUniversity } from "react-icons/fa";
import { MdFileUpload, MdVerified } from "react-icons/md";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { RiInformation2Fill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { BiSolidFileFind } from "react-icons/bi";
import { MdFindInPage } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { FaFileSignature } from "react-icons/fa6";

export default function SideBar() {
  const menuItems = [
    { icon: <GoHomeFill />, title: "Home", link: "/" },
    { icon: <MdVerified />, title: "Verify", link: "/verify" },
    {
      icon: <BiSolidFileFind fontSize={"1.7rem"} />,
      title: "View",
      link: "/view",
    },
    { icon: <FaFileSignature />, title: "Validate", link: "/upload" },
    { icon: <FaUniversity />, title: "Institute", link: "/admin" },
    { icon: <RiInformation2Fill />, title: "About", link: "/about" },
    { icon: <TbMessageChatbotFilled />, title: "Contact", link: "/contact" },
  ];
  const [selected, setSelected] = useState(menuItems[0]);
  const { userAddress, chain, userBalance } = useGlobalContext();
  const location = useLocation();

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.substr(0, 5)}...${address.substr(address.length - 5)}`;
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
      <aside className="w-72 flex-none bg-indigo-100 p-2 h-full">
        <div className="flex flex-wrap items-center justify-center w-full h-[15vh] border-b-2 border-white ">
          <div className=" border-white border-2 p-3 m-2 rounded-lg flex items-center justify-around w-full bg-indigo-50 ">
            <GrConnect className="h-[20%] w-[20%] object-center" />
            <div className=" pl-3 flex flex-col">
              <div className="text-sm font-medium text-secondary-500">
                Address: {truncateAddress(userAddress)}
              </div>
              <div className="text-xs text-secondary-400">Network: {chain}</div>
              <div className="text-xs text-secondary-400">
                Balance: {userBalance}
              </div>
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
                    className={`h-[10vh] flex items-center justify-start text-lg hover:bg-indigo-200 ${
                      selected.title === item.title
                        ? "border-r-green-500 border-4 border-y-indigo-200 border-l-indigo-200"
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
