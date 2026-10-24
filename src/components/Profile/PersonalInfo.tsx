import React, { useEffect } from 'react'
import {
  FiUser,
  FiEdit2,
  FiCalendar,
} from "react-icons/fi";
import { useUserStore } from "../../Store/AuthStore";

function PersonalInfo() {
     const {
        user
      } = useUserStore();
    console.log('userTest', user)
  return (
       <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-[#D1D5DB]/40 flex items-center justify-center text-gray-700">
                  <FiUser className="w-6 h-6" />
                </div>
                <button className="inline-flex items-center gap-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full transition">
                  <FiEdit2 className="w-3.5 h-3.5" />
                  Edit
                </button>
              </div>

              <div className="mt-4">
                <h2 className="text-lg font-bold text-gray-900">{user?.firstName || 'Your Name'} {user?.lastName || ''} </h2>
                <p className="text-xs text-gray-500">{user?.email || 'N/A'}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
              {/* <div className="flex items-start gap-2.5">
                <FiBriefcase className="w-4 h-4 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Workspace</p>
                  <p className="text-xs font-semibold text-gray-800">
                    Maya Finance Studio
                  </p>
                </div>
              </div> */}

              <div className="flex items-start gap-2.5">
                <FiCalendar className="w-4 h-4 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Member since</p>
                  <p className="text-xs font-semibold text-gray-800">
                    {user?.created_at || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
  )
}

export default PersonalInfo