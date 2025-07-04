import React from "react";

import PropTypes from "prop-types";

import Global from "@/assets/svg/global.svg?react";

const Institutions = ({ responsiveImageRender }) => {
  return (
    <>
      <div className="text-center text-4xl font-bold">Institutions</div>
      <div className="bg-gray-300 w-full h-[500px] mt-8">
        <div className="pt-52 md:pt-80 px-5 md:px-20">
          <h4 className="text-2xl font-semibold">Institution Name1</h4>
          <p className="mt-5 w-full xl:w-1/4 text-gray-500 font-semibold">
            Lorem ipsum dolor sit amet consectetur. Sit vel tempus nulla semper
            sed
          </p>
        </div>
      </div>
      <div className="text-center my-10">
        <button className="bg-primary w-32 py-2 px-4 rounded-lg text-white">
          View All
        </button>
      </div>
      <div
        className="flex-col flex md:flex-row  items-center xss:px-2 md:px-6 xl:px-16 xss:pb-4 sm:py-2"
        style={{ backgroundColor: "#0000FF1A" }}
      >
        <div className="w-[100%] text-center md:text-start md:w-2/3 lg:w-1/2 sm:mt-5 order-2 md:order-none xss:space-y-4 sm:space-y-7">
          <h1 className="font-bold xss:text-3xl md:text-4xl lg:text-5xl">
            Be Part of a Global Research Network!
          </h1>
          <p className="mt-5">
            <span className="font-bold xss:text-lg sm:text-xl text-gray-500">
              Your Research Journey Begins Here,
            </span>
            <span className="text-md text-gray-500">
              {" "}
              Create Your Profile and Collaborate on <br /> Cutting-Edge
              Studies.
            </span>
          </p>
          <button className="bg-primary mt-6 sm:px-24 xss:px-10 py-3 rounded-md xss:text-lg sm:text-xl font-bold text-white">
            Create Your Profile
          </button>
        </div>
        <div className="w-auto md:w-1/2 lg:w-auto">
          {responsiveImageRender({
            ComponentName: "Global",
            Component: Global,
          })}
        </div>
      </div>
    </>
  );
};

Institutions.propTypes = {
  responsiveImageRender: PropTypes.func.isRequired,
};

export default Institutions;
