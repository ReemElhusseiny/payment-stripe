import { create } from "zustand";
import apiToken, { endpoints } from "../apisConfig/apis";
import axios from "axios";
import { useToastStore } from "./toastStore";
// import { supabase, supabaseAnonKey} from '../lib/supabase';

export interface managaeActionsData {
    action: string
}

export interface manageResponse {
success: boolean;
message: string;
}

interface manageactionsStore {
loading: boolean;
error: string | null;
manageActions: (params: managaeActionsData) => Promise<manageResponse | undefined>;
}

const useManageactionsStore = create<manageactionsStore>((set) => ({
loading: false,
error: null,

manageActions: async (params: managaeActionsData) => {
set({ loading: true, error: null });

try {
  const response = await apiToken.post<manageResponse>(
    endpoints.payment.manageSub,
    params
  );
  console.log("responseActions", response)
      set({ loading: false });
       return response.data;
}
catch (err: unknown) {
      set({ loading: false });
      if (axios.isAxiosError(err)) {
    console.log('errAction',err)
  useToastStore.getState().showMessage(
      err.response?.data?.error || "Action failed", 
      'error'
  )
  }
  throw err;
    }
} 
}))
export default useManageactionsStore;



