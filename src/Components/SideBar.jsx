import React from "react";

export default function SideBar() {
  return (
    <div>
      <aside className="w-72 flex-none bg-blue-200 p-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="h-10 w-10">
            <img
              className="h-full w-full rounded-full object-cover object-center ring ring-white"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div>
            <div className="text-sm font-medium text-secondary-500">
              Steven Jobs
            </div>
            <div className="text-xs text-secondary-400">Joined in April 1976</div>
          </div>
        </div>
        <div>
          <ul>
            <li>Home</li>
            <li>Verify</li>
            <li>View</li>
            <li>Validate</li>
            <li>Institute</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
