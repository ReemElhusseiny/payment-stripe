import { useEffect } from "react";
import { supabase } from "./lib/supabase";
import { useUserStore } from "./Store/AuthStore";

export default function AppInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    setUser,
    setUserActive,
    setAuthReady,
    fetchProfile,
    setStatus,
  } = useUserStore();

  useEffect(() => {
    const init = async () => {
            console.log("INIT START");
      const {
        data: { session },
      } = await supabase.auth.getSession();
    console.log("SESSION", session);
      if (!session) {
        setUser(null);
        setUserActive(null);
        setAuthReady(true);
        return;
      }

      setUser({
        id: session.user.id,
        email: session.user.email || "",
        firstName: "",
        lastName: "",
      });

      const profile = await fetchProfile(session.user.id);
if (!profile) {
  await supabase.auth.signOut();
  setUser(null);
  setAuthReady(true);
  return;
}
      setUserActive(profile?.is_active ?? false);
      setStatus(profile?.status ?? null);
 console.log("SETTING AUTH READY");
      setAuthReady(true);
    };

    init();
  }, []);

  return children;
}