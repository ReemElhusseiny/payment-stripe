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
    // {path: 'testSucces', element: <PaymentSuccessUI />},

  {
path: "/payments",
element: (
<AuthGuard allowedStatuses={["inactive", "active"]}>
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
  useUserStore.getState().initAuth();
}, []);
  return (
<ColorProvider>
        <RouterProvider router={router} />
        <GlobalToast />
    </ColorProvider>
  )
}