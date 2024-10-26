import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import IssueDoc from "../Components/IssueDoc";
import ViewIssued from "../Components/ViewIssued";
import Heading from "../Components/Heading";
import { useGlobalContext } from "../context/context";

export default function Upload() {
  const [currentPage, setCurrentPage] = useState(0); // Toggle between two pages
  const [direction, setDirection] = useState("right"); // Slide direction
  const wrapper = useRef(null);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const {   
    userAddress, 
    contract,
    hashcount,
    setHashcount,
    authorityInfo,
    setAuthorityInfo,
  } = useGlobalContext();

  // Toggle between pages and set slide direction
  const togglePage = () => {
    setDirection(currentPage === 0 ? "right" : "left");
    setCurrentPage((prev) => (prev === 0 ? 1 : 0));
  };

  const getAuthorityInfo = async (exporterAddress) => {
    try {
      // Ensure the contract is available
      if (!contract) {
        throw new Error("Smart contract is not initialized.");
      }

      const exporterInfo = await contract.methods
        .getExporterInfo(exporterAddress)
        .call();
      const hashesCount = await contract.methods.count_hashes().call();

      setAuthorityInfo(exporterInfo);
      setHashcount(hashesCount);
    } catch (error) {
      console.error("Error fetching exporter information:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    if (wrapper.current) {
      setWrapperWidth(wrapper.current.offsetWidth);
    }
    const handleResize = () => {
      if (wrapper.current) {
        setWrapperWidth(wrapper.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if(contract)
    getAuthorityInfo(userAddress);
  }, []);

  return (
    <div>
      <Heading title={"Upload"} showBreadcrum={true} />
      <div className="flex justify-center items-center h-[90vh]" ref={wrapper}>
        <div className="relative w-full h-full">
          {" "}
          {/* Ensure the container is full height */}
          <Transition
            show={currentPage === 0}
            enter="transform transition ease-in-out duration-500"
            enterFrom="-translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transform transition ease-in-out duration-500"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="-translate-x-full opacity-0"
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ width: `${wrapperWidth}px` }}
            >
              <IssueDoc togglePage={togglePage} currentPage={currentPage} getAuthorityInfo={getAuthorityInfo}/>
            </div>
          </Transition>
          <Transition
            show={currentPage === 1}
            enter="transform transition ease-in-out duration-500"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transform transition ease-in-out duration-500"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ width: `${wrapperWidth}px` }}
            >
              <ViewIssued togglePage={togglePage} currentPage={currentPage} getAuthorityInfo={getAuthorityInfo}/>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
}
