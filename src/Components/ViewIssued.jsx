import React, { useState, useEffect } from "react";
import {
  MdDeleteOutline,
  MdOutlineLocationOn,
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import { useGlobalContext } from "../context/context";
import { FaExternalLinkAlt, FaDownload } from "react-icons/fa";
import Modal from "../Components/Modal";

export default function IssueDoc({
  togglePage,
  currentPage,
  contract,
  userAddress,
}) {
  const {
    issueEvents,
    setIssueEvents,
    showModal,
    setShowModal,
    viewDocumentInNewTab,
    downloadDocument,
  } = useGlobalContext();
  const [authorityInfo, setAuthorityInfo] = useState(null);
  const [hashcount, setHashcount] = useState("");

  const getAuthorityInfo = async (exporterAddress) => {
    try {
      // Ensure the contract is available
      if (!contract) {
        throw new Error("Smart contract is not initialized.");
      }

      // Call the getExporterInfo function from the contract
      const exporterInfo = await contract.methods
        .getExporterInfo(exporterAddress)
        .call();
      const hashesCount = await contract.methods.count_hashes().call();

      setAuthorityInfo(exporterInfo[0]);
      setHashcount(hashesCount);
    } catch (error) {
      // Handle any errors that occur during the contract interaction
      console.error("Error fetching exporter information:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    getAuthorityInfo(userAddress);
  }, []);

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        // deleteFunction={deleteExporter}
        // delAddress={delAddress}
        title={"Record"}
      />
      <div class="mx-auto mt-10 bg-white h-[67vh] p-10 rounded-3xl drop-shadow-lg  ">
        <div className="flex justify-center">
          <h3 className=" font-semibold absolute left-0 top-12 ml-10 flex items-center ">
            <MdOutlineLocationOn className="mr-1" />
            {authorityInfo}
          </h3>
          <h2 className="font-semibold text-2xl">{`Document Issued (${hashcount}) `}</h2>
          <button
            type="button"
            onClick={togglePage}
            class="  flex items-center divide-x rounded-lg border border-gray-300 bg-white text-center text-sm font-medium text-secondary-700 shadow-sm hover:bg-gray-100 absolute right-0 mr-10"
          >
            <div class="flex items-center space-x-2 py-2.5 px-3">
              <span>
                {currentPage === 0 ? (
                  <span>View Issued</span>
                ) : (
                  <span>Add New</span>
                )}
              </span>
            </div>
            <div class="py-2.5 px-3">
              {currentPage === 0 ? (
                <MdOutlineArrowForwardIos />
              ) : (
                <MdOutlineArrowBackIosNew />
              )}
            </div>
          </button>
        </div>
        <hr class="mt-5 h-px border-0 bg-gray-300" />
        <div className="w-[65vw]">
          <div className="mt-5 h-[40vh] overflow-y-auto thin-scrollbar">
            {hashcount.length === 0 ? (
              <p className="w-full flex justify-center h-1/2 items-center">"No Records"</p>
            ) : (
              <ul>
                {issueEvents.map((log, index) => (
                  <>
                    <li key={index} className="border-b pt-2 pb-5 mb-2">
                      <p>
                        <strong>Name: </strong> {log.returnValues.name}
                      </p>
                      <p>
                        <strong>Roll no: </strong> {log.returnValues.rollno}
                      </p>
                      <p>
                        <strong>Email: </strong> {log.returnValues.email}
                      </p>
                      <p>
                        <strong>Description </strong>{" "}
                        {log.returnValues.description}
                      </p>
                      <div className="flex justify-between">
                        <p>
                          <strong>Registraton Date: </strong>
                          {new Date(
                            Number(log.returnValues.minetime) * 1000
                          ).toLocaleDateString()}
                        </p>

                        <div className="flex justify-between items-center">
                          <button
                            className="text-gray-400 hover:text-blue-600 mr-5"
                            onClick={() =>
                              viewDocumentInNewTab(log.returnValues.ipfs_hash)
                            }
                          >
                            <FaExternalLinkAlt fontSize={"20px"} />
                          </button>
                          <button
                            className="text-gray-400 hover:text-green-600 mr-5"
                            onClick={() =>
                              downloadDocument(log.returnValues.ipfs_hash)
                            }
                          >
                            <FaDownload fontSize={"20px"} />
                          </button>
                          <button onClick={() => setShowModal(true)}>
                            <MdDeleteOutline
                              fontSize={"28px"}
                              className="text-gray-400 hover:text-red-600 mr-5"
                            />
                          </button>
                        </div>
                      </div>
                    </li>
                  </>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
