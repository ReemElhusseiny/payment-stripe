// src/pages/Dashboard.tsx

import {useUserStore} from '../Store/AuthStore'

export default function Dashboard() {
  const { logout } = useUserStore();
  const logoutHandler = async () => {
    await logout();
  };

  return (
    <div className="w-full h-full flex flex-col gap-5 items-center justify-center" >
      <h1>Dashboard</h1>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}