import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      {/* هنا تحطي Navbar / Sidebar */}
      
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}