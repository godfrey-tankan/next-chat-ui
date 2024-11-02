import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useRouter = dynamic(
  () => import("next/router").then((mod) => mod.useRouter),
  { ssr: false }
);

const SignUp = ({ user, socket, input, setInput }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = isClient ? useRouter() : null;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAuth = async () => {
    try {
      const endpoint = isSignUp
        ? "http://localhost:7001/api/auth/register"
        : "http://localhost:7001/api/auth/login";
      const requestData = isSignUp
        ? { username: input, email, password, profilePicture }
        : { username: input, password };

      const response = await axios.post(endpoint, requestData);
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        user.current = { name: input, id: socket.id };
        socket.emit("new_user", { user: input });

        toast.success("Authentication successful!", { autoClose: 2000 }); // Show success message

        setTimeout(() => {
          setInput("");
          if (router) {
          }
        }, 2000);
      }
    } catch (error) {
      toast.error("Authentication failed. Please try again."); // Show error message
      console.error("Authentication failed:", error);
    }
  };

  if (!isClient) return null;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="text-center grid grid-rows-3 gap-2 gradient p-8 rounded-md">
        <h1 className="text-6xl font-bold text-white">Chat</h1>
        <h2 className="text-2xl text-white">
          {isSignUp ? "Sign Up" : "Log In"} to Join the Chat
        </h2>

        {/* Toastify Notifications */}

        {/* Username */}
        <input
          type="text"
          className="text-2xl text-center rounded-md p-2 my-2 text-blue-400 placeholder-blue-300 focus:outline-none"
          placeholder="Username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Conditionally render fields based on login/signup mode */}
        {isSignUp && (
          <>
            {/* Email */}
            <input
              type="email"
              className="text-2xl text-center rounded-md p-2 my-2 text-blue-400 placeholder-blue-300 focus:outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Profile Picture */}
            <input
              type="text"
              className="text-2xl text-center rounded-md p-2 my-2 text-blue-400 placeholder-blue-300 focus:outline-none"
              placeholder="Profile Picture URL"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
            />
          </>
        )}

        {/* Password */}
        <input
          type="password"
          className="text-2xl text-center rounded-md p-2 my-2 text-blue-400 placeholder-blue-300 focus:outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className={`text-xl w-full text-white font-bold py-2 px-3 rounded-md ${
            input && password ? "bg-sky-400" : "bg-slate-400"
          }`}
          disabled={!input || !password}
          onClick={handleAuth}
        >
          {isSignUp ? "Sign Up" : "Log In"}
        </button>

        <button
          className="text-white underline mt-4"
          onClick={() => setIsSignUp((prev) => !prev)}
        >
          {isSignUp
            ? "Already have an account? Log In"
            : "Need an account? Sign Up"}
        </button>
      </div>
      <ToastContainer /> {/* ToastContainer */}
    </div>
  );
};

export default SignUp;
