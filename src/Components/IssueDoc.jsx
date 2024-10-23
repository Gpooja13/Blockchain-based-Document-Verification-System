import React, { useState, useEffect } from "react";
import { JWT } from "../Utils/constants";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import { useGlobalContext } from "../context/context";

export default function IssueDoc({ togglePage, currentPage }) {
  const [cid, setCid] = useState(null);
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState("");
  const {
    issueEvents,
    setIssueEvents,
    delIssueEvents,
    setDelIssueEvents,
    get_ChainID,
    userAddress,
    contract,
    fileHash,
    message,
    setMessage,
    isFileHashed,
    file,
    setFile,
    loading,
    setLoading,
    handleFileChange,
    refreshLog,
        setRefreshLog
  } = useGlobalContext();

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
      setMessage(`File uploaded to Pinata!`);
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

      if (fileHash && fileHash.length > 4 && name && rollno && email && desc) {
        const record = {
          blockNumber: 0,
          minetime: 0,
          info: " ",
          ipfs_hash: uploadedCid,
          rollno: rollno,
          name: name,
          description: desc,
          email: email,
        };

        contract.methods
          .addDocHash(fileHash, record)
          .send({ from: userAddress })
          .on("transactionHash", function (_hash) {
            setMessage("Please wait for transaction to be mined...");
          })
          .on("receipt", function (receipt) {
            console.log("Transaction receipt:", receipt);
            setMessage("Transaction successful!");
            setLoading(false);
            setRefreshLog(Math.random());
            setName("");
            setDesc("");
            setRollno("");
            setEmail("");
            setFile(null);
          })
          .on("error", function (error) {
            console.error("Error in transaction", error);
            setMessage(`Error: ${error.message} 😏`);
            setLoading(false);
          });
      } else {
        setMessage("Enter all Details");
      }
    } catch (error) {
      console.error("Error in sendHash function", error);
      setMessage(`Error: ${error.message} 😏`);
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async () => {
      if (!isMounted) return;
      try {
        setLoading(true);
        setMessage("");

        const addHashEvents = await contract.getPastEvents("AddHash", {
          filter: { exporter: userAddress },
          fromBlock: 0,
          toBlock: "latest",
        });
        const delHashEvents = await contract.getPastEvents("HashDeleted", {
          filter: { deletedBy: userAddress },
          fromBlock: 0,
          toBlock: "latest",
        });
        console.log("a", delHashEvents);
        console.log("b", addHashEvents);

        setIssueEvents(addHashEvents);
        setDelIssueEvents(delHashEvents);
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
  }, [refreshLog]);

  return (
    <div class="mx-auto mt-10 bg-white h-[67vh] p-10 rounded-3xl drop-shadow-lg ">
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
        <div class="grid grid-cols-6 gap-5 w-[48vw] ">
          <div class="col-span-2">
            <label for="example7" class="mb-1 block font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="example7"
              onChange={(e) => setName(e.target.value)}
              value={name}
              class="block h-[8vh] px-4 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="John Mark"
            />
          </div>
          <div class="col-span-2">
            <label for="example8" class="mb-1 block font-medium text-gray-700">
              Id
            </label>
            <input
              type="text"
              id="example8"
              onChange={(e) => setRollno(e.target.value)}
              value={rollno}
              class="block h-[8vh] px-4 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="123ABC"
            />
          </div>
          <div class="col-span-2">
            <label for="example8" class="mb-1 block font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="example8"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              class="block h-[8vh] px-4 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="abc@gmail.com"
            />
          </div>
          <div class="col-span-6">
            <label for="example9" class="mb-1 block font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="example9"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              class=" col-span-10 block h-[8vh] px-4 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Bachelors of Science"
            />
          </div>
        </div>
        <div className="ml-5">
          <div className="mx-auto w-[18vw] ">
            <label
              htmlFor="doc-file"
              className="mb-1 block font-medium text-gray-700"
            >
              Upload file
            </label>
            <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
              <div className="space-y-1 text-center">
                <div className="mx-auto my-1 h-10 inline-flex w-10 items-center justify-center rounded-full bg-gray-100">
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
                {file ? (
                  <p className="text-xs h-10 font-medium hover:text-primary-700 flex items-center">
                    {file.name}
                  </p>
                ) : (
                  <div className=" text-gray-600">
                    <strong className="font-medium text-primary-500 hover:text-primary-700 mr-1">
                      Click to upload
                    </strong>
                    or drag and drop
                  </div>
                )}
                <p className="text-sm text-gray-500">
                  {/* SVG, PNG, JPG or GIF (max. 800x400px) */}
                </p>
              </div>
              <input
                id="doc-file"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      </form>
      <div>
        {/* {fileHash && (
          <div className="text-center mt-4">
            <h5 className="text-info">Document Hash: {fileHash}</h5>
          </div>
        )} */}
        <div className="text-center h-10 my-2 flex justify-center items-center ">
          {message && <p className="text-sm">{message}</p>}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5">
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
