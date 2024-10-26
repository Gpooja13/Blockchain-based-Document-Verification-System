import React from "react";
import Heading from "../Components/Heading";
import { Link } from "react-router-dom";

export default function Home() {
 
  return (
    <section class="text-gray-600 body-font ">
      <Heading title={"Home"} showBreadcrum={false} />
      <div class="container px-5 py-24 mx-auto h-[90vh] ">
        <div class="flex flex-wrap -m-4 justify-center gap-5">
          <div class="p-4 md:w-[22vw] bg-gray-200 hover:bg-gray-300 ">
            <Link to={"/view"}>
              <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden ">
                <img
                  class="p-10 w-full object-cover object-center"
                  src="/student2.png"
                  alt="blog"
                />
                <div class="px-6">
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                    Students
                  </h1>
                  <p class="leading-relaxed mb-3 text-justify">
                    Easily search and verify personal certificates securely.
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div class="p-4 md:w-[22vw] bg-gray-200  hover:bg-gray-300 ">
            <Link to={"/upload"}>
              <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  class="p-10 w-full object-cover object-center"
                  src="/institute.png"
                  alt="blog"
                />
                <div class="px-6">
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                    Institutes
                  </h1>
                  <p class="leading-relaxed mb-3 text-justify">
                    Issue and authenticate degrees with blockchain-based
                    transparency.
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div class="p-4 md:w-[22vw] bg-gray-200 hover:bg-gray-300 ">
            <Link to={"/verify"}>
              <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  class="p-7 w-full object-cover object-center"
                  src="/company.png"
                  alt="blog"
                />
                <div class="px-6">
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                    Organisations
                  </h1>
                  <p class="leading-relaxed mb-3 text-justify">
                    Verify candidate credentials securely, ensuring
                    authenticity.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
