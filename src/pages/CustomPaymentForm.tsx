/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  ExpressCheckoutElement,
} from "@stripe/react-stripe-js";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CreditCard, Edit2, Grid, QrCode, Receipt, Smartphone, Wifi, X } from "lucide-react";
import {  useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


type SelectedPlan = {
  title?: string;
  price?: string | number;
  id?: string;
};

type CheckoutFormProps = {
  clientSecret: string;
  subscriptionId?: string;
  selectedPlan: SelectedPlan;
};

export default function CheckoutForm({
  clientSecret,
  subscriptionId,
  selectedPlan,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();


  const [paymentMethod, setPaymentMethod] = useState<"card" | "cashapp">("card");
  const [loading, setLoading] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [expressError, setExpressError] = useState<string | null>(null);
  const [cardHolderName, setCardHolderName] = useState("Jonathan Michael");
  const [last4, setLast4] = useState("3456");


  const elementOptions = {
    style: {
      base: {
        fontSize: "15px",
        color: "#1e293b",
        fontWeight: "600",
        fontFamily: "Inter, sans-serif",
        "::placeholder": { color: "#cbd5e1" },
      },
      invalid: { color: "#ef4444" },
    },
  };

  const handleExpressConfirm = async () => {
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: { return_url: `${window.location.origin}/success` },
      redirect: "if_required",
    });

    if (error) {
      setExpressError(error.message || "حدث خطأ أثناء معالجة الدفع السريع");
    } else {
      navigate(`/payment-processing?subscription_id=${subscriptionId}`, {state: {planId: selectedPlan?.id}});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "cashapp") {
      setShowQrModal(true);
      return;
    }

    if (!stripe || !elements) return;
    setLoading(true);

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardNumberElement,
          billing_details: { name: cardHolderName },
        },
      }
    );
    console.log('paymentIntent', paymentIntent )
    setLoading(false);

    if (error) {
      alert(error.message || "Payment Failed");
    } else if (paymentIntent?.status === "succeeded") {
    // بدل navigate("/success")
    navigate(`/payment-processing?subscription_id=${subscriptionId}`, {state: {planId: selectedPlan?.id}});
  }
  };

  return (
    <div className="w-full h-full flex items-center justify-center font-sans">
      <div className="w-full h-full bg-white overflow-hidden relative flex flex-col lg:flex-row">

        <div className="flex-1 p-8 sm:p-10">
          {/* Header & Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#4338CA] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-800 text-lg tracking-tight">
                AceCoin<span className="font-normal text-slate-500">Pay</span>
              </span>
            </div>

          </div>

          {/* Express Checkout */}
          <div className="mb-6">
            <ExpressCheckoutElement
              options={{
                buttonHeight: 40,
                buttonTheme: { applePay: "black" },
                layout: { maxColumns: 2, maxRows: 1 },
                wallets: { applePay: "always", googlePay: "never" },
              }}
              onConfirm={handleExpressConfirm}
            />
            {expressError && (
              <p className="text-xs text-red-500 mt-1 text-center">{expressError}</p>
            )}
          </div>

          {/* Payment Method Tabs */}
          <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-100/80 p-1.5 rounded-2xl">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
                paymentMethod === "card"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Card Payment
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("cashapp")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
                paymentMethod === "cashapp"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <div className="w-4 h-4 bg-[#00D66C] rounded-full flex items-center justify-center text-white font-black text-[10px]">
                $
              </div>
              Cash App Pay
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {paymentMethod === "card" ? (
              <>
                {/* Card Number */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Card Number
                    </label>
                    <button
                      type="button"
                      className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Enter the 16-digit card number on the card
                  </p>

                  <div className="relative border border-slate-200 rounded-xl p-3 bg-slate-50/50 flex items-center justify-between focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex items-center shrink-0">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-amber-500 rounded-full -ml-1"></span>
                      </div>
                      <div className="w-full">
                        <CardNumberElement
                          options={elementOptions}
                          onChange={(e) => {
                            if (e.complete) setLast4("3456");
                          }}
                        />
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 ml-2" />
                  </div>
                </div>

                {/* CVV & Expiry Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      CVV Number
                    </label>
                    <p className="text-[11px] text-slate-400 mb-2">
                      Enter the 3 or 4 digit number
                    </p>
                    <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 flex items-center justify-between focus-within:bg-white focus-within:border-blue-500 transition-all">
                      <div className="w-full">
                        <CardCvcElement options={elementOptions} />
                      </div>
                      <Grid className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Expiry Date
                    </label>
                    <p className="text-[11px] text-slate-400 mb-2">
                      Enter the expiration date
                    </p>
                    <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 flex items-center justify-between focus-within:bg-white focus-within:border-blue-500 transition-all">
                      <div className="w-full">
                        <CardExpiryElement options={elementOptions} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Cardholder Name
                  </label>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Enter full name as printed on card
                  </p>
                  <input
                    type="text"
                    value={cardHolderName}
                    onChange={(e) => setCardHolderName(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm font-semibold text-slate-800 bg-slate-50/50 outline-none focus:bg-white focus:border-blue-500 transition-all"
                  />
                </div>
              </>
            ) : (
              <div className="py-6 flex flex-col items-center justify-center text-center bg-slate-50 rounded-2xl border border-slate-200/80 p-6">
                <Smartphone className="w-10 h-10 text-emerald-500 mb-3" />
                <h4 className="text-sm font-bold text-slate-800">Cash App Pay</h4>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Click below to generate a QR code for scanning via your Cash App mobile application.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#4338CA] hover:bg-[#3730A3] active:scale-[0.99] text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all text-sm mt-4 cursor-pointer"
            >
              {loading
                ? "Processing..."
                : paymentMethod === "cashapp"
                ? "Reveal QR Code"
                : "Pay Now"}
            </button>
          </form>
        </div>

        {/* Right Side: Virtual Credit Card & Receipt Summary */}
        <div className="w-full lg:w-[360px] bg-slate-50/80 border-t lg:border-t-0 lg:border-l border-slate-100 p-8 flex flex-col justify-between relative">
          
          <div className="w-12 h-1.5 bg-blue-600 rounded-full mx-auto mb-6"></div>

          {/* EXACT MATCH VIRTUAL CREDIT CARD */}
          <div className="relative mb-8 flex justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-[260px] aspect-[1/1.4] bg-white rounded-3xl p-6 shadow-2xl shadow-slate-300/70 border border-slate-100/80 relative overflow-hidden flex flex-col justify-between text-slate-800"
            >
              {/* Background Vector Graphic Lines */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <svg className="w-full h-full" viewBox="0 0 200 280" fill="none">
                  <path
                    d="M-20 80 C 40 120, 100 60, 220 100"
                    stroke="#e2e8f0"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M-20 110 C 60 160, 120 90, 220 140"
                    stroke="#e2e8f0"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M-20 140 C 80 200, 140 120, 220 180"
                    stroke="#e2e8f0"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              {/* Card Top Row: Chip & Contactless Icon */}
              <div className="flex items-center justify-between z-10">
                {/* Microchip */}
                <div className="w-9 h-7 bg-slate-200/90 rounded-md border border-slate-300/80 p-0.5 flex flex-col justify-between">
                  <div className="w-full h-[1px] bg-slate-300"></div>
                  <div className="w-full h-[1px] bg-slate-300"></div>
                </div>

                {/* Contactless Wifi Icon */}
                <Wifi className="w-5 h-5 text-slate-700 rotate-90" />
              </div>

              {/* Card Middle Info: Name & Masked Number */}
              <div className="z-10 mt-8 space-y-1">
                <p className="text-[13px] font-bold tracking-tight text-slate-900">
                  {cardHolderName}
                </p>
                <div className="flex items-center gap-2 font-mono font-bold text-sm text-slate-800">
                  <span className="text-[10px] tracking-widest text-slate-900">••••</span>
                  <span>{last4}</span>
                </div>
              </div>

              {/* Card Bottom Row: Expiry Date & Mastercard Logo */}
              <div className="flex items-end justify-between z-10 mt-auto pt-4">
                <span className="text-[12px] font-bold text-slate-800">
                  09/22
                </span>

                {/* Mastercard Logo */}
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#EB001B]"></div>
                  <div className="w-6 h-6 rounded-full bg-[#F79E1B] -ml-2.5 opacity-90"></div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-3 text-xs font-medium text-slate-500 mb-6">


            <div className="flex justify-between">
              <span>Subscribtion Name</span>
              <span className="font-bold text-slate-800">{selectedPlan.title}</span>
            </div>

          </div>
          <div className="pt-4 border-t border-dashed border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-400 font-medium">You have to Pay</p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl font-extrabold text-slate-900">
                  {selectedPlan.price}
                </span>
                <span className="text-xs font-bold text-slate-400">USD</span>
              </div>
            </div>
            <Receipt className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Cash App QR Modal */}
      <AnimatePresence>
        {showQrModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full relative shadow-2xl flex flex-col items-center text-center"
            >
              <button
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 my-6 flex flex-col items-center justify-center w-full max-w-[200px] aspect-square relative">
                <QrCode className="w-32 h-32 text-slate-800 opacity-80" />
                <button
                  onClick={() => {
                    setShowQrModal(false);
                    navigate("/success");
                  }}
                  className="mt-3 bg-blue-600 text-white font-semibold text-xs py-1.5 px-3 rounded-lg shadow-sm"
                >
                  Simulate Scan
                </button>
              </div>

              <p className="text-xs text-slate-600 font-medium">
                Scan with Cash App to complete payment
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
