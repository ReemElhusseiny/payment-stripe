import Color from "./Color";
import UserMenu from "./UserMenu";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Search from './Search';
import { useTheme } from "@mui/material/styles";

export function FixedHeader() {
  const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);
  const theme = useTheme();
  return (
    <div className="w-full h-16 text-white flex items-center justify-between px-4  relative">
      
      <div className="text-lg font-bold flex-1 md:flex-initial flex gap-3 items-center justify-start">
    <div className="relative z-10 w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-md" style={{background: theme.colors?.primary}}>
  <img 
    src="/earning.png" 
    alt="Logo" 
    className="h-[30px] w-[30px] object-contain"
  />
</div>
        <p className="text-xl md:text-2xl font-bold text-[#425c5a]">Finance</p>
      </div>
      
 <Search showMobileSearch={showMobileSearch} setShowMobileSearch={setShowMobileSearch} />

      <div className="text-lg font-bold flex-1 md:flex-initial flex gap-3 md:gap-5 items-center justify-end">
        
  
        <button 
          onClick={() => setShowMobileSearch(true)}
          className="flex md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Open search"
        >
          <SearchIcon style={{ color: '#425c5a' }} />
        </button>

        <div>
          <UserMenu />
        </div>
        <div>
          <Color/>
        </div>
      </div>

    </div> 
  );
}
