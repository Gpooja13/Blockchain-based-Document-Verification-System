import React, { useState } from "react";
import Heading from "../Components/Heading";
import { FaExternalLinkAlt, FaDownload } from "react-icons/fa";
import { useGlobalContext } from "../context/context";

export default function View() {
  const [rollno, setRollno] = useState("");
  const [docInfo, setDocInfo] = useState("");
  const {
    message,
    setMessage,
    contract,
    viewDocumentInNewTab,
    downloadDocument,
    email
  } = useGlobalContext();

  const findDocument = async () => {
    try {
      if (!email && !rollno) {
        setMessage("Enter all credentials!");
        return;
      }
      const trimmedEmail = email.trim();
      const trimmedRollno = rollno.trim();

      const response = await contract.methods
        .findDocByEmailAndRollno(trimmedEmail, trimmedRollno)
        .call();

      setDocInfo(response[1]);

      console.log(response[1]);
    } catch (error) {
      console.error("Error fetching document:", error);
      setMessage("Document not found.");
    }
  };

  return (
    <div >
      <Heading title={"View"} />
      <div className="flex justify-center items-center px-10 h-[90vh]">
        <div className=" w-[50%] h-[68vh] bg-white p-10 mr-4 rounded-3xl drop-shadow-lg">
          <div className="flex justify-center">
            <h2 className="font-semibold text-2xl">Find Document</h2>
          </div>
          <hr class="my-5 h-px border-0 bg-gray-300" />

          <form action="" className="space-y-5">
            <div>
              <label
                htmlFor="address"
                className="mb-1 block font-medium text-gray-700"
              >
                Roll no
              </label>
              <input
                type="text"
                id="address"
                onChange={(e) => setRollno(e.target.value)}
                className="block w-full h-[8vh] px-4 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="123..abc"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="mb-1 block font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="address"
                value={email}
                // onChange={(e) => setEmail(e.target.value)}
                className="block w-full h-[8vh] px-4 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="abc@gmail.com"
              />
            </div>

            <div className="text-center h-4 mt-4 flex justify-center items-center ">
              {message && <p className="text-sm">{message}</p>}
            </div>
            <div className="flex flex-wrap items-center justify-center mt-10 gap-5">
              <button
                type="button"
                onClick={findDocument}
                class="inline-flex items-center gap-1.5 rounded-lg border border-green-500 bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-green-700 hover:bg-green-700 focus:ring focus:ring-green-200 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 w-[30%] justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-4 w-4"
                >
                  <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
                Search
              </button>
            </div>
          </form>
        </div>
        <div className=" w-[50%] h-[67vh] bg-white py-10 ml-4 pl-10 pr-8 rounded-3xl drop-shadow-lg">
          <div className="flex justify-center">
            <h2 className="font-semibold text-2xl">View Result</h2>
          </div>

          <hr class="my-5 h-px border-0 bg-gray-300" />

          <div className="mt-6 h-[40vh] overflow-y-auto thin-scrollbar">
            {docInfo ? (
              <ul>
                <li className="border-b pb-5 mb-2 space-y-2">
                  <h3 className="text-center mb-3 text-lg">
                    <strong>{docInfo.info}</strong>
                  </h3>
                  <p>
                    <strong>Description: </strong> {docInfo.description}
                  </p>
                  <p>
                    <strong>Name: </strong>
                    {docInfo.name}
                  </p>
                  <p>
                    <strong>Roll no: </strong>
                    {docInfo.rollno}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    {docInfo.email}
                  </p>

                  <div className="flex justify-between">
                    <p>
                      <strong>Issue Date: </strong>
                      {new Date(
                        Number(docInfo.minetime) * 1000
                      ).toLocaleDateString()}
                    </p>
                    <div className="flex justify-between items-center">
                      <button className="text-gray-400 hover:text-blue-600 mr-5">
                        <FaExternalLinkAlt
                          fontSize={"20px"}
                          onClick={() =>
                            viewDocumentInNewTab(docInfo.ipfs_hash)
                          }
                        />
                      </button>
                      <button className="text-gray-400 hover:text-green-600 mr-5">
                        <FaDownload
                          fontSize={"20px"}
                          onClick={() => downloadDocument(docInfo.ipfs_hash)}
                        />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            ) : (
              <p className="w-full flex justify-center h-1/2 items-center">
                No Records
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
