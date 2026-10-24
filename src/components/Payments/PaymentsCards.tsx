/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  Check, 
} from 'lucide-react';
import { PLANS } from './Data';
import { motion } from 'framer-motion';
import { ButtonComp } from '../UI/ButtonComp';

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  }
};

type PlanId = (typeof PLANS)[number]['id'];

type PaymentsCardsProps = {
  selectedPlanId: PlanId | null | undefined;
  setSelectedPlanId: (planId: PlanId) => void;
};

export default function PaymentsCards({ selectedPlanId, setSelectedPlanId }: PaymentsCardsProps) {
   
    //  const {selectedPlanId, setSelectedPlanId } = useHandlePayment()
  return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
          {PLANS.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlanId === plan.id;
            const isPopular = plan.isPopular;

            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                  isPopular 
                    ? 'bg-white shadow-2xl ring-2 ring-amber-400/80' 
                    : isSelected 
                    ? 'bg-white shadow-xl ring-2 ring-indigo-500' 
                    : 'bg-white/95 backdrop-blur-md shadow-lg border border-white/40 hover:bg-white'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E29D48] text-white text-[10px] sm:text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm z-20">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200/60">
                      <Icon className="w-5 h-5 text-slate-800" />
                    </div>

                    {plan.badge && !isPopular && (
                      <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full border border-slate-200/60">
                        {plan.badge}
                      </span>
                    )}

                    {plan.discountBadge && (
                      <span className="bg-[#FED7AA] text-[#9A3412] text-xs font-bold px-2.5 py-1 rounded-full">
                        {plan.discountBadge}
                      </span>
                    )}
                  </div>

                  {/* Plan Name & Duration */}
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    {plan.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-medium mb-5">
                    {plan.duration}
                  </p>

                  {/* Pricing */}
                  <div className="mb-6 pb-6 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                        ${plan.price}
                      </span>
                    </div>
                    <span className="text-slate-500 text-xs font-semibold mt-1 block">
                      {plan.monthlyEquivalent}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-slate-800 shrink-0" />
                        <span>{feat.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Button */}
                 <ButtonComp name= {isSelected ? `Select ${plan.title}` : `Choose ${plan.title}`}
                  icon=""
                  fnc={() => setSelectedPlanId(plan.id)}
                   className={`w-full py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                    isSelected
                      ? '!bg-[#3F33D1] !text-white shadow-md shadow-indigo-900/20 hover:bg-[#3730A3]'
                      : '!bg-white border border-slate-200/80 !text-slate-800 hover:bg-slate-50'
                  }`}
                  />
              </motion.div>
            );
          })}
        </div>
      
  );
}