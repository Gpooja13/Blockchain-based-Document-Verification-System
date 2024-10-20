import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import IssueDoc from "../Components/IssueDoc";
import ViewIssued from "../Components/ViewIssued";
import Heading from "../Components/Heading";

export default function Upload({
  get_ChainID,
  userAddress,
  contract,
  fileHash,
  message,
  setMessage,
  isFileHashed,
  file,
  loading,
  setLoading,
  handleFileChange,
}) {
  const [currentPage, setCurrentPage] = useState(0); // Toggle between two pages
  const [direction, setDirection] = useState("right"); // Slide direction
  const wrapper = useRef(null);
  const [wrapperWidth, setWrapperWidth] = useState(0);

  // Toggle between pages and set slide direction
  const togglePage = () => {
    setDirection(currentPage === 0 ? "right" : "left");
    setCurrentPage((prev) => (prev === 0 ? 1 : 0));
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

  return (
    <div className=" bg-gray-200 ">
      <Heading title={"Upload"} />
      <div className="flex justify-center items-center" ref={wrapper}>
        <div className="w-full">
          <Transition
            show={currentPage === 0}
            enter="transform transition ease-in-out duration-500"
            enterFrom={`-translate-x-full opacity-0`}
            enterTo="translate-x-0 opacity-100"
            leave="transform transition ease-in-out duration-500"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="-translate-x-full opacity-0"
          >
            <div
              className="flex items-center justify-center "
              style={{ width: `${wrapperWidth}px` }}
            >
              <IssueDoc
                get_ChainID={get_ChainID}
                contract={contract}
                userAddress={userAddress}
                handleFileChange={handleFileChange}
                fileHash={fileHash}
                message={message}
                setMessage={setMessage}
                isFileHashed={isFileHashed}
                file={file}
                loading={loading}
                setLoading={setLoading}
                togglePage={togglePage}
                currentPage={currentPage}
              />
            </div>
          </Transition>
          {/* Page 1 */}
          <Transition
            show={currentPage === 1}
            enter="transform transition ease-in-out duration-500"
            enterFrom={`translate-x-full opacity-0`}
            enterTo="translate-x-0 opacity-100"
            leave="transform transition ease-in-out duration-500"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
          >
            <div
              className="flex items-center justify-center h-full"
              style={{ width: `${wrapperWidth}px` }}
            >
              <ViewIssued togglePage={togglePage} currentPage={currentPage} contract={contract} userAddress={userAddress}/>
            </div>
          </Transition>

          {/* Page 2 */}
        </div>
      </div>
    </div>
  );
}
