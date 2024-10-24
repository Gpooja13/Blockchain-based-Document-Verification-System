import React, { useState, useEffect } from "react";
import Heading from "../Components/Heading";
import { MdDeleteOutline } from "react-icons/md";
import Modal from "../Components/Modal";
import { useGlobalContext } from "../context/context";

export default function Admin() {
  const [address, setAddress] = useState(null);
  const [info, setInfo] = useState(null);
  const [logs, setLogs] = useState([]);
  const [delLogs, setDelLogs] = useState([]);
  const [delAddress, setDelAddress] = useState("");
  const [exporterCount, setExporterCount] = useState("");

  const {
    get_ChainID,
    contract,
    userAddress,
    message,
    setMessage,
    loading,
    setLoading,
    showModal,
    setShowModal,
    refreshLog,
    setRefreshLog,
  } = useGlobalContext();

  const addExporter = async () => {
    if (info && address) {
      setLoading(true);
      setMessage("Please confirm the transaction 😕...");

      await get_ChainID(); // Ensure ChainID is retrieved

      try {
        const result = await contract.methods
          .add_Exporter(address, info)
          .send({ from: userAddress });
        console.log(result);

        setMessage("Exporter Added to the Blockchain 🙂");
        setRefreshLog(Math.random());
        setAddress("");
        setInfo("");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } catch (err) {
        console.error(err.message);
        setMessage("An error occurred during the transaction.");
      } finally {
        setLoading(false);
      }
    } else {
      setMessage("You need to provide address & information to add.");
      console.log("You need to provide address & information to add.");
    }
  };

  const deleteExporter = async () => {
    if (delAddress) {
      setLoading(true);
      setMessage("Please confirm the transaction 😕...");

      await get_ChainID(); // Ensure ChainID is retrieved

      try {
        await contract.methods
          .delete_Exporter(delAddress)
          .send({ from: userAddress });
        setMessage("Exporter Deleted Successfully 🙂");
        setRefreshLog(Math.random());
      } catch (err) {
        console.error(err.message);
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setMessage("You need to provide an address to delete 👍");
    }
  };

  const getAuthorityCount = async () => {
    try {
      if (!contract) {
        throw new Error("Smart contract is not initialized.");
      }

      const exportersCount = await contract.methods.count_Exporters().call();
      setExporterCount(exportersCount);
    } catch (error) {
      console.error("Error fetching exporter information:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async () => {
      if (!isMounted) return;

      try {
        const pastEvents = await contract.getPastEvents("ExporterAdded", {
          filter: {},
          fromBlock: 0,
          toBlock: "latest",
        });

        // Only update state if the component is still mounted
        console.log("added:", pastEvents);
        setLogs(pastEvents);

        const pastDelEvents = await contract.getPastEvents("ExporterDeleted", {
          filter: {},
          fromBlock: 0,
          toBlock: "latest",
        });
        console.log("deleted:", pastDelEvents);
        setDelLogs(pastDelEvents);
      } catch (err) {
        console.error("Error fetching past events:", err);
      }
    };

    fetchEvents();
    if (contract) {
      getAuthorityCount();
    }

    return () => {
      isMounted = false;
    };
  }, [refreshLog]);

  return (
    <div >
      <Heading title={"Admin"} showBreadcrum={true} />
      <div className="flex justify-center items-center px-10 h-[90vh]">
        <Modal
          deleteFunction={deleteExporter}
          delRecord={delAddress}
          title={"Authority"}
        />
        <div className=" w-[50%] h-[68vh] bg-white p-10 mr-4 rounded-3xl drop-shadow-lg">
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
                value={address}
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
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                className="block w-full h-[8vh] px-4 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="Authority Name"
              />
            </div>
            <div className="text-center h-3 mt-4 flex justify-center items-center ">
              {message && <p className="text-sm">{message}</p>}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <button
                type="button"
                onClick={addExporter}
                class="inline-flex items-center gap-1.5 rounded-lg border border-green-500 bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-green-700 hover:bg-green-700 focus:ring focus:ring-green-200 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 w-[40%] justify-center"
                disabled={loading}
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
        <div className=" w-[50%] h-[68vh] bg-white py-10 ml-4 pl-10 pr-8 rounded-3xl drop-shadow-lg">
          <div className="flex justify-center">
            <h2 className="font-semibold text-2xl">{`View Logs (${
              exporterCount === "" ? 0 : exporterCount
            })`}</h2>
          </div>

          <hr class="my-5 h-px border-0 bg-gray-300" />

          <div className="mt-5 h-[40vh] overflow-y-auto thin-scrollbar">
            {exporterCount.length === 0 ? (
              <p className="w-full flex justify-center h-1/2 items-center">
                No Records
              </p>
            ) : (
              <ul>
                {logs
                  .filter(
                    (log) =>
                      !delLogs.some(
                        (delLog) =>
                          delLog.returnValues.minetime ===
                          log.returnValues.minetime
                      )
                  )
                  .map((log, index) => (
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
                          <strong>Registration Date: </strong>
                          {new Date(
                            Number(log.returnValues.minetime) * 1000
                          ).toLocaleDateString()}
                        </p>
                        <button
                          onClick={() => {
                            setDelAddress(log.returnValues.exporterAddress);
                            setShowModal(true);
                          }}
                        >
                          <MdDeleteOutline
                            fontSize={"28px"}
                            className="text-gray-400 hover:text-red-600 mr-5"
                          />
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
