import React, { useState } from "react";

export default function Admin({ get_ChainID,contract,userAddress}) {
  const [address, setAddress] = useState("");
  const [info, setInfo] = useState("");
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
    }
  };
  

  return (
    <div>
      <div className="mx-auto max-w-md rounded-lg bg-white shadow">
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
      </div>
      <div>
        <div className="mx-auto max-w-xs">
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mx-auto max-w-xs">
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="Title"
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        <button
          type="button"
          onClick={addExporter}
          className="rounded-lg border border-green-500 bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-green-700 hover:bg-green-700 focus:ring focus:ring-green-200 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300"
        >
          Button text
        </button>
        <button
          type="button"
          className="rounded-lg border border-yellow-500 bg-yellow-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-yellow-700 hover:bg-yellow-700 focus:ring focus:ring-yellow-200 disabled:cursor-not-allowed disabled:border-yellow-300 disabled:bg-yellow-300"
        >
          Button text
        </button>
        <button
          type="button"
          className="rounded-lg border border-red-500 bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300"
        >
          Button text
        </button>
      </div>
    </div>
  );
}
