
import axios from "axios";
import { supabase, supabaseAnonKey } from "../lib/supabase";
/* eslint-disable */
const apiToken = axios.create({
  baseURL: "https://iolyyhabrljbipwufqsh.supabase.co/functions/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiToken.interceptors.request.use(
  async (config) => {
    const { data: { session } } = await supabase.auth.getSession();
  
    // const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ""; 

    if (supabaseAnonKey) {
      config.headers["apikey"] = supabaseAnonKey;
    }

    if (session?.access_token) {
      config.headers["Authorization"] = `Bearer ${session.access_token}`;
    }
   console.log('congigTest', config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default apiToken;

export const endpoints = {
    user: {
    register: '/Register',
    login: '/Login'
  },
  company: {
    register: "/register-company",
    upload: "/storeExcel"
  },
  payment: {
    payment: '/payment',
    manageSub: '/manage-subscription'
  },
  invoices: {
    invoices: 'invoices'
  }
}



