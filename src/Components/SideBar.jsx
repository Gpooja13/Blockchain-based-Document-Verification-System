import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import { FaUniversity } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { RiInformation2Fill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { BiSolidFileFind } from "react-icons/bi";
import { FaFileSignature } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

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
  const { userAddress, chain } = useGlobalContext();
  const location = useLocation();

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.substr(0, 5)}....${address.substr(address.length - 6)}`;
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const activeMenuItem = menuItems.find((item) => item.link === currentPath);
    if (activeMenuItem) {
      setSelected(activeMenuItem);
    }
  }, [location.pathname]);

  return (
    <div className="z-10 drop-shadow-sm bg-indigo-100 h-[100vh]">
      <aside className="w-72 flex-none p-2 h-full ">
        <div className="flex flex-wrap items-end justify-center w-full h-[25vh]">
          <div className="flex items-center justify-center">
            <img src="/logo.webp" alt="logo" width={"50px"} />
            <p className="text-2xl">
              <strong>DocCheck</strong>
            </p>
          </div>

          <div className="flex p-1 w-full mx-3 ">
            <div className=" flex flex-col hover:font-bold cursor-pointer ">
              <div className="text-sm font-medium text-secondary-500 flex gap-2 items-center">
                <span><FaLocationDot/></span>Address: {truncateAddress(userAddress)}
              </div>
              {/* <div className="text-xs text-secondary-400">Network: {chain}</div> */}
              
            </div>
          </div>
        </div>
        <hr class="my-2 h-px border-0 bg-indigo-500" />
        <div>
          <ul>
            {menuItems.map((item, index) => {
              return (
                <Link key={index} to={item.link}>
                  <li
                    onClick={() => setSelected(menuItems[index])}
                    className={`h-[10vh] flex items-center justify-start text-lg drop-shadow-lg hover:bg-indigo-200 ${
                      selected.title === item.title
                        ? "border-r-green-500 border-2 font-semibold border-y-indigo-200 border-l-indigo-200 bg-indigo-200 border-r-4"
                        : ""
                    }`}
                  >
                    <span className="ml-4 text-2xl text-indigo-500 ">
                      {item.icon}
                    </span>
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
