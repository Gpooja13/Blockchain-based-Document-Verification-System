import React, { useState } from "react";
import Heading from "../Components/Heading";
import VerificationGif from "../Components/VerificationGif";
import { FaExternalLinkAlt, FaDownload } from "react-icons/fa";
import { useGlobalContext } from "../context/context";

export default function Verify() {
  const [verificationInfo, setVerificationInfo] = useState(null);
  const [isVerified, setIsVerified] = useState("unKnown");
  const {
    contract,
    userAddress,
    fileHash,
    message,
    setMessage,
    loading,
    setLoading,
    file,
    handleFileChange,
    viewDocumentInNewTab,
    downloadDocument,
  } = useGlobalContext();

  const verifyHash = async () => {
    setLoading(true);

    if (fileHash) {
      try {
        const result = await contract.methods
          .verifyDocHash(fileHash)
          .call({ from: userAddress });
        console.log(result);
        if (result[0] !== 0n && result[0] !== 0n) {
          setVerificationInfo(result);
          setIsVerified(true);
          setMessage("Verified");
        } else {
          setVerificationInfo(result);
          setIsVerified(false);
          setMessage("Not Verified");
        }
      } catch (error) {
        console.error("Error verifying hash: ", error);
        setMessage("Error verifying hash");
      }
    } else {
      setMessage("No hash to verify");
    }

    setLoading(false);
  };

  return (
    <div>
      <Heading title={"Verify"} showBreadcrum={true}/>
      {/* <VerificationGif/> */}
      <div className="flex justify-center items-center px-10 h-[90vh]">
        <div className=" w-[50%] h-[68vh] bg-white p-10 mr-4 rounded-3xl drop-shadow-lg">
          <div className="flex justify-center">
            <h2 className="font-semibold text-2xl">Verify Document</h2>
          </div>
          <hr class="my-5 h-px border-0 bg-gray-300" />

          <form action="" className="space-y-5">
            <div class="mx-auto ">
              <label
                for="example5"
                class="mb-1 block font-medium text-gray-700"
              >
                Upload file
              </label>
              <label class="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300 h-[25vh]">
                <div class="space-y-1 text-center">
                  <div class="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-6 w-6 text-gray-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </div>
                  <div class="text-gray-600">
                    {file ? (
                      <p className="font-medium text-primary-500 hover:text-primary-700">
                        {file.name}
                      </p>
                    ) : (
                      <p className="font-medium text-primary-500 hover:text-primary-700">
                        Click to upload
                        <span className="font-normal ml-1">
                          or drag and drop
                        </span>
                      </p>
                    )}
                  </div>
                  <p class="text-sm text-gray-500">
                    {/* SVG, PNG, JPG or GIF (max. 800x400px) */}
                  </p>
                </div>
                <input
                  id="example5"
                  type="file"
                  class="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="text-center h-5 mt-4 flex justify-center items-center ">
              {!message && <p className="text-sm">{message}</p>}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <button
                type="button"
                onClick={verifyHash}
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
                {loading ? "Verifying..." : "Verify"}
              </button>
            </div>
          </form>
        </div>

        <div className=" w-[50%] h-[68vh] bg-white py-10 ml-4 pl-10 pr-8 rounded-3xl drop-shadow-lg">
          <div className="flex justify-center">
            <h2 className="font-semibold text-2xl">View Result</h2>
          </div>

          <hr class="my-5 h-px border-0 bg-gray-300" />

          <div className="mt-5 h-[40vh] space-y-2">
            {verificationInfo && isVerified ? (
              <ul>
                <li className="border-b pb-5 mb-2 space-y-2">
                  <h3 className="text-center mb-3 text-lg">
                    <strong>title{verificationInfo?.info}</strong>
                  </h3>
                  <p>
                    <strong>Description: </strong>{" "}
                    {verificationInfo?.description}
                  </p>
                  <p>
                    <strong>Name: </strong>
                    {verificationInfo?.name}
                  </p>
                  <p>
                    <strong>Roll no: </strong>
                    {verificationInfo?.rollno}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    {verificationInfo?.email}
                  </p>
                  <p>
                    <strong>Issue Date: </strong>
                    {new Date(
                      Number(verificationInfo?.minetime) * 1000
                    ).toLocaleDateString()}
                  </p>

                  <div className="flex justify-between">
                    <p className="flex">
                      <strong>Status: </strong>
                      <img
                        src="/verified.png"
                        alt="verified"
                        className="h-28 ml-2"
                      />
                    </p>
                    <div className="flex justify-between items-center">
                      <button className="text-gray-400 hover:text-blue-600 mr-5">
                        <FaExternalLinkAlt
                          fontSize={"20px"}
                          onClick={() =>
                            viewDocumentInNewTab(verificationInfo?.ipfs_hash)
                          }
                        />
                      </button>
                      <button className="text-gray-400 hover:text-green-600 mr-5">
                        <FaDownload
                          fontSize={"20px"}
                          onClick={() =>
                            downloadDocument(verificationInfo?.ipfs_hash)
                          }
                        />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            ) : (
              <div className="flex items-center justify-center flex-col">
                <p className="w-full flex justify-center h-1/2 items-center mt-10">
                  No Records
                </p>
                {isVerified === "unKnown" ? (
                  ""
                ) : (
                  <p className="flex">
                    <strong>Status: </strong>
                    <img
                      src="/notCer.png"
                      alt="unverified"
                      className="h-28 ml-2"
                    />
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
