import {useState, type FormEvent} from "react";
import { supabase } from "./lib/supabase";

export default function Auth() {
    const [isSignup, setIssighnup] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(isSignup){
            const { error } = await supabase.auth.signUp({
                email,
                password,
              });
              if(error){
                console.log("Eroro SighnUp", error.message);
              }
        }
        else{
              const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("Error Signin", error.message);
    }
        }
    }
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{isSignup ? 'Signup' : 'Signin'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">{isSignup ? 'Signup' : 'Signin'}</button>
        <button type="button" onClick={() => setIssighnup(!isSignup)}>Switch to SighnUp </button>
        </form>

    </div>
  );
}