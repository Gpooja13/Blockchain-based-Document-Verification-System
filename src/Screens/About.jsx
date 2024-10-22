import React from "react";
import Heading from "../Components/Heading";

export default function About() {
  return (
    <div className="bg-gray-200 ">
      <Heading title={"About"} />
      <section class="text-gray-600 bg-white w-[72vw] mt-10 rounded-3xl drop-shadow-lg mx-auto body-font p-5 h-[68vh] flex items-center overflow-hidden">
        <div class="container px-5 py-24 mx-auto flex flex-wrap items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <img src="/logo.webp" alt="" width={"50px"} />
              <h1 className="text-2xl">
                <strong>DocCheck</strong>
              </h1>
            </div>
            <h2 className="font-semibold text-wrap my-1">
              A BlockChain based Validation & Verification App
            </h2>
          </div>

          <div class="mt-5 text-justify">
            <p>
              Welcome to <strong>DocCheck</strong>, your trusted platform for
              secure document management and verification. DocCheck offers a
              seamless solution for uploading, viewing, and verifying essential
              documents like certificates, degrees, and other credentials,
              ensuring transparency and security.
            </p>
            <br />
            <p>
              Our app leverages <strong>blockchain technology </strong>
              to safeguard against fraud, providing a tamper-proof record for
              each document. Every upload is immutably recorded on the
              blockchain, and our verification system ensures that documents
              remain authentic and traceable throughout their lifecycle.
            </p>
            <br />
            <p>
              Whether you're a student, professional, or organization, DocCheck
              offers a robust system to protect the integrity of your
              credentials, making document management secure, efficient, and
              fraud-proof.
            </p>
            <br />
            <p>
              Join us in redefining trust with blockchain-powered document
              verification!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
