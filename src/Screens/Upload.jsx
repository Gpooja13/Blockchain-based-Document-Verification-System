import React from "react";

export default function Upload() {
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
      

      <div className="mx-auto max-w-xs">
        <label
          html="example5"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Upload file
        </label>
        <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
          <div className="space-y-1 text-center">
            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </div>
            <div className="text-gray-600">
              <a
                href="/"
                className="font-medium text-primary-500 hover:text-primary-700"
              >
                Click to upload
              </a>{" "}
              or drag and drop
            </div>
            <p className="text-sm text-gray-500">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
          <input id="example5" type="file" className="sr-only" />
        </label>
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        <button
          type="button"
          className="rounded-lg border border-yellow-500 bg-yellow-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-yellow-700 hover:bg-yellow-700 focus:ring focus:ring-yellow-200 disabled:cursor-not-allowed disabled:border-yellow-300 disabled:bg-yellow-300"
        >
          Button text
        </button>
      </div>
    </div>
  );
}
