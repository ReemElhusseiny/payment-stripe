import { FEATURE_PILLS } from './Data';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  }
};

function Features() {
  return (

         <motion.div 
          variants={itemVariants} 
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3  w-full"
        >
          {FEATURE_PILLS.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <div 
                key={idx}
                className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-white/20 text-xs sm:text-sm font-semibold text-slate-800"
              >
                <Icon className="w-4 h-4 text-slate-600" />
                <span>{pill.label}</span>
              </div>
            );
          })}
        </motion.div>
  )
}

export default Features