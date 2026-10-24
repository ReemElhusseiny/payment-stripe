// /* eslint-disable @typescript-eslint/no-explicit-any */
// // src/context/AuthContext.tsx

// import { createContext, useEffect, useRef, useState, type ReactNode } from "react";
// import { supabase } from "../lib/supabase";

// type AuthContextType = {
//   user: any;
//   loading: boolean;
// };

// type AuthProviderProps = {
//   children: ReactNode;
// };
// // eslint-disable-next-line react-refresh/only-export-components
// export const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
// });
// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const initialized = useRef(false);
 
//   useEffect(() => {
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       setUser(session?.user ?? null);
 
//       // INITIAL_SESSION بيـfire مرة واحدة أول ما التطبيق يشتغل
//       // وده بيغني عن initializeAuth خالص
//       if (!initialized.current) {
//         initialized.current = true;
//         setLoading(false);
//       }
 
//       if (event === "SIGNED_OUT") {
//         setLoading(false);
//       }
//     });
 
//     return () => subscription.unsubscribe();
//   }, []);
 
//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// // import { createContext, useEffect, useState, type ReactNode } from "react";
// // import { supabase } from "../lib/supabase";

// // type AuthContextType = {
// //   user: any;
// //   loading: boolean;
// // };

// // type AuthProviderProps = {
// //   children: ReactNode;
// // };

// // // eslint-disable-next-line react-refresh/only-export-components
// // export const AuthContext = createContext<AuthContextType>({
// //   user: null,
// //   loading: true,
// // });

// // export const AuthProvider = ({ children }: AuthProviderProps) => {
// //   const [user, setUser] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const initializeAuth = async () => {
// //       const { data } = await supabase.auth.getSession();
// //       setUser(data.session?.user ?? null);
// //       setLoading(false);
// //     };

// //     initializeAuth();

// //     const {
// //       data: { subscription },
// //     } = supabase.auth.onAuthStateChange((_, session) => {
// //       setUser(session?.user ?? null);
// //       setLoading(false);
// //     });

// //     return () => {
// //       subscription?.unsubscribe();
// //     };
// //   }, []);

// //   return (
// //     <AuthContext.Provider value={{ user, loading }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };