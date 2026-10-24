/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/static-components */
import { useState, useEffect } from 'react'
// import { useTheme } from '@mui/material/styles';
import { ArrowRightIcon, UserRoundKey } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Login from '../components/Login'
import Register from '../components/Register'
import { useLocation } from 'react-router-dom'

function AuthContainer() {
  type FormType = 0 | 1
  const location = useLocation()
  const [formType, setFormType] = useState<FormType>(location.pathname === '/register' ? 1 : 0)
useEffect(() => {
  setFormType(location.pathname === '/register' ? 1 : 0);
}, [location.pathname]);
  return (
    <div className="bg-[#F8FAFC] w-ful h-full flex justify-center items-center">
    <div className="rounded-xl shadow-lg w-[90%] h-[90%] flex justify-between bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-700 pl-[10px] pr-[10px]">
        <div className="hidden lg:block flex-1 text-white relative">
             <div className="absolute top-[10%] left-[10%] flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30">
              <div className="w-4 h-4 bg-white rounded-sm" />
            </div>
            <span className="text-xl font-bold tracking-tight">LedgerFlow</span>
          </div>

            <div className="w-full h-full text-white flex flex-col justify-center items-center">
        

          <motion.div
         initial={{ x: "-120%" }}
  animate={{ x: 0 }}
  transition={{
    duration: 0.7,
    ease: "easeOut" 
  }}
           className="flex flex-col gap-[20px]">
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              Streamline Your <br />
              <span className="text-[#b3b9fa]">Accounting</span>
            </h1>

            <p className="text-white/80 text-sm lg:text-base leading-relaxed max-w-md">
              Professional subscription-only tools for precise financial management. 
              No Free Trial, only enterprise-grade performance designed for firms and serious financial professionals.
            </p>

            {/* Feature Bullet Points */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-[30px] h-[30px] rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                  <ArrowRightIcon className="w-5 h-5 text-[#b3b9fa]" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Precise Financial Auditing</h4>
                  <p className="text-xs text-white/70">Real-time tracking of every cent with immutable ledgers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-[30px] h-[30px] rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                  <ArrowRightIcon className="w-5 h-5 text-[#b3b9fa]" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Enterprise Scalability</h4>
                  <p className="text-xs text-white/70">Engineered to handle complex multi-entity subscriptions.</p>
                </div>
              </div>
            </div>
          </motion.div>


        </div>
          <div className="absolute bottom-[5%] left-[10%] text-xs text-white/60">
            © 2026 LedgerFlow Inc. All rights reserved.
          </div>
        </div>

        <div className="relative flex-1 flex justify-center items-center box-border overflow-hidden">
        <AnimatePresence mode="wait">
    {formType === 0 ? (
      <motion.div
        key="login-form"
        initial={{ y: "100%", opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}     
        exit={{ y: "-100%", opacity: 0 }}  
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-full max-w-[550px] h-full rounded-t-3xl bg-white box-border absolute bottom-[-40px] p-5"
      >
          <div className="text-center flex flex-col items-center justify-center  mt-[20px] md:mt-[40px]">
            <div className="w-[80px] h-[80px] rounded-full border border-gray-300 flex justify-center items-center mb-[10px]">
  <UserRoundKey className="w-[50px] h-[50px] text-[#3F33D1]" />
  </div>
  <h2 className="text-2xl font-bold text-gray-900 tracking-wide uppercase">Sign In</h2>
  <p className="text-xs text-gray-400 mt-1">Access your enterprise financial dashboard</p>
</div>
<Login setFormType={(nextFormType) => setFormType(nextFormType === 0 ? 0 : 1)} />
            </motion.div>
          ) :   (
            <motion.div 
            //  key={formType}
         key="register-form"
        initial={{ y: "100%", opacity: 0 }}     
        animate={{ y: 0, opacity: 1 }}          
        exit={{ y: "-100%", opacity: 0 }}       
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-full max-w-[550px] h-full rounded-t-3xl bg-white box-border absolute bottom-[-40px] p-5">
          <div className="text-center flex flex-col items-center justify-center mb-5 mt-[20px] md:mt-[20px]">
            <div className="w-[80px] h-[80px] rounded-full border border-gray-300 flex justify-center items-center mb-[10px] md:mb-[20px]">
  <UserRoundKey className="w-[50px] h-[50px] text-[#3F33D1]" />
  </div>
  <h2 className="text-2xl font-bold text-gray-900 tracking-wide uppercase">Sign Up</h2>
  <p className="text-xs text-gray-400 mt-1">Access your enterprise financial dashboard</p>
</div>
          <Register setFormType={(nextFormType) => setFormType(nextFormType === 0 ? 0 : 1)} />
            </motion.div>
          )}
          </AnimatePresence>
        </div>
    </div>
    </div>
  )
}
export default AuthContainer