import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-4 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
