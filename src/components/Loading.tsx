// import { motion } from 'framer-motion';
// import { useTheme } from '@mui/material/styles';

// export function Loading() {
//   const theme = useTheme();
//   const letters = "Loading...".split("");
//   return (
//     <div style={{ display: "flex", flexDirection: 'column', gap: '50px', alignItems: "center", height: "100%", width: "100%", overflow: 'hidden'}}>
// <motion.div
//         animate={{
//           rotate: [-30, 30, -30],
//         }}
//         transition={{
//           repeat: Infinity,
//           duration: 3,
//           ease: "easeInOut",
//         }}
//         style={{ originX: 0.5, originY: 0 }}
//         className="relative flex flex-col items-center"
//       >
//         <div className="w-[2px] h-[300px]" style={{background: theme?.colors?.primary}} />

//          <div className="relative z-10 w-[70px] h-[70px] rounded-full flex items-center justify-center shadow-md" style={{background: theme.colors?.primary}}>
//   <img 
//     src="/earning.png" 
//     alt="Logo" 
//     className="h-[40px] w-[40px] object-contain"
//   />
// </div>
//       </motion.div>
//       <div className="flex">
//   {letters?.map((letter, index) => (
//     <motion.span
//       key={index}
//       animate={{
//         y: [0, -20, 0],
//         backgroundPosition: ["0% 50%", "200% 50%"],
//       }}
//       transition={{
//         y: {
//           duration: 1,
//           repeat: Infinity,
//           delay: index * 0.1,
//           ease: "easeInOut",
//         },
//         backgroundPosition: {
//           duration: 3,
//           repeat: Infinity,
//           ease: "linear",
//         },
//       }}
//       style={{
//         backgroundImage: `linear-gradient(90deg, #6b7280 0%, ${theme?.colors?.primary || '#22c55e'} 50%, #6b7280 100%)`,
//           // "linear-gradient(90deg, #6b7280 0%, ${theme.colors?.primary} 50%, #6b7280 100%)",
//         backgroundSize: "200% auto",
//         WebkitBackgroundClip: "text",
//         WebkitTextFillColor: "transparent",
//         backgroundClip: "text",
//         display: "inline-block",
//       }}
//       className="text-5xl md:text-7xl font-extrabold"
//     >
//       {letter === " " ? "\u00A0" : letter}
//     </motion.span>
//   ))}
// </div>

//         </div>
//   );
// }
import React from 'react';
import { RiBankLine } from 'react-icons/ri'; // أو أيقونة مائية/بنكية مشابهة

export const Loading: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="flex flex-col items-center text-center max-w-sm w-full animate-fade-in">
        {/* Icon Container */}
        <div className="w-16 h-16 bg-[#4F46E5] rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-5">
          <RiBankLine className="w-8 h-8 text-white" />
        </div>

        {/* Brand Name */}
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1.5">
          LedgerFlow
        </h1>

        {/* Subtitle */}
        <p className="text-sm font-normal text-slate-500 mb-8">
          Preparing your financial workspace
        </p>

        {/* Animated Loading Dots */}
        <div className="flex items-center justify-center gap-2 mb-6 mt-5">
          <span className="w-2.5 h-2.5 bg-[#4F46E5] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2.5 h-2.5 bg-[#4F46E5] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2.5 h-2.5 bg-[#4F46E5] rounded-full animate-bounce"></span>
        </div>

        {/* Status Message */}
        <p className="text-xs font-medium text-slate-400">
          Syncing workbooks and balances...
        </p>
      </div>
    </div>
  );
};

export default Loading;