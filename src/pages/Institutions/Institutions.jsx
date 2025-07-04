import React from "react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const Institutions = () => {
  return (
    <div>
      <Navbar />

      {/* <div className='mt-[7vw] h-[2px] w-[95%] mx-auto bg-black opacity-20'></div> */}

      <div className="w-[90%] mx-auto mt-[2vw] flex justify-between">
        <div className="w-[80%]">
          <div className="relative">
            <img
              className="absolute top-3 left-3 h-[1.5vw] w-[1.5vw]"
              src="./images/carbonSearch.png"
            />
            <input
              className="w-[40vw] border-[1.5px] placeholder:font-thin border-black py-2 pl-[3vw] rounded-[9px] border-opacity-20"
              placeholder="Search for Journals"
            />
          </div>

          <div className="relative mt-[1vw] w-[63vw] flex gap-[1.5vw] p-5 h-[15vw] rounded-[9px] border-opacity-20 border-[1.5px] border-black">
            <button className="bg-[#0000FF] text-white font-semibold text-sm py-[0.5vw] px-[1.5vw] rounded-[4px] bottom-4 right-4 absolute">
              View More{" "}
            </button>
            <div className="">
              <img className="" src="./images/bookimage.png" />
            </div>
            <div className="leading-[2.5vw]">
              <h3 className="font-semibold">INSTITUTE NAME</h3>
              <h3 className="font-semibold">LOCATION</h3>
              <h3 className="opacity-50">
                Publications: Citations: Conferences/Seminar:{" "}
              </h3>
              <h3 className="opacity-50">SCHOLARS: </h3>
              <h3 className="opacity-50">ALUMNUS: </h3>
            </div>
          </div>

          <div className="relative mt-[1vw] w-[63vw] flex gap-[1.5vw] p-5 h-[15vw] rounded-[9px] border-opacity-20 border-[1.5px] border-black">
            <button className="bg-[#0000FF] text-white font-semibold text-sm py-[0.5vw] px-[1.5vw] rounded-[4px] bottom-4 right-4 absolute">
              View More{" "}
            </button>
            <div className="">
              <img className="" src="./images/bookimage.png" />
            </div>
            <div className="leading-[2.5vw]">
              <h3 className="font-semibold">INSTITUTE NAME</h3>
              <h3 className="font-semibold">LOCATION</h3>
              <h3 className="opacity-50">
                Publications: Citations: Conferences/Seminar:{" "}
              </h3>
              <h3 className="opacity-50">SCHOLARS: </h3>
              <h3 className="opacity-50">ALUMNUS: </h3>
            </div>
          </div>

          <div className="relative mt-[1vw] w-[63vw] flex gap-[1.5vw] p-5 h-[15vw] rounded-[9px] border-opacity-20 border-[1.5px] border-black">
            <button className="bg-[#0000FF] text-white font-semibold text-sm py-[0.5vw] px-[1.5vw] rounded-[4px] bottom-4 right-4 absolute">
              View More{" "}
            </button>
            <div className="">
              <img className="" src="./images/bookimage.png" />
            </div>
            <div className="leading-[2.5vw]">
              <h3 className="font-semibold">INSTITUTE NAME</h3>
              <h3 className="font-semibold">LOCATION</h3>
              <h3 className="opacity-50">
                Publications: Citations: Conferences/Seminar:{" "}
              </h3>
              <h3 className="opacity-50">SCHOLARS: </h3>
              <h3 className="opacity-50">ALUMNUS: </h3>
            </div>
          </div>
        </div>
        <div className="w-[30%] h-[16vw] px-[2vw] py-[2vw] border-[2px] border-opacity-85 rounded-xl">
          <h2 className="text-lg font-semibold">Filter</h2>
          <div className="my-[1vw] bg-black h-[0.1vw] opacity-10"></div>

          <div className="flex justify-between items-center">
            <h3 className="text-xl">Research Area</h3>
            <img src="./images/downarrow.png"></img>
          </div>

          <div className="my-[1vw] bg-black h-[0.1vw] opacity-20"></div>

          <div className="flex justify-between items-center">
            <h3 className="text-xl">Institution Type</h3>
            <img src="./images/downarrow.png"></img>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Institutions;
