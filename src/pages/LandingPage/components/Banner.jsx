import React, { useContext } from "react";

import { FaArrowRight } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

import part1 from "@/assets/svg/part1.svg";
import { Context } from "@/index";

const Banner = () => {
  const { setBtn, setPopup } = useContext(Context);
  return (
    <div className="w-auto h-full items-center mx-2 md:mx-10 md:grid md:grid-cols-2">
      <div className="px-5 my-5 w-full grid-cols-1">
        <div className="flex gap-2 border-2 border-gray-400 rounded-md w-full xss:w-full sm:w-1/2 md:w-full lg:w-2/3 xl:w-1/2 py-2 text-xl text-gray-400 font-medium ">
          <FiSearch className="ml-3 mt-1" size={30} color="#6b7280" />
          <input
            type="text"
            className="text-xl text-gray-400 font-medium outline-none w-full"
            placeholder="What are you Looking for?"
          />
        </div>
        <h1 className="mt-10 text-5xl font-bold">
          Elevate Your Research, Expand
        </h1>
        <p className="mt-2  text-gray-400 text-4xl font-bold">Your Network</p>
        <p className="mt-4 text-lg text-gray-500 ">
          Focused to publishing significant research. Let’s make a Positive{" "}
          <br></br>change, together. Are you in?
        </p>
        <button
          className="mt-10 bg-primary text-white px-6 py-3 text-md rounded-md flex font-semibold items-center"
          onClick={() => {
            setPopup(true);
            setBtn("login");
          }}
        >
          Upload Your Article <FaArrowRight className="ml-3" />
        </button>
      </div>
      <div className="grid-cols-1 hidden justify-end md:flex">
        <img src={part1} alt="img" width={750} />
      </div>
    </div>
  );
};

export default Banner;
