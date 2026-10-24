import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useUserStore } from "../Store/AuthStore";
import Loading from "../components/Loading";

type AuthGuardProps = {
  children: ReactNode;
  allowedStatuses: ("active" | "inactive")[];
};

export default function AuthGuard({
  children,
  allowedStatuses,
}: AuthGuardProps) {
  const { user,authReady } = useUserStore();
  const location = useLocation();

    if (!authReady) {
    return <Loading />; // أو Spinner بتاعك
  }
  // No user → Login
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  const status = user?.is_active === true ? "active" : "inactive";
  console.log('user#', user);
  // User cannot access this group of routes
 if (!allowedStatuses.includes(status)) {
    const fallbackRoute = status === "active" ? "/dashboard" : "/payments";
    return (
      <Navigate
        to={fallbackRoute}
        replace
      />
    );
  }

  return <>{children}</>;
}