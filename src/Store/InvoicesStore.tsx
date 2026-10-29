import { create } from "zustand";
import apiToken, { endpoints } from "../apisConfig/apis";
import axios from "axios";
import { useToastStore } from "./toastStore";
// import { supabase, supabaseAnonKey} from '../lib/supabase';

export interface InvoiceItem {
  id: string;
  number: string;
  total: number;
  amount_paid: number;
  currency: string;
  status: string;
  frequency: string;
  customer_name: string | null;
  customer_email: string;
  due_date: string | null;
  created: string;
  subscription_created_at: string;
  start_at: string;
  end_at: string;
  pdf_url: string;
  hosted_url: string;
}

export interface InvoicesResponse {
  success: boolean;
  message: string;
 invoices: InvoiceItem[];
}

interface invoicesStore {
loading: boolean;
error: string | null;
invoicesData: InvoiceItem[];
invoices: () => Promise<InvoicesResponse | undefined>;
}

const useInvoicesStore = create<invoicesStore>((set) => ({
loading: false,
error: null,
invoicesData: [],
invoices: async () => {
set({ loading: true, error: null });

try {
  const response = await apiToken.get<InvoicesResponse>(
    endpoints.invoices?.invoices
  );
      set({ loading: false, invoicesData: response?.data?.invoices || [] });
       return response.data;
}
catch (err: unknown) {
      set({ loading: false });
      if (axios.isAxiosError(err)) {
  useToastStore.getState().showMessage(
      err.response?.data?.error || "Action failed", 
      'error'
  )
  }
  throw err;
    }
} 
}))
export default useInvoicesStore;



