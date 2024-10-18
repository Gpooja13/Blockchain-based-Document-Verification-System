import React, { useState, useEffect } from "react";
import Heading from "../Components/Heading";

export default function IssueDoc({}) {
  const [rollno, setRollno] = useState("");
  return (
    <div className="bg-gray-200">
      <Heading title={"View"} />
      <div className="flex justify-center items-center px-10 h-[80vh]">
        <div className=" w-[50%] h-[70vh] bg-white p-10 mr-4 rounded-3xl drop-shadow-lg">
          <div className="flex justify-center">
            <h2 className="font-semibold text-2xl">Find Doc</h2>
          </div>
          <hr class="my-5 h-px border-0 bg-gray-300" />

          <form action="" className="space-y-5">
            <div>
              <label
                htmlFor="address"
                className="mb-1 block font-medium text-gray-700"
              >
                Roll no
              </label>
              <input
                type="text"
                id="address"
                onChange={(e) => setRollno(e.target.value)}
                className="block w-full h-[8vh] px-4 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="123..abc"
              />
            </div>

            <div class="mx-auto ">
              <label
                for="example5"
                class="mb-1 block font-medium text-gray-700"
              >
                Upload file
              </label>
              <label class="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300 h-[15vh]">
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
                <input id="example5" type="file" class="sr-only" />
              </label>
            </div>

            <div
              className="flex flex-wrap items-center justify-center mt-10 gap-5"
              style={{ marginTop: "40px" }}
            >
              <button
                type="button"
                // onClick={addExporter}
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
                Search
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
              fjhfj
            </p>
            <p>
              <strong className="text-gray-700">Name: </strong> Pooja Gupta
            </p>
            <p>
              <strong className="text-gray-700">Rollno: </strong> BFT/17/163
            </p>
            <p>
              <strong className="text-gray-700">Email: </strong>{" "}
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
