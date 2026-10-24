import React from 'react';
import { VscError } from 'react-icons/vsc';
import { HiArrowRight } from 'react-icons/hi';
import { ButtonComp } from '../components/UI/ButtonComp';
import { useNavigate } from 'react-router-dom';

interface PaymentFailedProps {
  message?: string;
}

export const PaymentFailedUI: React.FC<PaymentFailedProps> = ({
  message = "We couldn't complete your payment. Please try again or use another payment method.",
}) => {
  const onRetry = () => window.location.reload

     const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex items-center justify-center p-4 selection:bg-indigo-50 selection:text-indigo-900">
      {/* Card Container */}
      <div className="w-full max-w-sm bg-white rounded-2xl p-7 shadow-sm border border-slate-100 flex flex-col items-center text-center">
        
        {/* Error Icon Badge */}
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <VscError className="w-6 h-6 text-red-500" />
        </div>

        {/* Small Tag */}
        <span className="text-xs font-semibold text-red-500 mb-1">
          Payment Status
        </span>

        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
          Payment Failed
        </h2>

        {/* Description */}
        <p className="text-xs leading-relaxed text-slate-500 mb-6 max-w-[280px]">
          {message}
        </p>

        {/* Actions */}
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

export default PaymentFailedUI;