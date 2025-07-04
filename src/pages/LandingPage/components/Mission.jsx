import React from "react";

import PropTypes from "prop-types";

import Innovate from "@/assets/svg/innovate.svg?react";
import Research from "@/assets/svg/research.svg?react";

const Mission = ({ responsiveImageRender, windowWidth }) => {
  return (
    <div className="mx-0 md:mx-10 xss:my-10 md:mt-24">
      <h1 className="text-center xss:text-3xl sm:text-4xl font-bold">
        Discover Our Mission
      </h1>
      <div className="flex-col flex md:flex-row lg:mx-auto xl:mx-10 xss:mx-3 xs:mx-6 md:mx-auto justify-center items-center lg:justify-normal md:gap-10">
        <div className="md:w-1/2 xss:w-auto">
          {responsiveImageRender({
            ComponentName: "Innovate",
            Component: Innovate,
          })}
        </div>
        <div className="w-full">
          <h4 className="xss:text-3xl sm:text-4xl font-bold">
            Innovate, Connect, Publish
          </h4>
          <p className="mt-5 xss:text-md sm:text-lg text-gray-500">
            Your work will impact international journal researchers outside your
            field and potentially increase exposure. With open access, any
            international journal researcher can read and create on the findings
            of others without impediment and without paying any fee,
            accelerating the author&apos;s discoveries among all.
          </p>
        </div>
      </div>
      <div className="flex-col-reverse flex md:flex-row mt-5 md:mt-0 xss:mx-3 xs:mx-6 md:mx-auto lg:mx-auto xl:mx-10 justify-center items-center gap-10">
        <div className="w-full">
          {windowWidth < 1024 ? (
            <h4 className="xss:text-3xl sm:text-4xl font-bold">
              Uniting Researchers for a Better Tomorrow
            </h4>
          ) : (
            <h4 className="xss:text-3xl sm:text-4xl font-bold">
              Uniting Researchers for a <br /> Better Tomorrow
            </h4>
          )}

          <p className="mt-5 xss:text-md sm:text-lg text-gray-500 pr-5">
            Increase your work&apos;s visibility, availability, and readership
            online, which attracts good citations through international journal
            papers. All articles are evaluated using standards, including the
            international research publication or ideas&apos; excellence,
            novelty, and significance.
          </p>
        </div>
        <div className="md:w-1/2 xss:w-auto">
          {responsiveImageRender({
            ComponentName: "Research",
            Component: Research,
          })}
        </div>
      </div>
    </div>
  );
};

Mission.propTypes = {
  responsiveImageRender: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,

};

export default Mission;
