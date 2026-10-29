import { create } from "zustand";
import apiToken, { endpoints } from "../apisConfig/apis";
import axios from "axios";
import { useToastStore } from "./toastStore";
// import { supabase, supabaseAnonKey} from '../lib/supabase';

export interface PaymentData {
     priceId: string,
        title: string,
}

export interface PaymentResponse {
success: boolean;
message: string;
data?: {
    url: string
};
url: string,
clientSecret: string,
subscriptionId: string,
}

interface PaymentStore {
loading: boolean;
error: string | null;
payment: (params: PaymentData) => Promise<PaymentResponse | undefined>;
}

const usePaymentStore = create<PaymentStore>((set) => ({
loading: false,
error: null,

payment: async (params: PaymentData) => {
set({ loading: true, error: null });

try {
  const response = await apiToken.post<PaymentResponse>(
    endpoints.payment.payment,
    params
  );
  console.log("responsePayment", response)
      set({ loading: false });
       return response.data;
}
catch (err: unknown) {
      set({ loading: false });
      if (axios.isAxiosError(err)) {
    console.log('errPayment22',err.response?.data?.error)
  useToastStore.getState().showMessage(
      err?.response?.data?.error || "Payment failed", 
      'error'
  )
  }
  throw err;
    }
} 
}))
export default usePaymentStore;



