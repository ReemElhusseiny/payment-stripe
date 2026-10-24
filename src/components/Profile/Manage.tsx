import  useManageactionsStore from  '../../Store/ManageSubStore'
import { BsPause } from "react-icons/bs";
import { ButtonComp } from '../UI/ButtonComp';
import { IoMdClose } from "react-icons/io";
import { FaArrowsRotate } from "react-icons/fa6";

export default function Manage() {

 const {manageActions } =  useManageactionsStore()
  
 const handleManage = async (action: "pause" | "resume" | "cancel") => {
   await manageActions({ action })
 }

  return (
     <div className="flex items-center gap-2 flex-wrap">
      {/* Pause Button */}
      <ButtonComp
      icon={<BsPause size="14px" />}
      name="Pause subscription"
      fnc={() => handleManage("pause")}
      className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold !text-gray-800 !bg-white !border !border-gray-200 !rounded-2xl hover:!bg-gray-50 transition-colors shadow-sm"
  sx={{
    height: '32px',
    minHeight: 'unset',
    px: '16px',  
    py: '6px',  
    borderRadius: '16px',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#f9fafb',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      transform: 'none',
    },
  }}
 />
      <ButtonComp
      icon={< FaArrowsRotate size="14px" />}
      name=" Resume plan"
      fnc={() => handleManage("resume")}
      className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold !text-gray-800 !bg-white !border !border-gray-200 !rounded-2xl hover:!bg-gray-50 transition-colors shadow-sm"
  sx={{
    height: '32px',
    minHeight: 'unset',
    px: '16px',  
    py: '6px',  
    borderRadius: '16px',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#f9fafb',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      transform: 'none',
    },
  }}
 />
        


      {/* Cancel Button */}
      <ButtonComp
        icon={<IoMdClose size="18px"  />}
        name="  Cancel subscription"
        fnc={() => handleManage("cancel")}
        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold !text-red-600 !bg-white !border !border-red-200 rounded-2xl hover:!bg-red-50 transition-colors shadow-sm"
    sx={{
    height: '32px',
    minHeight: 'unset',
    px: '16px',  
    py: '6px',  
    borderRadius: '16px',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#f9fafb',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      transform: 'none',
    },
  }}
   />
      
      
 
    </div>
  );
}

