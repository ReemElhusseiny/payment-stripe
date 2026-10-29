
'use client'
import React from 'react';
import { HiCheckCircle, HiArrowRight } from 'react-icons/hi';
import { useNavigate } from "react-router-dom";
import { ButtonComp } from "../components/UI/ButtonComp";
import { PLANS } from '../components/Payments/Data';
import useUserStore from '../Store/AuthStore';

interface PaymentSuccessProps {
  selectedPlan?: string;
}

export const PaymentSuccessUI: React.FC<PaymentSuccessProps> = ({
   selectedPlan,

}) => {
  const navigate = useNavigate();
  console.log('getPlanSuccesSucces', selectedPlan);
  const getPlanSucces = PLANS?.find((item) => item.id === String(selectedPlan))
  console.log('getPlanSuccesSuccess', getPlanSucces);

  const { refreshUser } = useUserStore();

const handleGoToDashboard = async () => {
   await refreshUser();
   navigate('/dashboard')
}
const handleGoToInvoices = async () => {
   await refreshUser();
   navigate('/profile')
}

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex items-center justify-center p-4">
      {/* Card Container */}
      <div className="w-full max-w-sm bg-white rounded-2xl p-7 shadow-sm border border-slate-100 flex flex-col items-center text-center">
        
        {/* Checkmark Badge */}
        <div className="w-12 h-12 bg-[#EEF2FF] rounded-full flex items-center justify-center mb-4">
          <HiCheckCircle className="w-6 h-6 text-[#4F46E5]" />
        </div>

        {/* Small Tag */}
        <span className="text-xs font-semibold text-[#4F46E5] mb-1">
          Payment confirmed
        </span>

        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
          Your subscription is active
        </h2>

        {/* Description */}
        <p className="text-xs leading-relaxed text-slate-500 mb-6 max-w-[280px]">
          Your LedgerFlow {getPlanSucces?.title} is ready. A receipt has been added to your invoices.
        </p>

        {/* Plan Details Box */}
        <div className="w-full bg-[#F8FAFC] rounded-xl p-4 border border-slate-100 text-left mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-slate-900">{getPlanSucces?.title}</p>
              <p className="text-[11px] font-normal text-slate-400 mt-0.5">
                {getPlanSucces?.title === "Monthly"
  ? "Next renewal in 1 month"
  : getPlanSucces?.title === "Semi-Annual"
    ? "Next renewal in 6 months"
    : getPlanSucces?.title === "Annual"
      ? "Next renewal in 1 year"
      : "N/A"}
              </p>
            </div>
            
            {/* Active Pill */}
            <span className="px-2.5 py-0.5 bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-semibold rounded-full">
              Active
            </span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200/60">
            <span className="text-xs font-normal text-slate-500">Amount paid</span>
            <span className="text-sm font-bold text-slate-900">{getPlanSucces?.price}</span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2.5">
          <ButtonComp
            name="Go to dashboard"
            icon={<HiArrowRight className="w-3.5 h-3.5" />}
            fnc={handleGoToDashboard}
            className="w-full py-2.5 px-4 !bg-[#3F33D1] hover:!bg-[#3730A3] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm shadow-indigo-500/10"
          />
         
          <ButtonComp
           icon=""
           name=" View invoices"
            fnc={handleGoToInvoices}
            className="w-full py-2.5 px-4 !bg-white hover:!bg-slate-50 !text-slate-700 text-xs font-semibold rounded-xl !border !border-slate-200 transition-colors cursor-pointer"
         />
           
        
        </div>

      </div>
    </div>
  );
};

export default PaymentSuccessUI;