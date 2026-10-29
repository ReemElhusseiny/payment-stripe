/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import apiToken, { endpoints } from "../apisConfig/apis";
import { supabase } from '../lib/supabase';


interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  start_at?: string | null;
  end_at?: string | null;
  created_at: string | null;
  status: string | null;
  is_active: boolean | null;

}

interface RegisterParams {
  email: string;
  password: any;
  firstName: string;
  lastName: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  user: User;
  message?: string;
}

interface UserStore {
  user: User | null;
  loading: "idle" | "pending" | "fulfilled";
  // userActive: boolean | null;
  // authReady: boolean;
  // status: string | null;
  // start_at: string | null;
  // end_at: string | null;
  // created_at: string | null;
  // setUser: (user: User | null) => void;
  // setUserActive: (active: boolean | null) => void;
  // setStatus: (status: string | null) => void;
  // setAuthReady: (ready: boolean) => void;
  register: (params: RegisterParams) => Promise<RegisterResponse>;
  login: (params: LoginParams) => Promise<any>;
  fetchProfile: (userId: string) => Promise<{
    status: string | null;
    is_active: boolean;
    start_at: string | null;
    end_at: string | null;
    first_name?: string | null;
    last_name?: string | null;
    created_at?: string | null;
  } | null>;
  initAuth: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User | null>;
  authReady: boolean;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  loading: "idle",
    authReady: false,
  // userActive: null,
  // authReady: false,
  // status: null,
  // start_at: null,
  // end_at: null,
  // created_at: null,

  // setUser: (user) => set({ user }),
  // setUserActive: (active) => set({ userActive: active }),
  // setStatus: (status) => set({ status }),
  // setAuthReady: (ready) => set({ authReady: ready }),

  // أضيفي هذه الدالة داخل الـ Store
initAuth: async () => {
  set({ loading: "pending" });
  try {
    const { data: { session } } = await supabase.auth.getSession();
      console.log("session", session);
    if (!session?.user) {
      set({ user: null, loading: "idle", authReady: true, });
      // set({ user: null, loading: "idle", authReady: true });
      return;
    }

    const user = session.user;
    const profile = await get().fetchProfile(user.id);
   console.log("profile", profile);
    const firstName =
      user.user_metadata?.firstName ||
      user.user_metadata?.first_name ||
      profile?.first_name ||
      "";

    const lastName =
      user.user_metadata?.lastName ||
      user.user_metadata?.last_name ||
      profile?.last_name ||
      "";

    set({
      user: {
        id: user.id,
        email: user.email || "",
        firstName,
        lastName,
        start_at: profile?.start_at ?? null,
        end_at: profile?.end_at ?? null,
        created_at: profile?.created_at ?? null,
        status: profile?.status ?? null,
        is_active: profile?.is_active ?? null,
      },
      // userActive: profile?.is_active ?? null,
      // status: profile?.status ?? null,
      // start_at: profile?.start_at ?? null,
      // end_at: profile?.end_at ?? null,
      // created_at: profile?.created_at ?? null,
      loading: "idle",
        authReady: true,
      // authReady: true,
    });
  } catch (err) {
    set({ loading: "idle", authReady: true });
    // set({ loading: "idle", authReady: true });
  }
},
// AuthStore.ts
refreshUser: async () => {
  // getUser بيجيب من السيرفر، أضمن من getSession (اللي ممكن يرجع cache)
  const { data: { user: authUser } } = await supabase.auth.getUser();
  if (!authUser) {
    set({ user: null });
    return null;
  }

  const profile = await get().fetchProfile(authUser.id);

  const user: User = {
    id: authUser.id,
    email: authUser.email || "",
    firstName:
      authUser.user_metadata?.firstName ||
      authUser.user_metadata?.first_name ||
      profile?.first_name || "",
    lastName:
      authUser.user_metadata?.lastName ||
      authUser.user_metadata?.last_name ||
      profile?.last_name || "",
    start_at: profile?.start_at ?? null,
    end_at: profile?.end_at ?? null,
    created_at: profile?.created_at ?? null,
    status: profile?.status ?? null,
    is_active: profile?.is_active ?? false,
  };

  set({ user }); // من غير ما نلمس authReady عشان ما يظهرش Loading
  return user;
},
  register: async (params: any) => {
    const url = endpoints.user.register;
    set({ loading: "pending" });

    try {
      const response = await apiToken.post<RegisterResponse>(url, params);
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     apikey: supabaseAnonKey,
      //   },
      // }

      const data = response.data;

      set({
        loading: "idle",
        user: data.user,
        // userActive: null,
        // status: null,
      });

      return data;
    } catch (err: any) {
      set({ loading: "idle" });
      throw err.response?.data;
    }
  },

  fetchProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from("Profile")
      .select("*")
      .eq("id", userId) // تأكدي أن العمود اسم "user_id" أو "id" في جدول Profile
      .maybeSingle();

    if (error) throw error;
    console.log("dataProfile", data);

    return {
      status: data?.status ?? null,
      is_active: data?.is_active ?? false,
      start_at: data?.start_at ?? null,
      end_at: data?.end_at ?? null,
      // نأخذ الاسم الأول والأخير من البروفايل أيضاً كـ fallback
      first_name: data?.first_name ?? data?.firstName ?? null,
      last_name: data?.last_name ?? data?.lastName ?? null,
      created_at: data?.created_at ?? null,
    };
  },

  login: async (params: LoginParams) => {
    set({ loading: "pending" });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: params.email,
        password: params.password,
      });

      if (error) throw error;

      const profile = await get().fetchProfile(data.user.id);
      console.log("profileFetched$$", profile);

      // فحص أين توجد الأسماء (في الـ Metadata أم في جدول Profile)
      const firstName =
        data.user.user_metadata?.firstName ||
        data.user.user_metadata?.first_name ||
        profile?.first_name ||
        "";

      const lastName =
        data.user.user_metadata?.lastName ||
        data.user.user_metadata?.last_name ||
        profile?.last_name ||
        "";

      const userData: User = {
        id: data.user.id,
        email: data.user.email || "",
        firstName,
        lastName,
        start_at: profile?.start_at ?? null,
        end_at: profile?.end_at ?? null,
        created_at: profile?.created_at ?? null,
        status: profile?.status ?? null,
        is_active: profile?.is_active ?? null,
      };

      set({
        user: userData,
        // userActive: profile?.is_active ?? null,
        // status: profile?.status ?? null,
        // start_at: profile?.start_at ?? null,
        // end_at: profile?.end_at ?? null,
        loading: "idle",
      });

      return {
        user: userData,
        // userActive: profile?.is_active ?? null,
        // status: profile?.status ?? null,
        // start_at: profile?.start_at ?? null,
        // end_at: profile?.end_at ?? null,
      };
    } catch (err) {
      set({ loading: "idle" });
      throw err;
    }
  },

  logout: async () => {
    set({ loading: "pending" });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // تصفير كل قيم الحساب بالكامل
      set({
        loading: "idle",
        user: null,
      });
    } catch (err) {
      set({ loading: "idle", authReady: true });
      throw err;
    }
  },
}));

export default useUserStore;
