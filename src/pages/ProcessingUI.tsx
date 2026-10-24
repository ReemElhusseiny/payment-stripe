import React from 'react';
import { HiOutlineShieldCheck, HiLockClosed } from 'react-icons/hi';
// import { CgSpinner } from 'react-icons/cg';
// import { Loader2 } from 'lucide-react';
// import { CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { PLANS } from '../components/Payments/Data';

interface PaymentProcessingProps {
  planName?: string;
  price?: string;
  userName?: string;
  statusText?: string;
   selectedPlan?: string;
}

export const ProcessingUI: React.FC<PaymentProcessingProps> = ({
 selectedPlan,
  statusText = 'Verifying payment details',
}) => {
  const SPOKES = 12;
const DURATION = 1.2;

const spokes = Array.from({ length: SPOKES }, (_, i) => ({
  rotate: (360 / SPOKES) * i,
  delay: (DURATION / SPOKES) * i,
}));
console.log('selectedPlanProcessing', selectedPlan);
const getPlan = PLANS?.find((item) => item.id === String(selectedPlan))
console.log('getPlanProcessing', getPlan);
  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex items-center justify-center p-4">
      {/* Card Container */}
      <div className="w-full max-w-sm bg-white rounded-2xl p-7 shadow-sm border border-slate-100/80 flex flex-col items-center text-center">
        {/* Shield Icon Badge */}
        <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center mb-4">
          <HiOutlineShieldCheck className="w-5 h-5 text-[#4F46E5]" />
        </div>

        {/* Small Tag */}
        <span className="text-xs font-medium text-[#4F46E5] mb-1">
          LedgerFlow billing
        </span>

        {/* Main Heading */}
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
          Processing your payment
        </h2>

        {/* Description */}
        <p className="text-xs leading-relaxed text-slate-500 mb-6 max-w-[260px]">
          We&apos;re securely confirming your {getPlan?.title?.toLowerCase()}.
          Please keep this page open.
        </p>

        {/* Plan Details Box (Without Linear Bar) */}
        <div className="w-full bg-[#F8FAFC] rounded-xl p-4 border border-slate-100 text-left mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-bold text-slate-900">{getPlan?.title}</p>
              <p className="text-[11px] font-normal text-slate-400 mt-0.5">
                LedgerFlow subscription
              </p>
            </div>
            <span className="text-sm font-bold text-slate-900">{getPlan?.price}</span>
          </div>

          {/* Status with Spinner Icon */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
            <div className="relative h-6 w-6" role="status" aria-label="loading">
      {spokes.map(({ rotate, delay }) => (
        <div
          key={rotate}
          className="absolute left-1/2 top-0 h-full w-[8%]"
          style={{ transform: `translateX(-50%) rotate(${rotate}deg)` }}
        >
          <motion.div
            className="h-[28%] w-full rounded-full bg-indigo-500"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [1, 0.15] }}
            transition={{
              duration: DURATION,
              ease: "linear",
              repeat: Infinity,
              delay,
            }}
          />
        </div>
      ))}
    </div>
       
            <span className="text-[11px] font-medium text-slate-500">
              {statusText}
            </span>
          </div>
        </div>

        {/* Footer Security Badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-400">
          <HiLockClosed className="w-3.5 h-3.5 text-slate-400" />
          <span>Payments are encrypted and secure</span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingUI;
