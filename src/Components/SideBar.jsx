import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

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
const location = useLocation();

  // Set selected menu item based on the current pathname
  useEffect(() => {
    const currentPath = location.pathname;
    const activeMenuItem = menuItems.find((item) => item.link === currentPath);
    if (activeMenuItem) {
      setSelected(activeMenuItem);
    }
  }, [location.pathname]);

  return (
    <div>
      <aside className="w-72 flex-none bg-blue-200 p-2">
        <div className="flex flex-wrap items-center justify-center gap-3 h-[15vh] border-b-2 border-white">
          <div className="h-10 w-10">
            <img
              className="h-full w-full rounded-full object-cover object-center ring ring-white"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div>
            <div className="text-sm font-medium text-secondary-500">
              Address: 0X1234567890
            </div>
            <div className="text-xs text-secondary-400">
              Network:
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
                  
                  className={`h-[10vh] flex items-center justify-start text-lg hover:bg-slate-300 ${selected.title===item.title?"border-r-green-500 border-4":""}`}>
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
