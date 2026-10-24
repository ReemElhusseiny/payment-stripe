import { AnimatePresence, motion } from 'framer-motion';
import ModalComp from '../components/UI/ModalComp';
import { MdOutlinePersonOutline } from 'react-icons/md';
import CheckoutForm  from "./CustomPaymentForm";
import {
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useUserStore from "../Store/AuthStore";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import PaymentsCards from '../components/Payments/PaymentsCards';
import useHandlePayment from '../CustomHooks/HandlePayment';
import Features from '../components/Payments/Features';
import { IoLogOutOutline } from "react-icons/io5";
import { ButtonComp } from '../components/UI/ButtonComp';


const stripePromise = loadStripe('pk_test_51Npe9fLzpaVNOCuhmeZjTZDcHnbarWSOQ6oFji3uPd7lqEekKZLyC1ogV3azMLiphK4kt8xmyfCRBtoiLXe0Q4Da00ambecXRK');


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  }
};


const BulkUpdateSx = {
  width: {
    xs: '95%',
    lg: '100%',
  },
  maxWidth: 960,
  maxHeight: {
    xs: 780,
    lg: 900,
  },
  borderRadius: '28px',
  boxShadow: 24,
};

function Payment() {
   const { logout } = useUserStore();
    const navigate = useNavigate();
    const {selectedPlan, selectedPlanId, setSelectedPlanId, isPreparing, checkoutData, handlePayment } = useHandlePayment()
  return (
      <div className="w-full h-full bg-[#F8FAFC] font-sans text-slate-800 p-4 sm:p-6 md:p-[10px] flex flex-col items-center relative">
    <div className="w-full flex justify-end">
     <div className="flex gap-3 rounded-2xl bg-white p-2 shadow-sm border border-gray-100 mb-2">
      <p onClick={() => navigate("/profile")} className="flex items-center gap-2 rounded-xl bg-[#EEF0FE] py-1.5 px-3 transition hover:bg-[#E2E5FD]">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3F33D1] text-white">
          <MdOutlinePersonOutline size="18px" />
        </div>
        <span className="text-sm font-bold text-gray-900">Profile</span>
      </p>
  
      {/* Divider */}
      <div className="h-5 w-[1px] bg-gray-200" />

      {/* Logout */}
          <ButtonComp   sx={{
    transition: "none",
    "&:hover": {
      boxShadow: "none",
      transform: "none",
      backgroundColor: "transparent",
    },
  }} icon={   < IoLogOutOutline size="18px" />} name="Logout" fnc={async() => await logout()} className=" !bg-transparent flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm !font-bold !text-gray-900 hover:!bg-gray-100" />
    </div>
    </div>

      <motion.div 
        className="w-full max-w-5xl mx-auto flex flex-col gap-5 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {}
        {/* Pricing Tag */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-white/20 text-xs font-bold tracking-widest text-[#3F33D1] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#3F33D1]" />
            <span>PRICING</span>
            <Sparkles className="w-3.5 h-3.5 text-[#3F33D1]" />
          </div>
        </motion.div>

        {/* Title & Description */}
        <motion.h1 
          variants={itemVariants} 
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black-400 text-center tracking-tight"
        >
          The Best Pricing Plans
        </motion.h1>

        <motion.p 
          variants={itemVariants} 
          className="text-gray/80 text-center max-w-xl text-sm sm:text-base leading-relaxed px-2"
        >
          Find the perfect plan to streamline your content creation workflow and unlock powerful tools designed to save time and boost productivity.
        </motion.p>
<Features />
        <PaymentsCards selectedPlanId={selectedPlanId} setSelectedPlanId={setSelectedPlanId} />
  <motion.div variants={itemVariants} className="w-full max-w-lg flex flex-col items-center">
          
          <AnimatePresence mode="wait">
           

              <ModalComp
       key="checkout"
       label="Checkout Form"
       renderTitle={({ handleOpen }: { handleOpen: () => void }) => {
        console.log("RenderTitle is working!");
        return(
         <div className="bg-white py-2 px-3 w-full rounded-2xl shadow-xl">
        <motion.button
              onClick={() => handlePayment(handleOpen)}
          disabled={isPreparing}
              key={selectedPlan?.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full bg-[#3F33D1] text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:bg-[#3730A3] active:scale-[0.99] transition-all flex items-center justify-center gap-3 border border-white/20"
            >
              <span className="text-sm sm:text-base">
               {isPreparing
            ? "Preparing..."
            :  `Continue with ${selectedPlan?.title}` }
              </span>
              <span className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full font-semibold">
                ${selectedPlan.price}
              </span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
              </div>
        )
       }}
       sx={BulkUpdateSx}
       children={ checkoutData && (
        <Elements
      key={checkoutData.clientSecret}
      stripe={stripePromise}
      options={{
        clientSecret: checkoutData.clientSecret,
      }}
    >
      <CheckoutForm
        clientSecret={checkoutData.clientSecret}
        subscriptionId={checkoutData.subscriptionId}
        selectedPlan={selectedPlan}
      />
    </Elements>)}
      
     />
          
          </AnimatePresence>
        </motion.div>

      </motion.div>
      </div>

        

  )
}

export default Payment