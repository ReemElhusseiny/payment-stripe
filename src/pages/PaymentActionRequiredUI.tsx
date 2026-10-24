import React from 'react';
import { HiOutlineExclamationCircle, HiArrowRight } from 'react-icons/hi';
import { ButtonComp } from '../components/UI/ButtonComp';
import { useNavigate } from 'react-router-dom';

interface PaymentVerificationProps {
  message?: string;
}

export const PaymentActionRequiredUI: React.FC<PaymentVerificationProps> = ({
  message = "Your bank requires additional verification to complete this payment.",
}) => {
    const onRetry = () => window.location.reload

     const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex items-center justify-center p-4 selection:bg-amber-50 selection:text-amber-900">
      {/* Card Container */}
      <div className="w-full max-w-sm bg-white rounded-2xl p-7 shadow-sm border border-slate-100 flex flex-col items-center text-center">
        
        {/* Warning Icon Badge */}
        <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4">
          <HiOutlineExclamationCircle className="w-6 h-6 text-amber-500" />
        </div>

        {/* Small Tag */}
        <span className="text-xs font-semibold text-amber-600 mb-1">
          Action Required
        </span>

        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
          Payment Verification Required
        </h2>

        {/* Description */}
        <p className="text-xs leading-relaxed text-slate-500 mb-6 max-w-[280px]">
          {message}
        </p>

        {/* Actions */}
        <div className="w-full flex flex-col gap-2.5">
          {/* Primary Button */}
             <ButtonComp
                            icon={ <HiArrowRight className="w-3.5 h-3.5" />}
                            name="Check Payment Again"
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

export default PaymentActionRequiredUI;