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
    return <Loading />;
  }
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  const status = user?.is_active ? "active" : "inactive";
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