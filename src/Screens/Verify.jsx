import React, { useState } from "react";
import Heading from "../Components/Heading";
import VerificationGif from "../Components/VerificationGif";
// import Web3 from "web3";

export default function Verify({
  contract,
  userAddress,
  fileHash,
  message,
  setMessage,
  isFileHashed,
  file,
  loading,
  setLoading,
  handleFileChange,
}) {
  const [verificationInfo, setVerificationInfo] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  // const getSha3 = async (file) => {
  //   if (!file) {
  //     setMessage("No file selected");
  //     return;
  //   }

  //   setMessage("Hashing Your Document 😴...");
  //   const reader = new FileReader();

  //   reader.readAsText(file, "UTF-8");

  //   reader.onload = async (evt) => {
  //     try {
  //       const web3 = new Web3(Web3.givenProvider);
  //       const hashedFile = web3.utils.soliditySha3(evt.target.result);

  //       setFileHash(hashedFile);
  //       setIsFileHashed(true);
  //       setMessage("Document Hashed 😎");
  //       console.log(`Document Hash: ${hashedFile}`);
  //     } catch (error) {
  //       console.error("Error hashing the file", error);
  //       setMessage("Error hashing the file");
  //     }
  //   };

  //   reader.onerror = () => {
  //     setMessage("Error reading the file");
  //     setFileHash(null);
  //   };
  // };

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  //   setMessage("");
  //   setIsFileHashed(false);
  //   setFileHash(null);

  //   if (selectedFile) {
  //     getSha3(selectedFile);
  //   }
  // };

  const verifyHash = async () => {
    setLoading(true);

    if (fileHash) {
      try {
        const result = await contract.methods
          .findDocHash(fileHash)
          .call({ from: userAddress });
        console.log(result);
        if (result[0] !== 0n && result[0] !== 0n) {
          setVerificationInfo(result);
          setIsVerified(true);
        } else {
          setVerificationInfo(result);
          setIsVerified(false);
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

  const printVerificationInfo = () => {
    if (!verificationInfo) return null;
    return (
      <div className="verification-info">
        <p>Hash: {verificationInfo[0]}</p>
        <p>Status: {isVerified ? "Verified" : "Not Verified"}</p>
        {/* Add more details from the `verificationInfo` if needed */}
      </div>
    );
  };

  return (
    // <div>
    //   <Heading title={"Verify"} />
    //   {/* <div className="mx-auto max-w-xs">
    //     <label
    //       htmlFor="doc-file"
    //       className="mb-1 block text-sm font-medium text-gray-700"
    //     >
    //       Upload file
    //     </label>
    //     <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
    //       <div className="space-y-1 text-center">
    //         <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             strokeWidth="1.5"
    //             stroke="currentColor"
    //             className="h-6 w-6 text-gray-500"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
    //             />
    //           </svg>
    //         </div>
    //         <div className="text-gray-600">
    //           <span className="font-medium text-primary-500 hover:text-primary-700">
    //             Click to upload
    //           </span>{" "}
    //           or drag and drop
    //         </div>
    //         <p className="text-sm text-gray-500">
    //           SVG, PNG, JPG or GIF (max. 800x400px)
    //         </p>
    //       </div>
    //       <input
    //         id="doc-file"
    //         type="file"
    //         className="sr-only"
    //         onChange={handleFileChange}
    //       />
    //     </label>
    //   </div> */}
    //   <Input handleFileChange={handleFileChange}/>

    //   <div className="flex flex-wrap justify-center gap-5">
    //     <button
    //       type="button"
    //       onClick={verifyHash}
    //       className="rounded-lg border border-yellow-500 bg-yellow-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-yellow-700 hover:bg-yellow-700 focus:ring focus:ring-yellow-200 disabled:cursor-not-allowed disabled:border-yellow-300 disabled:bg-yellow-300"
    //       disabled={loading || !isFileHashed}
    //     >
    //       {loading ? "Verifying..." : "Verify Document"}
    //     </button>
    //   </div>
    //   {message && <div className="text-red-500">{message}</div>}
    //   <div>{printVerificationInfo()}</div>
    // </div>

    <div className="bg-gray-200">
      <Heading title={"Verify"} />
      {/* <VerificationGif/> */}
      <div className="flex justify-center items-center px-10 h-[80vh]">
        <div className=" w-[50%] h-[70vh] bg-white p-10 mr-4 rounded-3xl drop-shadow-lg">
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
                    <p className="font-medium text-primary-500 hover:text-primary-700">
                      Click to upload{" "}
                      <span className="font-normal">or drag and drop</span>
                    </p>
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
              {!message && (
                <>
                  <p className="text-sm">{message}jkjhjh</p>
                  <div>{printVerificationInfo()}</div>
                </>
              )}
            </div>

            <div
              className="flex flex-wrap items-center justify-center gap-5"
              style={{ marginTop: "30px" }}
            >
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

        <div className=" w-[50%] h-[70vh] bg-white py-10 ml-4 pl-10 pr-8 rounded-3xl drop-shadow-lg">
          <div className="flex justify-center">
            <h2 className="font-semibold text-2xl">View Result</h2>
          </div>

          <hr class="my-5 h-px border-0 bg-gray-300" />

          <div className="mt-5 h-[40vh] space-y-2">
            <h4 className="font-bold text-lg text-center mb-5">
              Indian Institute of Technology Bombay
            </h4>
            <p>
              <strong className="text-gray-700">Transaction Id: </strong>
              123ABC
            </p>
            <p>
              <strong className="text-gray-700">Name: </strong> Pooja Gupta
            </p>
            <p>
              <strong className="text-gray-700">Rollno: </strong> BFT/17/163
            </p>
            <p>
              <strong className="text-gray-700">Email: </strong>
              gpooja750@yahoo.com
            </p>
            <p>
              <strong className="text-gray-700">Description: </strong> Bachelor
              of Fashion Design
            </p>
            <p>
              <strong className="text-gray-700">Date Issued: </strong> 2014
            </p>
          </div>
          <div className="flex justify-evenly items-center ">
            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded-lg border border-green-500 bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-green-700 hover:bg-green-700 focus:ring focus:ring-green-200 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300"
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
              View Doc
            </button>

            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded-lg border border-blue-500 bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-4 w-4"
              >
                <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
              </svg>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
