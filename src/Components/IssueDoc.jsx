import React, { useState, useEffect } from "react";
import { JWT } from "../Constants/constants";
import Input from "./Input";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
// import Web3 from "web3";

export default function IssueDoc({
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
  togglePage,
  currentPage,
}) {
  const [cid, setCid] = useState(null);
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [desc, setDesc] = useState("");

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
          .addDocHash(fileHash, uploadedCid, name, desc, rollno)
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

  useEffect(() => {
    let isMounted = true; // Track if component is mounted
    const fetchEvents = async () => {
      if (!isMounted) return;
      try {
        setLoading(true);
        setMessage("");
        // Fetch AddHash events
        const addHashEvents = await contract.getPastEvents("AddHash", {
          filter: { exporter: userAddress }, // Optional: filter by user address
          fromBlock: 0, // Change as needed
          toBlock: "latest",
        });
        console.log("a", addHashEvents);

        setEvents(addHashEvents);

        console.log(events);
      } catch (error) {
        console.error("Error fetching past events:", error);
        setMessage("Error fetching events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [contract, userAddress]);

  return (
    <div class="mx-auto mt-10 bg-white p-10 rounded-3xl drop-shadow-lg ">
      <div className="flex justify-center">
        <h2 className="font-semibold text-2xl">Upload Document</h2>
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
      <form action="" class="space-y-5 flex items-baseline justify-center ">
        <div class="grid grid-cols-14 gap-5 w-[35vw] ">
          <div class="col-span-5">
            <label for="example7" class="mb-1 block font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="example7"
              onChange={(e) => setName(e.target.value)}
              class="block h-[8vh] w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="John Mark"
            />
          </div>
          <div class="col-span-5">
            <label for="example8" class="mb-1 block font-medium text-gray-700">
              Id
            </label>
            <input
              type="text"
              id="example8"
              onChange={(e) => setRollno(e.target.value)}
              class="block h-[8vh] w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="123ABC"
            />
          </div>
          <div class="col-span-10">
            <label for="example9" class="mb-1 block font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="example9"
              onChange={(e) => setDesc(e.target.value)}
              class=" col-span-10 block h-[8vh] w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Bachelors of Science"
            />
          </div>
          <div className="col-span-10">
            {/* <Input handleFileChange={handleFileChange} /> */}
          </div>
        </div>
        <div className="ml-5">
          <Input handleFileChange={handleFileChange} />
        </div>
      </form>
      <div>
        {fileHash && (
          <div className="text-center mt-4">
            <h5 className="text-info">Document Hash: {fileHash}</h5>
          </div>
        )}

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
      </div>
    </div>
  );
}
