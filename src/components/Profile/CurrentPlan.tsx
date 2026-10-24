import React from 'react'
import { useUserStore } from "../../Store/AuthStore";
import Manage from './Manage';

function CurrentPlan() {
     const {
            user
          } = useUserStore();
          console.log('uers##', user)
function getSubscriptionPlanInfo(startAt?: string | null, endAt?: string | null) {
  if (!startAt || !endAt) {
    return { title: "No Active Plan", period: "N/A" };
  }

  const start = new Date(startAt);
  const end = new Date(endAt);
  const diffInDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  const months = Math.round(diffInDays / 30);

  if (months >= 11) {
    return { title: "Yearly", period: "1 Year" };
  } else if (months >= 5) {
    return { title: "Semi-Annual", period: "6 Months" };
  } else if (months >= 1) {
    return { title: "Monthly", period: "1 Month" };
  } else {
    return { title: "Custom", period: `${diffInDays} Days` };
  }
}
const { title, period } = getSubscriptionPlanInfo(user?.start_at, user?.end_at);
  return (
    <div className="lg:col-span-8 bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-6 border border-gray-100">
  <div>
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
        CURRENT PLAN
      </span>
      <span className="inline-flex items-center gap-1.5 bg-[#EEF2FF] text-[#1E1B4B] text-xs font-semibold px-3 py-1 rounded-full">
        <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
        {user?.status || 'Not Active'}
      </span>
    </div>

    <h2 className="text-2xl font-bold text-gray-900 mt-2">
      {title || 'Semi-Annual'}
    </h2>
    <p className="text-xs text-gray-500 mt-1">
      Full access to Excel Auto-Split, Merge & Edit, and Financial Reports.
    </p>
  </div>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#EEF2FF]/60 rounded-xl p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-700">
                      Start Date
                    </p>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                     {user?.start_at || 'N/A'}
                    </p>
                  </div>
    
                  <div className="bg-[#EEF2FF]/60 rounded-xl p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-700">
                      End Date
                    </p>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      {user?.end_at || 'N/A'}
                    </p>
                  </div>
    
                  <div className="bg-[#EEF2FF]/60 rounded-xl p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-700">
                      BILLING PERIOD
                    </p>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                     {period}
                    </p>
                  </div>
                </div>
  <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h4 className="text-sm font-bold text-gray-900">Subscription controls</h4>
      <p className="text-xs text-gray-500 mt-0.5">
        Pause billing temporarily or cancel your plan at any time.
      </p>
    </div>

<Manage />
  </div>
</div>
  )
}

export default CurrentPlan