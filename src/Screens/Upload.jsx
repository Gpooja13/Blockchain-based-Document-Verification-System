import React, { useState } from "react";
import Heading from "../Components/Heading";
import { JWT } from "../Constants/constants";
import Web3 from "web3";

export default function Upload({ get_ChainID, userAddress, contract }) {
  const [fileHash, setFileHash] = useState(null);
  const [message, setMessage] = useState("");
  const [isFileHashed, setIsFileHashed] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cid, setCid] = useState(null);

  // const pinataApiKey = projectId; // Replace with your Pinata API Key
  // const pinataSecretApiKey = projectSecret; // Replace with your Pinata Secret API Key

  const getSha3 = async (file) => {
    if (!file) {
      setMessage("No file selected");
      return;
    }

    setMessage("Hashing Your Document 😴...");
    const reader = new FileReader();

    reader.readAsText(file, "UTF-8");

    reader.onload = async (evt) => {
      try {
        const web3 = new Web3(Web3.givenProvider);
        const hashedfile = await web3.utils.soliditySha3(evt.target.result);

        setFileHash(hashedfile);
        setIsFileHashed(true);
        setMessage("Document Hashed 😎");
        console.log(`Document Hash: ${hashedfile}`);
      } catch (error) {
        console.error("Error hashing the file", error);
        setMessage("Error hashing the file");
      }
    };

    reader.onerror = () => {
      setMessage("Error reading the file");
      setFileHash(null);
    };
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setMessage("");
    setIsFileHashed(false);
    setFileHash(null);

    if (selectedFile) {
      getSha3(selectedFile);
    }
  };

  const uploadFileToPinata = async () => {
    if (!file) {
      setMessage("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("Uploading file to Pinata IPFS...");

      // Make POST request to Pinata API
      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          body: formData,
          headers: {
            // Authorization: `Bearer ${btoa(`${pinataApiKey}:${pinataSecretApiKey}`)}`, // Encode API keys for authentication
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const data = await response.json();
      const fileCid = data.IpfsHash; // Pinata returns 'IpfsHash'
      setCid(fileCid); // Save CID from Pinata response
      setMessage(`File uploaded successfully! CID: ${fileCid}`);
      setLoading(false);
      console.log(`File CID from Pinata: ${fileCid}`);
      return fileCid;
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage(`Error uploading file: ${error.message}`);
      setLoading(false);
      throw error;
    }
  };

  const sendHash = async () => {
    try {
      setLoading(true);
      setMessage("Please confirm the transaction 🙂");

      // Get the current chain ID
      await get_ChainID();

      // Upload the file to Pinata IPFS
      const uploadedCid = await uploadFileToPinata();
      setCid(uploadedCid);
      console.log(`File CID from Pinata: ${uploadedCid}`);

      if (fileHash && fileHash.length > 4) {
        // Initialize web3 contract
        // const web3 = new Web3(Web3.givenProvider);
        // const contract = new web3.eth.Contract(
        //   window.CONTRACT.abi, // Assuming window.CONTRACT holds the ABI and contract address
        //   window.CONTRACT.address
        // );

        // Call contract method
        contract.methods
          .addDocHash(fileHash, uploadedCid)
          .send({ from: userAddress })
          .on("transactionHash", function (_hash) {
            setMessage("Please wait for transaction to be mined...");
          })
          .on("receipt", function (receipt) {
            console.log("Transaction receipt:", receipt);
            setMessage("Transaction successful!");
            setLoading(false);
          })
          .on("error", function (error) {
            console.error("Error in transaction", error);
            setMessage(`Error: ${error.message} 😏`);
            setLoading(false);
          });
      }
    } catch (error) {
      console.error("Error in sendHash function", error);
      setMessage(`Error: ${error.message} 😏`);
      setLoading(false);
    }
  };

  return (
    <div>
      <Heading title={"Upload"} />

      <div className="mx-auto max-w-xs mt-4">
        <label
          htmlFor="example5"
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
            id="example5"
            type="file"
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {message && (
        <div className="text-center mt-4">
          <h5 className="text-warning">{message}</h5>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-5 mt-6">
        <button
          type="button"
          onClick={sendHash}
          className="rounded-lg border border-yellow-500 bg-yellow-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-yellow-700 hover:bg-yellow-700 focus:ring focus:ring-yellow-200 disabled:cursor-not-allowed disabled:border-yellow-300 disabled:bg-yellow-300"
          disabled={!isFileHashed || loading}
        >
          {loading ? "Processing..." : "Upload File"}
        </button>
      </div>

      {fileHash && (
        <div className="text-center mt-4">
          <h5 className="text-info">Document Hash: {fileHash}</h5>
        </div>
      )}
    </div>
  );
}
