import React, { useState, useContext } from "react";

import { faEnvelope, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import forgetpasswordImage from "../../assets/img/aimscopeFour.e70e3d5a_1.jpg";
import { Context } from "../../index.jsx";
import api from "../api/api.js";

const ForgetPasswordPage = () => {
  const { setIsAuthenticated, setUser, toggle, setBtn, setPopup } =
    useContext(Context);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleForgetpassword = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }

    try {
      await api
        .post(
          `forgetpassword`,
          {
            email,
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
          setPopup(false);
          navigate("/home");
        });
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        toast.error(
          "Network Error: Could not connect to the server. Please check your internet connection."
        );
        console.error(error.message);
        // Optionally, show a user-friendly error message in your UI
      } else if (error.code === "ERR_BAD_REQUEST") {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred:");
        console.error(error.message);
      }
      setUser({});
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-sm min-h-screen flex items-center justify-center">
      <div className="bg-white border-2 mx-auto md:w-3/5 md:h-fit lg:w-3/5 lg:max-h-[83vh] md:fixed md:z-50 relative">
        <div className="xl:px-14 xl:py-10 p-8">
          <div className="flex justify-between xl:mt-3">
            <a href={" "} className="text-4xl text-primary font-semibold">
              Logo
            </a>
            <button onClick={toggle} className="text-3xl text-black">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <form
            onSubmit={handleForgetpassword}
            className="mt-[7vh] lg:mt-[15vh]"
          >
            {/* <h2>Sign Up</h2> */}

            <div className="w-auto relative form-responsive mt-5 xl:w-1/2 lg:w-1/2 space-y-4">
              <label htmlFor="email" className="text-lg text-black font-bold ">
                Enter email address you signed up with
              </label>
              <input
                className="form-input mt-1 mb-2 py-2 rounded-md border-2 border-gray-400 outline-none"
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

            <button
              type="submit"
              className="border-2 w-full lg:w-1/3 md:w-2/5 xl:w-1/3 bg-primary rounded-md text-white text-xl font-semibold shadow-md py-3 mt-10"
            >
              E-mail a link
            </button>
            <div className="mt-10">
              <p className="text-gray-400 text-xl font-semibold">
                Go Back to Login Page?{" "}
                <button
                  onClick={() => setBtn("login")}
                  className="text-blue-500"
                >
                  Sign In
                </button>
              </p>
            </div>

            <img
              src={forgetpasswordImage}
              alt="Login"
              className="hidden lg:block lg:absolute lg:z-0 lg:right-8 xl:right-12 lg:bottom-[14%] xl:bottom-[1%] lg:w-5/12 xl:w-4/12 max-h-[40vh] object-cover"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
