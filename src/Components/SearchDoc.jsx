import React, { useState, useEffect } from "react";
import { JWT } from "../Constants/constants";
import Input from "./Input";
// import Web3 from "web3";

export default function IssueDoc({}) {
  return (
    <div class="mx-auto mt-10 bg-white p-10 rounded-3xl drop-shadow-lg ">
      <div className="flex justify-center">
        <h2 className="font-semibold text-2xl">Document Issued </h2>
      </div>
      <hr class="mt-5 h-px border-0 bg-gray-300" />
      <div>List</div>
    </div>
  );
}
