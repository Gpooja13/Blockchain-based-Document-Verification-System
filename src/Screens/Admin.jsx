import React, { useState } from "react";
import Heading from "../Components/Heading";

export default function Admin({ get_ChainID, contract, userAddress }) {
  const [address, setAddress] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const addExporter = async () => {
   
    if (info && address) {
      setLoading(true);
      setMessage("");
      setError("");

      await get_ChainID(); // Ensure ChainID is retrieved

      try {
        const result = await contract.methods // Use the contract instance directly
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
          .send({ from: userAddress })
          .on("transactionHash", function (hash) {
            setMessage("Please wait for transaction to be mined 😴...");
          })
          .on("receipt", function (receipt) {
            setMessage("Exporter Deleted Successfully 🙂");
            console.log(receipt);
          })
          .on("error", function (error) {
            console.error(error.message);
            setError(error.message);
          });
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
    <div className="bg-pink-300">
      <Heading title={"Admin"} />
      {/* <div className="mx-auto max-w-md rounded-lg bg-white shadow">
        <div className="p-4">
          <h3 className="text-xl font-medium text-gray-900">
            Migrating to Sailboat UI
          </h3>
          <p className="mt-1 text-gray-500">
            Sailboat UI is a modern UI component.
          </p>
          <p className="mt-1 text-gray-500">
            Sailboat UI is for Tailwind CSS. Get started with 150+ open source
            components.
          </p>
          <p className="mt-1 text-gray-500">
            Get started with 150+ open source components.
          </p>
        </div>
      </div> */}

      <div>
        <div class="mx-auto max-w-xl">
          <form action="" class="space-y-5">
            <div>
              <label for="address" class="mb-1 block font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                onChange={(e)=>setAddress(e.target.value)}
                class="block w-full h-[8vh] px-4 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="0x65yb....1cu79"
              />
            </div>
            <div>
              <label for="name" class="mb-1 block font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                onChange={(e)=>setInfo(e.target.value)}
                class="block w-full h-[8vh] px-4 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="Authority Name"
              />
            </div>

            <div class="flex flex-wrap items-center justify-center gap-5">
              <button
                type="button"
                onClick={addExporter}
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
                Upload
              </button>
              <button
                type="button"
                class="inline-flex items-center gap-1.5 rounded-lg border border-red-500 bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    fill="currentColor"
                    d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0Zm-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2h7.5Zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0v-10Zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1Z"
                  />
                </svg>
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
