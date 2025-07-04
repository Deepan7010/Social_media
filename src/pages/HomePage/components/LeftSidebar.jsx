import React from "react";

import SidebarLinks from "../../../components/layout/SidebarLinks";
export const LeftSidebar = ({ togglePopup, showPopup, post }) => {
  //console.log(user_data, "user_data in left sidebar");
  return (
    <div
      className={`${
        showPopup && "z-0"
      } md:block fixed md:top-16 lg:top-24 mb-2 left-0 w-1/5 lg:w-[26vw] xl:w-[22vw] md:w-[32vw] md:ms-5 lg:ms-5 ms-10 h-fit`}
    >
      <SidebarLinks homepage={true} />

      {/* Create Post Button */}
      {post && (
        <div className="mt-2 ">
          <button
            onClick={togglePopup}
            className="bg-primary hidden md:block text-white rounded-lg py-2 px-6 hover:bg-blue-700 w-full"
          >
            Create Post
          </button>
        </div>
      )}
    </div>
  );
};
