import React, { useState, useContext } from "react";

import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import signupImage from "@/assets/img/aimscopefour-e70e3d5a-1.png"; // Update with your image path
import { Context } from "@/index.jsx";

import api from "../api/api.js";

const SignupPage = () => {
  const { setIsAuthenticated, setUser, toggle, setBtn, setPopup, setToken } =
    useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name) {
      setNameError("Please enter your name.");
      return;
    }
    setNameError("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }

    setEmailError("");
    if (!password || password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }
    setPasswordError("");

    try {
      await api
        .post(
          "register",
          { name, email, password },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          //console.log(res.data);
          setUser(res.data.user);
          setToken(res.data.token);
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("userId", JSON.stringify(res.data.user.id));
          localStorage.setItem("token", res.data.token);
          setPopup(false);
          navigate("/home");
        });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error(
          "Network Error: Could not connect to the server. Please check your internet connection."
        );
        console.error(
          "Network Error: Could not connect to the server. Please check your internet connection.",
          error.message
        );
        // Optionally, show a user-friendly error message in your UI
      } else {
        toast.error("An unexpected error occurred:");
        console.error("An unexpected error occurred:", error.message);
        // Handle other types of errors
      }
      // toast.error(error.response.data.errors.email[0], {
      //   style: {
      //     borderRadius: "8px",
      //     background: "#f8f9fa",
      //     color: "#212529",
      //     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      //     padding: "12px 20px",
      //   },
      // });
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
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-sm min-h-screen flex items-center justify-center">
      <div className="bg-white border-2 mx-auto md:w-3/5 md:h-fit lg:w-3/5 lg:h-auto md:fixed md:z-50 relative">
        <div className="xl:px-14 xl:py-10 p-8">
          <div className="flex justify-between xl:mt-3">
            <a href={" "} className="text-4xl text-primary font-semibold">
              Logo
            </a>
            <button onClick={toggle} className="text-3xl text-black">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <form onSubmit={handleSignup}>
            {/* <h2>Sign Up</h2> */}

            <div className="flex justify-between gap-5 w-full lg:w-2/3 xl:w-2/3">
              <button
                onClick={() => handleSocialSignup("Google")}
                className="btn-primary w-1/2"
              >
                <FcGoogle size={30} />
                <span className="btn-text">
                  <span className="hidden sm:inline-block">Sign Up with</span>{" "}
                  Google
                </span>
              </button>
              <button
                onClick={() => handleSocialSignup("Facebook")}
                className="btn-primary w-1/2"
              >
                <FontAwesomeIcon icon={faFacebook} fontSize={26} />{" "}
                <span className="btn-text">
                  <span className="hidden sm:inline-block">Sing Up with</span>{" "}
                  Facebook
                </span>
              </button>
            </div>
            <div className="w-auto lg:w-2/3">
              <button
                onClick={() => handleSocialSignup("Apple")}
                className="btn-primary w-full"
              >
                <FaApple size={26} />
                <span className="btn-text">
                  <span className="hidden sm:inline-block">Sign Up With</span>{" "}
                  Apple
                </span>
              </button>
            </div>
            <div className="mt-4 w-full md:w-full lg:w-1/2 xl:w-2/3 flex items-center">
              <div className="border-t-2 w-full border-t-gray-400"></div>
              <span className="mx-4 btn-text font-bold">or</span>
              <div className="border-t-2 w-full border-t-gray-400"></div>
            </div>

            <div className="w-auto relative form-responsive mt-5 xl:w-1/2 lg:w-1/2 space-y-4">
              <label htmlFor="email" className="text-lg text-black font-bold ">
                Name
              </label>
              <input
                className="form-input mt-1 mb-2 py-2 rounded-md border-2 border-gray-400  outline-none"
                type="text"
                placeholder="Name"
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
              <FontAwesomeIcon icon={faEnvelope} className="form-input-icon" />
            </div>
            {nameError && (
              <div style={{ color: "red", textAlign: "left" }}>{nameError}</div>
            )}
            <div className="relative w-auto form-responsive mt-5 xl:w-1/2 lg:w-1/2 space-y-4">
              <label htmlFor="email" className="text-lg text-black font-bold ">
                Email
              </label>
              <input
                className="form-input mt-1 mb-2 py-2 rounded-md border-2 border-gray-400  outline-none"
                type="email"
                placeholder="Email"
                value={email}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <FontAwesomeIcon icon={faEnvelope} className="form-input-icon" />
            </div>

            {emailError && (
              <div style={{ color: "red", textAlign: "left" }}>
                {emailError}
              </div>
            )}

            <div className="relative w-auto form-responsive mt-5 xl:w-1/2 lg:w-1/2 space-y-4">
              <label htmlFor="email" className="text-lg text-black font-bold ">
                Password
              </label>
              <input
                className="form-input mt-1 mb-2 py-2 rounded-md border-2 border-gray-400 outline-none"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                className="form-input-icon"
                icon={passwordVisible ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
              />
            </div>
            {passwordError && (
              <div style={{ color: "red", textAlign: "left" }}>
                {passwordError}
              </div>
            )}
            <div className="flex justify-center items-center xl:block">
              <button
                type="submit"
                className="border-2 w-full lg:w-1/3 md:w-2/5 xl:w-1/3 bg-primary rounded-md text-white text-xl font-semibold shadow-md py-3 mt-10"
              >
                Sign Up
              </button>
            </div>

            <div className="mt-10">
              <p className="text-gray-400 text-xl font-semibold">
                Already have an account ?{" "}
                <button
                  onClick={() => setBtn("login")}
                  className="text-blue-500"
                >
                  Sign In
                </button>
              </p>
            </div>

            <img
              src={signupImage}
              alt="Signup"
              className="hidden lg:block lg:absolute lg:right-8 lg:bottom-[22%] xl:bottom-[16%] lg:w-5/12 xl:w-5/12 max-h-[55vh] object-cover"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
