import { useState } from "react";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white flex items-center justify-center">

      {/* 🔵 BACKGROUND CIRCLE (FIXED + SMOOTH) */}
      <motion.div
        className="absolute w-[2000px] h-[2000px] rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 z-10"
        style={{
          top: "50%",
          right: "48%",
          transform: "translateY(-50%)",
        }}
        animate={{
          right: isSignUp ? "52%" : "48%",
        }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />

      {/* MAIN CONTAINER */}
      <div className="relative w-full max-w-6xl min-h-[650px] z-20 grid grid-cols-2">

        {/* FORMS AREA */}
        <div className="absolute top-1/2 left-[75%] w-1/2 -translate-y-1/2">

          <motion.div
            className="relative w-full"
            animate={{
              x: isSignUp ? "-50%" : "0%",
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >

            {/* SIGN IN */}
            <motion.form
              className="flex flex-col items-center justify-center gap-4 px-10 absolute w-full"
              animate={{
                opacity: isSignUp ? 0 : 1,
                zIndex: isSignUp ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold">Sign in</h2>

              <input className="w-full p-3 rounded-full bg-gray-100 outline-none" placeholder="Username" />
              <input className="w-full p-3 rounded-full bg-gray-100 outline-none" type="password" placeholder="Password" />

              <button className="w-[150px] h-[45px] bg-blue-500 text-white rounded-full">
                Login
              </button>
            </motion.form>

            {/* SIGN UP */}
            <motion.form
              className="flex flex-col items-center justify-center gap-4 px-10 absolute w-full"
              animate={{
                opacity: isSignUp ? 1 : 0,
                zIndex: isSignUp ? 10 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold">Sign up</h2>

              <input className="w-full p-3 rounded-full bg-gray-100 outline-none" placeholder="Username" />
              <input className="w-full p-3 rounded-full bg-gray-100 outline-none" placeholder="Email" />
              <input className="w-full p-3 rounded-full bg-gray-100 outline-none" type="password" placeholder="Password" />

              <button className="w-[150px] h-[45px] bg-blue-500 text-white rounded-full">
                Sign up
              </button>
            </motion.form>

          </motion.div>
        </div>

        {/* PANELS */}
        <div className="absolute inset-0 grid grid-cols-2 z-30">

          {/* LEFT PANEL */}
          <motion.div
            className="flex flex-col justify-center items-start px-16 text-white"
            animate={{
              x: isSignUp ? "-800px" : "0px",
              opacity: isSignUp ? 0 : 1,
            }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-xl font-bold">New here?</h3>
            <p className="text-sm my-2">
              Create an account and start your journey
            </p>

            <button
              onClick={() => setIsSignUp(true)}
              className="border border-white px-6 py-2 rounded-full"
            >
              Sign up
            </button>
          </motion.div>

          {/* RIGHT PANEL */}
          <motion.div
            className="flex flex-col justify-center items-end px-16 text-white"
            animate={{
              x: isSignUp ? "0px" : "800px",
              opacity: isSignUp ? 1 : 0,
            }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-xl font-bold">One of us?</h3>
            <p className="text-sm my-2">
              Login to continue
            </p>

            <button
              onClick={() => setIsSignUp(false)}
              className="border border-white px-6 py-2 rounded-full"
            >
              Sign in
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}