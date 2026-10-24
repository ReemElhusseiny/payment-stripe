/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";
import PaymentSuccessUI from "./PaymentSuccessUI";
import ProcessingUI from "./ProcessingUI";
import PaymentFailedUI from "./PaymentFailedUI";
import PaymentActionRequiredUI from "./PaymentActionRequiredUI";
import PaymentErrorUI from "./PaymentErrorUI";
import apiToken from "../apisConfig/apis";
import { ButtonComp } from "../components/UI/ButtonComp";

type PaymentStatus =
  | "pending"
  | "success"
  | "failed"
  | "checkout_expired"
  | "requires_action";

export type SubscriptionStatus =
  | "incomplete"
  | "active"
  | "trialing"
  | "past_due"
  | "unpaid"
  | "paused"
  | "canceled"
  | "incomplete_expired";

interface PaymentStatusResponse {
  success: boolean;

  data: {
    paymentStatus: PaymentStatus;
    subscriptionStatus: SubscriptionStatus | null;
    isActive: boolean;
  };
}

export default function PaymentProcessing() {
  const navigate = useNavigate();
  const location = useLocation()
 const selectedPlan = location.state?.planId;
 console.log('selectedPlanPayment-Processing', selectedPlan);
  const [searchParams] = useSearchParams();

const subscriptionId = searchParams.get("subscription_id");

  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>("pending");

  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);


   // =====================================================
  // 2. CHECK PAYMENT STATUS
  // =====================================================
const intervalRef =
  useRef<ReturnType<typeof setInterval> | null>(null);

useEffect(() => {

  if (!subscriptionId) {
    return;
  }

  let isMounted = true;

  const checkPayment = async () => {

    try {

      const response =
        await apiToken.get<PaymentStatusResponse>(
          `/payment-status?subscription_id=${subscriptionId}`
        );

      if (!isMounted) return;

      const data = response.data.data;
      console.log('dataPayment', data)
      console.log('reponsePayment', response)

      setPaymentStatus(data.paymentStatus);

      setSubscriptionStatus(
        data.subscriptionStatus
      );

      setLoading(false);


      const isFinished =
        data.paymentStatus === "success" ||
        data.paymentStatus === "failed" ||
        data.paymentStatus === "checkout_expired" ||
        data.paymentStatus === "requires_action";


      if (isFinished) {

        if (intervalRef.current) {

          clearInterval(
            intervalRef.current
          );

          intervalRef.current = null;
        }
      }

    } catch (err) {

      console.error(
        "Payment status error:",
        err
      );

      if (!isMounted) return;

      setError(
        "Unable to check your payment status."
      );

      setLoading(false);

      if (intervalRef.current) {

        clearInterval(
          intervalRef.current
        );

        intervalRef.current = null;
      }
    }
  };

  checkPayment();

  intervalRef.current =
    setInterval(
      checkPayment,
      2000
    );


  return () => {

    isMounted = false;

    if (intervalRef.current) {

      clearInterval(
        intervalRef.current
      );

      intervalRef.current = null;
    }
  };

}, [subscriptionId]);
  // =====================================================
  // 1. NO SESSION ID
  // =====================================================

  if (!subscriptionId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full h-full flex flex-col items-center gap-[10px] text-center">

          <h1 className="text-2xl font-bold text-gray-600">
            Invalid Payment Session
          </h1>

          <p className="mt-2 text-gray-500">
            We couldn't find your payment session.
          </p>

          <ButtonComp
            icon=""
            name="Back to Payment"
            fnc={() => navigate("/payments")}
            className="mt-6 px-6 py-3 rounded-lg !bg-[#3F33D1] !text-white"
          />
        </div>
      </div>
    );
  }




  // =====================================================
  // 3. LOADING
  // =====================================================

  if (loading) {
    return (
      <ProcessingUI selectedPlan={selectedPlan} />
    );
  }


  // =====================================================
  // 4. ERROR
  // =====================================================

  if (error) {
    return (
      <PaymentErrorUI
        message={error}
      />
    );
  }


  // =====================================================
  // 5. PAYMENT STATUS
  // =====================================================

  switch (paymentStatus) {

    // =================================================
    // PENDING
    // =================================================

    case "pending":

      return (
        <ProcessingUI selectedPlan={selectedPlan} />
      );


    // =================================================
    // SUCCESS
    // =================================================

    case "success":

      return (
        <PaymentSuccessUI
         selectedPlan={
           selectedPlan
          }
        />
      );


    // =================================================
    // FAILED
    // =================================================

    case "failed":

      return (
        <PaymentFailedUI
        />
      );

    // =================================================
    // REQUIRES ACTION
    // =================================================

    case "requires_action":

      return (
        <PaymentActionRequiredUI
        />
      );


    // =================================================
    // DEFAULT
    // =================================================

    default:

      return (
        <PaymentErrorUI
          message="Unknown payment status."
        />
      );
  }
}