import {  MdDashboard } from "react-icons/md";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { Payment } from "@mui/icons-material";
import { MdOutlinePerson } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";

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
     icon: <MdOutlinePerson size={22} />,
    showInSidebar: true,
  },
  {
    path: "/payments",
    title: "Payment",
    icon: <MdOutlinePayment size={22} />,
    element: <Payment />,
    showInSidebar: true,
  },
];