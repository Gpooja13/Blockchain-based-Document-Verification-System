import React, { useState, useEffect } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
// import Web3 from "web3";

export default function IssueDoc({ togglePage, currentPage }) {
  return (
    <div class="mx-auto mt-10 bg-white p-10 rounded-3xl drop-shadow-lg  ">
      <div className="flex justify-center">
        <h2 className="font-semibold text-2xl">Document Issued </h2>
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
      <div className="w-[50vw]">
        {/* <div className="mt-5 h-[40vh] overflow-y-auto thin-scrollbar">
          <ul>
            {logs.map((log, index) => (
              <>
                <li key={index} className="border-b pt-2 pb-5 mb-2">
                  <p>
                    <strong>Address: </strong>
                    {log.returnValues.exporterAddress}
                  </p>
                  <p>
                    <strong>Info: </strong> {log.returnValues.info}
                  </p>
                  <div className="flex justify-between">
                    <p>
                      <strong>Registraton Date: </strong>
                      {new Date(
                        Number(log.returnValues.minetime) * 1000
                      ).toLocaleDateString()}
                    </p>
                    <button onClick={() => setShowModal(true)}>
                      <MdDeleteOutline
                        fontSize={"28px"}
                        className="text-gray-300 hover:text-red-600 mr-5"
                      />
                    </button>
                  </div>
                </li>
                <li key={index} className="border-b pt-2 pb-5 mb-2">
                  <p>
                    <strong>Address: </strong>
                    {log.returnValues.exporterAddress}
                  </p>
                  <p>
                    <strong>Info: </strong> {log.returnValues.info}
                  </p>
                  <div className="flex justify-between">
                    <p>
                      <strong>Registraton Date: </strong>
                      {new Date(
                        Number(log.returnValues.minetime) * 1000
                      ).toLocaleDateString()}
                    </p>
                    <button onClick={() => setShowModal(true)}>
                      <MdDeleteOutline
                        fontSize={"28px"}
                        className="text-gray-300 hover:text-red-600 mr-5"
                      />
                    </button>
                  </div>
                </li>
                <li key={index} className="border-b pt-2 pb-5 mb-2">
                  <p>
                    <strong>Address: </strong>
                    {log.returnValues.exporterAddress}
                  </p>
                  <p>
                    <strong>Info: </strong> {log.returnValues.info}
                  </p>
                  <div className="flex justify-between">
                    <p>
                      <strong>Registraton Date: </strong>
                      {new Date(
                        Number(log.returnValues.minetime) * 1000
                      ).toLocaleDateString()}
                    </p>
                    <button onClick={() => setShowModal(true)}>
                      <MdDeleteOutline
                        fontSize={"28px"}
                        className="text-gray-300 hover:text-red-600 mr-5"
                      />
                    </button>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
}
