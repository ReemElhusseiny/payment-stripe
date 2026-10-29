// src/pages/Dashboard.tsx

import { HiArrowLeft } from 'react-icons/hi';
import { ButtonComp } from '../components/UI/ButtonComp';
import {useUserStore} from '../Store/AuthStore'

export default function Dashboard() {
  const { logout } = useUserStore();
  const logoutHandler = async () => {
    await logout();
  };

  return (
    <div className="w-full h-full flex flex-col gap-5 items-center justify-center" >
      <h1>Home Page</h1>

      <ButtonComp
                  name="Logout"
                  icon={<HiArrowLeft className="w-3.5 h-3.5" />}
                  fnc={logoutHandler}
                  className="text-center py-2.5 px-4 !bg-[#3F33D1] hover:!bg-[#3730A3] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm shadow-indigo-500/10"
                />
    </div>
  );
}