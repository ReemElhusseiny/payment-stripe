import {useState} from 'react';
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 
import { useSearchParams } from 'react-router-dom';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import {keepPaginationParams} from '../ReusableFunc/SharedFunc';
import {useUrlPagination} from '../CustomHooks/useUrlPagination'

export default function Search({showMobileSearch, setShowMobileSearch}: {showMobileSearch: boolean; setShowMobileSearch: (value: boolean) => void}) {
const [searchParams, setSearchParams] = useSearchParams();
const { updateUrlParams } = useUrlPagination();
const [inputText, setInputText] = useState<string>(searchParams.get('search') || "");
const handleSearch = () => {
  updateUrlParams({ search: inputText.trim() });
};
  return (
<div className="w-full flex justify-center">
       {showMobileSearch ? (
        <div className="absolute inset-0 bg-white px-4 flex items-center gap-3 z-50 md:hidden animate-fadeIn">
          <button 
            onClick={() => setShowMobileSearch(false)}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <ArrowBackIcon />
          </button>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
              <SearchIcon className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search Drive..."
              className="w-full bg-gray-100 text-gray-700 placeholder-gray-400 text-sm rounded-full py-2 ps-11 pe-4 border border-transparent focus:bg-white focus:border-gray-300 outline-none"
            />
          </div>
        </div>
      ) : null}
           <div className="hidden md:flex flex-1 max-w-xl mx-4 items-center justify-center">
        <div className="w-full">
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 start-0 flex items-center ps-4 cursor-pointer pointer-events-auto">
                {searchParams.get('search') ? (

      <SearchOffIcon className="text-gray-500" onClick={() => {setSearchParams(keepPaginationParams(searchParams))
         setInputText(""); }
      } />
              ) : (
                <div onClick={handleSearch}>
                  <svg
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              </div>
              )
              }
            
            </div>
            <input
            value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        
              type="text"
              placeholder="Search Drive..."
              className="w-full bg-gray-100 text-gray-700 placeholder-gray-400 text-sm rounded-full py-2 ps-11 pe-4 border border-transparent focus:bg-white focus:border-gray-200 focus:shadow-sm outline-none transition-all duration-200"
            />
          </div>
        </div>
      </div>
</div>
  )
}