import { IoIosBusiness } from "react-icons/io";
import { MdOutlineAddBusiness, MdDashboard } from "react-icons/md";
import { RiFileExcel2Line } from "react-icons/ri";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

export const dashboardRoutes = [
  {
    path: "dashboard",
    title: "Dashboard",
    icon: <MdDashboard size={22} />,
    element: <Dashboard />,
    showInSidebar: true,
  },
 
  {
    path: "/profile",
    title: "Profile",
    element: <Profile />,
    showInSidebar: true,
  },
];