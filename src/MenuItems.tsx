import {  MdDashboard } from "react-icons/md";
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