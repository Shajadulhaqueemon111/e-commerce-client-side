import { MdBackup } from "react-icons/md";
import { RiListIndefinite } from "react-icons/ri";
import { MdApproval } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const menuItems = [
    {
      name: (
        <span className="flex gap-2 font-bold">
          <RiDashboardLine className="text-xl"></RiDashboardLine>Dashboard
        </span>
      ),
      path: "/",
    },
    {
      name: (
        <span className="font-bold gap-2 flex">
          <MdApproval className="text-xl "></MdApproval>Admin-Approve
        </span>
      ),
      path: "/admin/Approve",
    },
    {
      name: (
        <span className="flex gap-2 font-bold">
          <RiListIndefinite className="text-xl"></RiListIndefinite> Product
          Listing
        </span>
      ),
      path: "/admin/listing",
    },
    {
      name: (
        <span className="flex gap-2 font-bold">
          <MdBackup className=" text-xl "></MdBackup> Seller-Uploading-System
        </span>
      ),
      path: "/admin/Seller-Uploading-System",
    },
    {
      name: (
        <span className="flex gap-2 font-bold">
          <MdSettings className="text-xl "></MdSettings>Setting
        </span>
      ),
      path: "/admin/settings",
    },
  ];

  return (
    <div className="w-72 bg-blue-200 min-h-screen">
      <h1 className="text-xl font-bold p-4 text-center">Admin Panel</h1>
      <div>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `block py-2 px-4 hover:bg-slate-50 rounded ${
                isActive ? "bg-purple-500" : ""
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
