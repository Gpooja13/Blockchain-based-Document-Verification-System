import React, { useState } from "react";
import Heading from "../Components/Heading";
import Input from "../Components/Input";
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
    <div>
      <Heading title={"Verify"} />
      {/* <div className="mx-auto max-w-xs">
        <label
          htmlFor="doc-file"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Upload file
        </label>
        <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
          <div className="space-y-1 text-center">
            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </div>
            <div className="text-gray-600">
              <span className="font-medium text-primary-500 hover:text-primary-700">
                Click to upload
              </span>{" "}
              or drag and drop
            </div>
            <p className="text-sm text-gray-500">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
          <input
            id="doc-file"
            type="file"
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>
      </div> */}
      <Input handleFileChange={handleFileChange}/>

      <div className="flex flex-wrap justify-center gap-5">
        <button
          type="button"
          onClick={verifyHash}
          className="rounded-lg border border-yellow-500 bg-yellow-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-yellow-700 hover:bg-yellow-700 focus:ring focus:ring-yellow-200 disabled:cursor-not-allowed disabled:border-yellow-300 disabled:bg-yellow-300"
          disabled={loading || !isFileHashed}
        >
          {loading ? "Verifying..." : "Verify Document"}
        </button>
      </div>
      {message && <div className="text-red-500">{message}</div>}
      <div>{printVerificationInfo()}</div>
    </div>
  );
}
