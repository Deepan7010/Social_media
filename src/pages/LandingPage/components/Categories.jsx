import React from "react";

import { useMediaQuery } from "@react-hook/media-query";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import Biology from "@/assets/svg/biology.svg?react";
import Business from "@/assets/svg/business.svg?react";
import Cs from "@/assets/svg/cs.svg?react";
import Engineering from "@/assets/svg/engineering.svg?react";
import Information from "@/assets/svg/information.svg?react";
import Pharmacy from "@/assets/svg/pharmacy.svg?react";

const categories = [
  { name: "Engineering", iconComponent: Engineering },
  { name: "Computer Science", iconComponent: Cs },
  { name: "Information Technology", iconComponent: Information },
  { name: "Pharmacy", iconComponent: Pharmacy },
  { name: "Biology", iconComponent: Biology },
  { name: "Business Management", iconComponent: Business },
];

const LargeScreenScrollbar = () => {
  return (
    <>
      {/* Horizontal Scrollable Container */}
      <div
        className="w-full mt-5 lg:container space-x-8 py-4 grid grid-rows-2 mx-auto relative snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="absolute lg:bottom-44 xl:bottom-60 left-7 text-white rounded-lg flex items-center justify-center xl:col-span-1">
          <FaArrowLeft size={40} />
          <p className="text-3xl font-bold ml-2">Swipe</p>
        </div>
        {/* First Row: Snap Scrollable */}
        <div className="grid-rows-1 h-[80%] flex gap-8 mx-20">
          {categories.slice(0, 3).map((category, idx) => (
            <div
              key={idx}
              className="min-w-[40%] bg-white text-black p-4 rounded-md shadow-lg snap-start"
            >
              <div className="flex justify-between items-center mx-5 mt-1">
                <p className="font-bold text-xl">{category.name}</p>
                <FaArrowRight color="gray" />
              </div>
              <div className="h-[80%]">
                <category.iconComponent className="mx-auto w-[52%] h-full" />
              </div>
            </div>
          ))}
        </div>
        {/* Second Row: Static Grid */}
        <div className="grid-rows-1 flex gap-8 h-[80%] -mt-6 relative z-20">
          <div className="bg-white text-black p-4 rounded-md shadow-lg ml-36 snap-center min-w-[40%]">
            <div className="flex justify-between items-center mx-5 mt-3">
              <p className="font-bold text-xl">Pharmacy</p>
              <FaArrowRight color="gray" />
            </div>
            <div className="h-[80%]">
              <Pharmacy className="mx-auto w-[52%] h-full" />
            </div>
          </div>
          {categories.slice(4, 6).map((category, idx) => (
            <div
              key={idx}
              className="min-w-[40%] bg-white text-black p-4 rounded-md shadow-lg snap-start"
            >
              <div className="flex justify-between items-center mx-5 mt-1">
                <p className="font-bold text-xl">{category.name}</p>
                <FaArrowRight color="gray" />
              </div>
              <div className="h-[80%]">
                <category.iconComponent className="mx-auto w-[52%] h-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const SmallScreenScrollbar = () => {
  return (
    <>
      {/* Horizontal Scrollable Container */}
      <div
        className="overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="xss:py-6 sm:pt-6 sm:pb-16 flex gap-6 mx-4">
          {categories.map((category, index) => {
            const IconComponent = category.iconComponent;
            return (
              <div
                key={index}
                className="xss:min-w-[80%] xss:max-h-72 sm:min-w-[50%]  bg-white text-black p-4 rounded-md shadow-lg"
              >
                <div className="flex justify-between items-center mx-5 mt-1">
                  <p className="font-bold text-xl">{category.name}</p>
                  <FaArrowRight color="gray" />
                </div>
                <div className="h-[80%] mt-5">
                  {IconComponent ? (
                    <IconComponent className="w-full h-full" />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const Categories = () => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  //console.log("Large screen? ", isLargeScreen);

  return (
    <>
      <div
        style={{ backgroundColor: "#393AF9", scrollbarWidth: "none" }}
        className="text-white w-full xss:mt-10 sm:mt-10 lg:mt-32 mb-5 rounded-tr-none rounded-bl-none lg:rounded-tr-[250px] lg:rounded-bl-[250px] relative z-0 overflow-x-hidden"
      >
        <div className="absolute inset-0 bg-gray-300 opacity-25 bg-cover lg:rounded-tr-[250px] lg:rounded-bl-[250px]"></div>
        <div className="relative z-10">
          <h1 className="text-center xss:pt-4 sm:pt-12 xss:text-3xl sm:text-4xl font-bold">
            Explore Our Categories
          </h1>
          <p className="xss:w-auto sm:w-10/12 xss:mx-2 sm:mx-auto xss:mt-3 sm:mt-6 text-center">
            We publish mission-driven engineering, technology, and scientific
            research that addresses pressing societal issues in line with the
            future. In order to free research paper publication that affects
            thinking, changes policies, and positively impacts lives outside of
            academia, we cooperate with academics who work across disciplines
            and nations as well as with industry.
          </p>
          {isLargeScreen ? <LargeScreenScrollbar /> : <SmallScreenScrollbar />}
        </div>
      </div>
    </>
  );
};

export default Categories;
