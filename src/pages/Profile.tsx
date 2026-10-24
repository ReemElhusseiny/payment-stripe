/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import {
  FiUser,
  FiZap,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PersonalInfo from "../components/Profile/PersonalInfo";
import CurrentPlan from "../components/Profile/CurrentPlan";
import InvoicesTable from "../components/Profile/InvoicesTable";
import { ButtonComp } from "../components/UI/ButtonComp";


export default function Profile() {
    const navigate = useNavigate();
        
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 text-gray-900 font-sans">
      <div className="max-w-9xl mx-auto space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-gray-500 uppercase mb-1">
              <FiUser className="w-3.5 h-3.5" />
              <span>YOUR ACCOUNT</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Profile & invoices
            </h1>
            <p className="text-sm text-gray-500 mt-1 max-w-xl">
              Manage your workspace details and download every subscription receipt for your accounting records.
            </p>
          </div>

          <ButtonComp icon={ <FiZap className="w-4 h-4 fill-current" />}  name="Manage subscription" fnc={() => navigate("/payments")} className="inline-flex items-center justify-center gap-2 !bg-[#3F33D1] hover:!bg-[#3730A3] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md self-start md:self-center" />
           
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
       <PersonalInfo />


      <CurrentPlan />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Invoice history</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                PDF receipts for completed subscription payments.
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <InvoicesTable />
           
          </div>
        </div>

      </div>
    </div>
  );
}