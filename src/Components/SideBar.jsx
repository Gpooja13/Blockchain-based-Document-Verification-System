import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";


export default function SideBar() {
  const menuItems = [
    {icon:"",title:"Home",link:"/"},
    {icon:"",title:"Verify",link:"/verify"},
    {icon:"",title:"View",link:"/view"},
    {icon:"",title:"Validate",link:"/upload"},
    {icon:"",title:"Institute",link:"/admin"},
    {icon:"",title:"About",link:"/about"},
    {icon:"",title:"Contact",link:"/contact"},
  ];
const [selected, setSelected] = useState(menuItems[0]);

useEffect(() => {
  console.log(selected);
}, [selected])


  return (
    <div>
      <aside className="w-72 flex-none bg-blue-200 p-2">
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
            <div className="text-xs text-secondary-400">
              Joined in April 1976
            </div>
          </div>
        </div>
        <div>
          <ul>
            {menuItems.map((item, index) => {
              return (
                <Link key={index} to={item.link}>
                <li
                onClick={()=>setSelected(menuItems[index])}
                  
                  className={`h-[10vh] flex items-center justify-start text-lg hover:bg-slate-500 ${selected.index===index?"border-r-green-500 border-2":""}`}>
                  <p className="m-5">{item.title}</p>
                </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}
