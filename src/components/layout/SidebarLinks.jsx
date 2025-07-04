import React, { useContext } from "react";

import { CgProfile } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineMessage, MdOutlinePeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";

import { Context } from "@/index.jsx";

const SidebarLinks = ({ homepage }) => {
  const { user, setPopup } = useContext(Context);
  return (
    <div
      className={`${
        homepage
          ? "bg-white rounded border-2 h-4/5 hidden md:flex lg:flex flex-col w-full px-8 mt-0.5 md:mt-0.5 lg:mt-3.5  md:px-1 lg:px-8 py-5"
          : "xss:w-11/12 mx-auto mt-10 w-11/12 lg:w-[25vw] xl:w-[22vw] border-[2px] border-opacity-85 rounded-xl flex xss:flex-col xs:flex-row lg:flex-col lg:h-fit"
      }`}
    >
      <div className="flex flex-col mx-auto items-center justify-center gap-[0.2vw] mt-[2vw] xs:ml-auto xs:my-auto lg:mt-4 lg:mx-auto">
        <div className="xss:w-24 xss:h-auto">
          {user?.image ? (
            <img
              src={user?.image}
              alt="Avatar"
              className="h-24 w-24 object-cover rounded-full"
            />
          ) : (
            <CgProfile className="w-24 h-24 object-cover rounded-full" />
          )}
        </div>
        <h2 className="font-semibold text-xl">{user.name}</h2>
      </div>

      <div
        className={`${
          homepage
            ? "flex flex-col justify-around h-4/5  mb-2 px-0 md:px-2 md:space-y-4 lg:px-0 xl:space-y-9"
            : "w-auto lg:w-auto flex flex-col mx-auto lg:mx-6 justify-center items-center lg:justify-start lg:items-start space-y-5 md:space-y-9 lg:space-y-8 my-4 lg:my-5 md:my-14"
        }`}
      >
        {[
          {
            destination: "/connection",
            text: "My Connections",
            icon: <MdOutlinePeopleAlt size={28} />,
          },
          {
            destination: "#",
            text: "Message",
            icon: <MdOutlineMessage size={25} />,
          },
          {
            destination: "#",
            text: "Notifications",
            icon: <IoMdNotificationsOutline size={28} />,
          },
          {
            destination: "/saved",
            text: "Saved Items",
            icon: <FaRegBookmark size={22} />,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="w-full flex items-center gap-2 justify-start font-semibold hover:cursor-pointer"
          >
            {item.icon}
            <Link
              to={item.destination}
              className="font-semibold text-blue-600"
              onClick={() => setPopup(false)}
            >
              {item.text}
            </Link>
            {/* <p className={`text-lg ${item.color}`}>{item.text}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarLinks;
