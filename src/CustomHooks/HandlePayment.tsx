/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from 'react'
import usePaymentStore from '../Store/PaymentStore';
import { useToastStore } from '../Store/toastStore';
import { PLANS } from '../components/Payments/Data';

function useHandlePayment() {
     const [selectedPlanId, setSelectedPlanId] = useState<string>('semi-annual');

  const selectedPlan = PLANS.find(p => p.id === selectedPlanId) || PLANS[1];
  const { payment } = usePaymentStore();
  const { showMessage } = useToastStore();
  const [isPreparing, setIsPreparing] = useState(false);
   const [checkoutData, setCheckoutData] = useState<{
  clientSecret: string;
  subscriptionId?: string;
} | null>(null);

  const handlePayment = async (handleOpen?: () => void) => {
    setIsPreparing(true);
    try {
      const response = await payment({
        priceId: selectedPlan.priceId,
        title: selectedPlan.title,
      });
      console.log('selectedData', selectedPlan)
      console.log('responseStripe', response)
      // const { icon, ...planDataWithoutIcon } = selectedPlan;
      if (response?.clientSecret) {
        setCheckoutData({
      clientSecret: response.clientSecret,
      subscriptionId: response.subscriptionId,
    });

    handleOpen?.();
      } else {
        showMessage("Failed to initialize payment", "error");
      }
    } catch (err: any) {
      console.log("err**", err?.response?.data?.error)
      showMessage(err?.response?.data?.error || 'An unexpected error' , 'error');
    } finally {
      setIsPreparing(false);
    }
  };
  return {selectedPlan, selectedPlanId, setSelectedPlanId, isPreparing,  setIsPreparing, checkoutData, setCheckoutData, handlePayment  }
}

export default useHandlePayment