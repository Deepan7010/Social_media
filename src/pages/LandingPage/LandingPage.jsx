import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import ForgetPasswordPage from "@/components/Auth/ForgotPassword.jsx";
import LoginPage from "@/components/Auth/LoginPage.jsx";
import SignupPage from "@/components/Auth/SignupPage.jsx";
import Contact from "@/components/layout/Contact.jsx";
import Footer from "@/components/layout/Footer.jsx";
import Navbar from "@/components/layout/Navbar.jsx";
import { Context } from "@/index.jsx";

import Banner from "./components/Banner";
import Categories from "./components/Categories";
import Institutions from "./components/Institutions";
import Mission from "./components/Mission";

import Journals from "@/assets/svg/journals.svg?react";
import Members from "@/assets/svg/members.svg?react";
import Paper from "@/assets/svg/paper.svg?react";
import Review from "@/assets/svg/review.svg?react";

const LandingPage = () => {
  const { popup, btn, isAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("home");
    } else {
      navigate("/");
    }
  }, [isAuthenticated]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

   
  const responsiveImageRender = ({ ComponentName, Component }) => {
    // console.log("Component: ", Component);
    // console.log("Component Name: ", ComponentName);

    if (ComponentName === "Global") {
      if (windowWidth <= 768) {
        return <Component width={350} height={350} />;
      } else if (windowWidth > 768 && windowWidth < 1250) {
        return <Component width={460} height={480} />;
      } else {
        return <Component width={670} height={550} />;
      }
    } else {
      if (windowWidth <= 768) {
        return <Component width={350} height={350} />;
      } else if (windowWidth > 768 && windowWidth < 1200) {
        return <Component width={400} height={550} />;
      } else {
        return <Component width={610} height={550} />;
      }
    }
  };

  return (
    <>
      {/* Header/Navbar */}
      {!isAuthenticated && <Navbar />}
      {popup && btn === "signup" && <SignupPage />}
      {popup && btn === "login" && <LoginPage />}
      {popup && btn === "forgetpassword" && <ForgetPasswordPage />}

      {/* Main Content */}
      <div className={popup ? "" : "bg-white"}>
        {/* part -1 */}
        <Banner />
        {/* part -2  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-[10px] sm:mx-[20px] md:mx-[50px] lg:mx-[100px] mt-20 gap-8 text-center">
          {/* Paper Published Section */}
          <div className="flex flex-col items-center">
            <Paper width={100} height={100} />
            <p className="mt-2 font-bold text-lg">2500+</p>
            <p className="font-bold text-lg">Papers Published</p>
          </div>

          {/* Peer Reviewed Section */}
          <div className="flex flex-col items-center">
            <Review width={100} height={100} />
            <p className="mt-2 font-bold text-lg">100%</p>
            <p className="font-bold text-lg">Peer Reviewed</p>
          </div>

          {/* Journals Section */}
          <div className="flex flex-col items-center">
            <Journals width={100} height={100} />
            <p className="mt-2 font-bold text-lg">6</p>
            <p className="font-bold text-lg">Journals</p>
          </div>

          {/* Editorial Members Section */}
          <div className="flex flex-col items-center">
            <Members width={100} height={100} />
            <p className="mt-2 font-bold text-lg">250+</p>
            <p className="font-bold text-lg">Editorial Members</p>
          </div>
        </div>
        {/* part - 3 */}
        <Categories />
        {/* part 4 */}
        <Mission
          responsiveImageRender={responsiveImageRender}
          windowWidth={windowWidth}
        />
        {/* part 5 */}
        <Institutions responsiveImageRender={responsiveImageRender} />
        {/* part 6 */}
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
