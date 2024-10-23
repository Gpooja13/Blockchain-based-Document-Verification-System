import React from "react";
import { Link } from "react-router-dom";

export default function Heading({title}) {
  return (
    <div className="bg-gray-100 h-[10vh] w-[78.9vw] drop-shadow-md">
      <div className="ml-5">
        <nav aria-label="breadcrumb">
          <ol class="inline-flex items-center space-x-4 pt-2 text-sm font-medium">
            <li class="inline-flex items-center">
              <Link
                to={"/"}
                class="text-secondary-500 hover:text-secondary-600 ml-3"
              >
                Home
              </Link>
            </li>
            <li class="inline-flex items-center space-x-4">
              <span class="text-secondary-400">/</span>
              <Link to={""} class="text-secondary-500 hover:text-secondary-600">
                {title}
              </Link>
            </li>
          </ol>
          <div>
            <h2 className="mx-3 text-xl font-bold">{title}</h2>
          </div>
        </nav>
      </div>
    </div>
  );
}
