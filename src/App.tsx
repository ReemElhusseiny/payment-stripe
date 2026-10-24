/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
// src/App.tsx

import {Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import AuthContainer from "./pages/AuthContainer";
import { Loading } from "./components/Loading";
import { NotFound } from "./pages/NotFound";
import { dashboardRoutes } from "./MenuItems";
import { ColorProvider } from "./context/ColorContext";
import GlobalToast from "./components/Message";
import PaymentProcessing from "./pages/PaymentProcessing";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import useUserStore from "./Store/AuthStore";
import ProcessingUI from "./pages/ProcessingUI";
import PaymentSuccessUI from "./pages/PaymentSuccessUI";
import PaymentErrorUI from "./pages/PaymentErrorUI";
import PaymentFailedUI from "./pages/PaymentFailedUI";
import PaymentActionRequiredUI from "./pages/PaymentActionRequiredUI";
import AuthGuard from "./components/RouteGuard";
import Payment from "./pages/Payment";


interface route {
  path: string;
  title: string;
  icon?: React.ReactNode;
  element: React.ReactNode;
  showInSidebar: boolean;
  requiresPaymentGuard?: boolean;
}
 const router = createBrowserRouter([
    { path: "/login", element: <AuthContainer /> },
    { path: "/register", element: <AuthContainer /> },
    { path: "/loading", element: <Loading /> },
    {path: 'profile', element: <Profile />},
    // {path: 'processing', element: <ProcessingUI />},
    // {path: 'payment-success', element: <PaymentSuccessUI /> },
    // {path: 'payment-error', element: <PaymentErrorUI /> },
    // {path: 'payment-failed', element: <PaymentFailedUI /> },
    // {path: 'payment-required', element: <PaymentActionRequiredUI /> },

  {
path: "/payments",
element: (
<AuthGuard allowedStatuses={["inactive"]}>
<Payment />
</AuthGuard>
),
},
{
path: "/payment-processing",
element: (
<AuthGuard allowedStatuses={["inactive"]}>
<PaymentProcessing />
</AuthGuard>
),
},

    {
      element: (
        <AuthGuard allowedStatuses={["active"]}>
          <MainLayout 
          />
        </AuthGuard>
      ),
    children: [
      ...dashboardRoutes
        // .filter((route) => route.path !== "payments" && route.path !== "success" && route.path !== "checkout" && route.path !== "payment-processing" && route.path === 'processing')
        .map((route: route) => ({
          path: route.path,
          element: route.element,
        })),
      { path: "", element: <Navigate to="/dashboard" replace /> }
    ],
    },
    { path: "*", element: <NotFound /> },
  ]);
export default function App() {
  useEffect(() => {
  // تشغيل التهيئة عند تحميل التطبيق لاسترجاع البيانات الكاملة
  useUserStore.getState().initAuth();
}, []);
  return (
<ColorProvider>
      {/* <AppInitializer> */}
        <RouterProvider router={router} />
        <GlobalToast />
      {/* </AppInitializer> */}
    </ColorProvider>
  )
}