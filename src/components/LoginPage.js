import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FcGoogle } from "react-icons/fc";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import signupImage from "../assets/img/aimscopefour-e70e3d5a-1.png"; // Update with your image path
import toast from "react-hot-toast";
import { Context } from "../index.js";
import api from "./api.js";
import { FaApple } from "react-icons/fa";

const LoginPage = () => {
  const { setIsAuthenticated, setUser, toggle, setBtn, setPopup } =
    useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }
    if (!password || password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    // Reset errors
    setEmailError("");
    setPasswordError("");
    try {
      await api
        .post(
          `login`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          setUser(res.data.user);
          // //console.log(user);
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setPopup(false)
          navigate("/home");
        });

    } catch (error) {
      console.log(error)
      if (error.code === 'ERR_NETWORK') {
        toast.error('Network Error: Could not connect to the server. Please check your internet connection.');
        console.error(error.message);
        // Optionally, show a user-friendly error message in your UI
      }
      else if (error.code === "ERR_BAD_REQUEST") {
        toast.error(error.response.data.error)
      }
      else {
        toast.error('An unexpected error occurred:');
        console.error(error.message)
      }
      setUser({});
      setIsAuthenticated(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSocialSignup = (provider) => {
    if (provider === "Google") {
      window.location.href = "https://accounts.google.com/o/oauth2/auth";
    } else if (provider === "Facebook") {
      window.location.href = "https://www.facebook.com/v11.0/dialog/oauth";
    } else if (provider === "Apple") {
      window.location.href = "https://appleid.apple.com/auth/authorize"
    }
  };



  return (
    // <div className="">
    <div className="bg-white border-2 w-full  mx-auto  lg:w-4/5  md:w-4/5 left-0 right-0 lg:top-20 md:top-30  max-h-[85vh] static md:fixed md:z-50" >
      <div className="xl:px-20 xl:py-10 lg:px-10 lg:py-10 px-10 py-10">
        <div className="flex justify-between">
          <a href="#" className="text-4xl border-2">Logo</a>
          <button onClick={toggle}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <form onSubmit={handleSignup} className="relative h-screen">
          {/* <h2>Sign Up</h2> */}

          <div className="flex justify-between gap-5 w-full lg:w-2/3 xl:w-1/2">
            <button
              onClick={() => handleSocialSignup("Google")}
              className="btn-primary w-1/2"
            >
              <FcGoogle size={26} />
              <span className="btn-text"><span className="hidden sm:inline-block">Login with</span> Google</span>
            </button>
            <button
              onClick={() => handleSocialSignup("Facebook")}
              className="btn-primary w-1/2"
            >
              <FontAwesomeIcon icon={faFacebook} fontSize={26} /> <span className="btn-text"><span className="hidden sm:inline-block">Login with</span> Facebook</span>
            </button>
          </div>
          <div className="w-1/2">
            <button
              onClick={() => handleSocialSignup("Apple")}
              className="btn-primary w-full"
            >
              <FaApple size={26} />
              <span className="btn-text"><span className="hidden sm:inline-block">Sign in With</span> Apple</span>
            </button>

          </div>
          <div className="mt-4 w-full md:w-full lg:w-1/2 xl:w-1/2 flex items-center">
            <div className="border-t-2 w-full border-t-gray-400"></div>
            <span className="mx-4 btn-text font-bold">or</span>
            <div className="border-t-2 w-full border-t-gray-400"></div>
          </div>

          <div className="relative form-responsive mt-2">
            <label htmlFor="email" >Email</label>
            <input
              className="form-input mt-1 mb-2"
              type="email"
              placeholder="Email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FontAwesomeIcon icon={faEnvelope} className="form-input-icon" />
          </div>

          {emailError && (
            <div style={{ color: "red", textAlign: "left" }}>{emailError}</div>
          )}

          <div className="relative form-responsive">
            <label htmlFor="email">Password</label>
            <input
              className="form-input mt-1 mb-2"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon className="form-input-icon"
              icon={passwordVisible ? faEye : faEyeSlash}
              onClick={togglePasswordVisibility}
            />
          </div>
          {passwordError && (
            <div style={{ color: "red", textAlign: "left" }}>{passwordError}</div>
          )}

          <button type="submit"
            className="border-2 w-full lg:w-1/3 md:w-2/5 xl:w-1/4 mt-4 bg-primary rounded-sm text-white text-sm py-1"
          >
            Login
          </button>
          <div className="mt-1">
            <p>
              Don't have an account ? <button onClick={() => setBtn("signup")} className="text-blue-500">Sign up</button>
            </p>
          </div>

          <img src={signupImage} alt="Signup"
            className="hidden sm:hidden md:block lg:block md:absolute md:right-5 md:top-44 lg:top-20 sm:w-1/2 md:w-2/6 lg:w-1/2 xl:w-1/2 max-h-[55vh] object-contain"
          />

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
