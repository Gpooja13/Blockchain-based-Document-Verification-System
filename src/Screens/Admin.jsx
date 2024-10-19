import React, { useState, useEffect } from "react";
import Heading from "../Components/Heading";
import { MdDeleteOutline } from "react-icons/md";
import Modal from "../Components/Modal";

export default function Admin({ get_ChainID, contract, userAddress }) {
  const [address, setAddress] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [logs, setLogs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch past events when the component mounts
  useEffect(() => {
    let isMounted = true; // Track if component is mounted

    const fetchEvents = async () => {
      if (!isMounted) return; // Check if the component is still mounted

      try {
        const pastEvents = await contract.getPastEvents("ExporterAdded", {
          filter: {},
          fromBlock: 0,
          toBlock: "latest",
        });

        // Only update state if the component is still mounted
        console.log(pastEvents);
        setLogs(pastEvents);
      } catch (err) {
        console.error("Error fetching past events:", err);
      }
    };

    fetchEvents();

    // Cleanup function to set isMounted to false
    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [contract]);

  const addExporter = async () => {
    if (info && address) {
      setLoading(true);
      setMessage("");
      setError("");

      await get_ChainID(); // Ensure ChainID is retrieved

      try {
        const result = await contract.methods
          .add_Exporter(address, info)
          .send({ from: userAddress });
        console.log(result);
        setMessage("Exporter Added to the Blockchain 😇");
      } catch (err) {
        console.error(err.message);
        setError("An error occurred during the transaction.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("You need to provide address & information to add.");
      console.log("You need to provide address & information to add.");
    }
  };

  const deleteExporter = async () => {
    if (address) {
      setLoading(true);
      setMessage("Please confirm the transaction 😕...");
      setError("");

      await get_ChainID(); // Ensure ChainID is retrieved

      try {
        await contract.methods
          .delete_Exporter(address)
          .send({ from: userAddress });
        setMessage("Exporter Deleted Successfully 🙂");
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError("You need to provide an address to delete 👍");
    }
  };

  return (
    <div className="bg-gray-200">
      <Heading title={"Admin"} />
      <div className="flex justify-center items-center px-10">
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          deleteExporter={deleteExporter}
        />
        <div className=" w-[50%] h-[65vh] bg-white p-10 mt-10 mr-4 rounded-3xl drop-shadow-lg">
          <div className="flex justify-center">
            <h2 className="font-semibold text-2xl">Register Authority</h2>
          </div>
          <hr class="my-5 h-px border-0 bg-gray-300" />

          <form action="" className="space-y-5">
            <div>
              <label
                htmlFor="address"
                className="mb-1 block font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full h-[8vh] px-4 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="0x65yb....1cu79"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="mb-1 block font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) => setInfo(e.target.value)}
                className="block w-full h-[8vh] px-4 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="Authority Name"
              />
            </div>
            <div className="text-center h-3 mt-4 flex justify-center items-center ">
              {!message && (
              <p className="text-sm">{message}</p>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <button
                type="button"
                onClick={addExporter}
                class="inline-flex items-center gap-1.5 rounded-lg border border-green-500 bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-green-700 hover:bg-green-700 focus:ring focus:ring-green-200 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 w-[40%] justify-center"
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
                {loading ? "Processing..." : "Add Authority"}
              </button>
            </div>
          </form>
        </div>
        <div className=" w-[50%] h-[65vh] bg-white py-10 ml-4 pl-10 pr-8 mt-10 rounded-3xl drop-shadow-lg">
          <div className="flex justify-center">
            <h2 className="font-semibold text-2xl">View Logs</h2>
          </div>

          <hr class="my-5 h-px border-0 bg-gray-300" />

          <div className="mt-5 h-[40vh] overflow-y-auto thin-scrollbar">
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
          </div>
        </div>
      </div>
    </div>
  );
}
