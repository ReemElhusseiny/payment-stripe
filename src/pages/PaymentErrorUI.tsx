
import React from 'react';
import { VscError } from 'react-icons/vsc';
import { HiArrowRight } from 'react-icons/hi';
import { ButtonComp } from '../components/UI/ButtonComp';
import { useNavigate } from 'react-router-dom';

interface SomethingWentWrongProps {
  message?: string;
  technicalDetails?: {
    code?: string;
    requestId?: string;
  };
}

export const PaymentErrorUI: React.FC<SomethingWentWrongProps> = ({
  message = 'There was a problem processing your request. Our team has been notified.',
  technicalDetails = {
    code: '503 Service Unavailable',
    requestId: 'AB-12345678-CD',
  },
 
}) => {
   const onRetry = () => window.location.reload();
   const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex items-center justify-center p-4 selection:bg-indigo-50 selection:text-indigo-900">
      {/* Card Container */}
      <div className="w-full max-w-sm bg-white rounded-2xl p-7 shadow-sm border border-slate-100/80 flex flex-col items-center text-center">
        
        {/* Error Icon Badge */}
        <div className="w-12 h-12 bg-[#EEF2FF] rounded-full flex items-center justify-center mb-4">
          <VscError className="w-6 h-6 text-[#6366F1]" />
        </div>

        {/* Small Tag */}
        <span className="text-xs font-semibold text-[#6366F1] mb-1">
          System Error
        </span>

        {/* Main Title */}
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
          Something went wrong
        </h2>

        {/* Description Text */}
        <div className="text-xs leading-relaxed text-slate-500 mb-6 max-w-[280px] space-y-3">
          <p>{message}</p>
          <p className="font-normal">
            Error: We encountered an issue connecting to your accounting software. Please try again or contact support.
          </p>
        </div>

        {/* Technical Details Box */}
        <div className="w-full bg-[#F8FAFC] rounded-xl p-4 border border-slate-100 text-left mb-6">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <p className="text-xs font-bold text-slate-900">Technical Details</p>
              <p className="text-[11px] font-normal text-slate-400 mt-0.5">
                Code: {technicalDetails.code}
              </p>
            </div>
            
            {/* Failed Pill */}
            <span className="px-2.5 py-0.5 bg-red-50 text-red-600 text-[10px] font-semibold rounded-full">
              Failed
            </span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200/60">
            <span className="text-[11px] font-normal text-slate-400">Request ID</span>
            <span className="text-[11px] font-medium text-slate-600 font-mono tracking-tight">
              {technicalDetails.requestId}
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2.5">
          <ButtonComp
           icon={ <HiArrowRight className="w-3.5 h-3.5" />}
           name="Try Again"
            fnc={onRetry}
            className="w-full py-2.5 px-4 !bg-[#3F33D1] hover:!bg-[#3730A3] !text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm shadow-indigo-500/10"
          />

          <ButtonComp
            icon=""
            name="Go to payment page"
            fnc={() => navigate('/payments')}
            className="w-full py-2.5 px-4 !bg-white hover:!bg-slate-50 !text-slate-700 text-xs font-semibold rounded-xl !border !border-slate-200 transition-colors cursor-pointer"
          />
          
        </div>

      </div>
    </div>
  );
};

export default PaymentErrorUI;