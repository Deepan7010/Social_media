import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index.js";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.js";
import HomePage1 from "./HomePage1.js";
import api from "./api.js";
import Createpost from "./Createpost.js";
import { ReactComponent as Photo } from "../assets/svg/photo.svg";
import { ReactComponent as Article } from "../assets/svg/notes.svg";
import { LeftSidebar } from "./LeftSidebar.js";
import { Suggestionsbar } from "./Suggestionsbar.js";
import { CgProfile } from "react-icons/cg";
import { useMediaQuery } from "@react-hook/media-query";
import toast from "react-hot-toast";
import { MdOutlineMessage, MdOutlinePeopleAlt } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";

// Main Component
export const Homepage = () => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useContext(Context);

  // Declare state
  const [showPopup, setShowPopup] = useState(false);
  const [homeFeed, setHomeFeed] = useState({});

  const [suggestions, setSuggestions] = useState([]);
  const [userList, setUserList] = useState([]);
  const [dataFetch, setDataFetch] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const isxsScreen = useMediaQuery("(min-width: 480px) and (max-width: 639px)");

  // Toggle popup state
  const togglePopup = () => setShowPopup(!showPopup);
  //console.log(userList);

  const handleFollow = async (followId) => {
    //console.log("Id to be followed: ", followId);
    try {
      await api
        .post(
          `/follow`,
          {
            logged_id: user.id,
            follow_id: followId,
          },
          {
            headers: {
              withCredentials: true,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message);
          filterSuggestions(followId);
          setDataFetch(true);
        });
    } catch (error) {
      console.log(error);
      toast.error("Error while following User");
    }
  };

  const filterSuggestions = (followId) => {
    const updatedSuggestions = suggestions.filter((suggestion) => {
      return suggestion.id !== followId;
    });
    setSuggestions(updatedSuggestions);
  };
  // Fetch Home Feed
  useEffect(() => {
    const fetchHomeFeed = async () => {
      if (user && user.id) {
        console.log("homeFeed");
        try {
          const response = await api.post(
            "homeFeed",
            { user_id: user.id },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );
          setHomeFeed(response.data.homeFeed);
          setUserList(response.data.userDetails);
          setSuggestions(response.data.homeFeed.suggestions);
          setDataFetch(false);
        } catch (error) {
          console.error("Error fetching home feed:", error);
        }
      }
    };
    if (user && user.id) fetchHomeFeed();
  }, [user, isAuthenticated, dataFetch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const posts = homeFeed.posts || [];
  const articles = homeFeed.articles || [];
  const user_data = userList[0] || [];

  //console.log("Suggestions from api: ", homeFeed.suggestions);

  //console.log("Suggestions:", suggestions);

  return (
    <>
      {isAuthenticated === true && <Navbar />}
      {showPopup && <Createpost closePopup={togglePopup} />}
      <div className={`${showPopup && "z-0"} min-h-screen bg-white`}>
        {/* Popup for Create Post */}
        <LeftSidebar
          user_data={user_data}
          togglePopup={togglePopup}
          showPopup={showPopup}
          post={true}
        />
        <div
          className={`fixed lg:top-24 ${
            isLargeScreen ? "right-3" : "left-5"
          } xl:right-5 md:bottom-5 hidden mt-0.5 lg:mt-3.5 w-1/5 md:flex flex-col lg:flex xl:w-[22vw] lg:w-[26vw] md:w-[32vw] xl:h-fit   md:h-auto lg:h-fit lg:me-5 xl:me-0 py-3 rounded border-2 px-4 md:px-4 lg:px-5`}
        >
          <Suggestionsbar
            suggestedFollowers={suggestions}
            handleFollow={handleFollow}
            enableStories={true}
          />
        </div>
        {/* Main Content Area */}{" "}
        <div className="flex flex-col mx-auto md:ml-auto lg:mx-auto md:mr-10 md:mx-0 w-full px-5 md:px-0 xl:w-[52vw] lg:w-[41vw] md:w-3/5 xl:mt-9 md:mt-2 lg:mt-9 xs:mt-0">
          {/* mobile upload and profile */}
          <div className="border-2 rounded-md mt-3 mb-10 md:hidden">
            {/* Quick Links*/}
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center space-x-2 ">
                <MdOutlinePeopleAlt
                  onClick={() => navigate("/connection")}
                  className="cursor-pointer"
                  size={isxsScreen ? 22 : 24}
                />

                <Link
                  to="/connection"
                  className="font-medium cursor-pointer text-gray-500 xss:hidden xs:block hover:text-blue-600 hover:font-bold transition duration-400 xs:text-sm sm:text-base"
                >
                  Connections
                </Link>
              </div>

              <div className="flex items-center space-x-2">
                <MdOutlineMessage
                  className="cursor-pointer"
                  size={isxsScreen ? 22 : 24}
                />

                <Link
                  to="/Message"
                  className="font-medium text-gray-500 cursor-pointer hover:text-blue-600 xss:hidden xs:block hover:font-bold transition duration-200 xs:text-sm sm:text-base"
                >
                  Message
                </Link>
              </div>

              <div className="flex items-center space-x-2">
                <IoMdNotificationsOutline
                  className="cursor-pointer"
                  size={24}
                />

                <Link
                  to="/Notifications"
                  className="font-medium text-gray-500 cursor-pointer hover:text-blue-600 xss:hidden xs:block hover:font-bold transition duration-200 xs:text-sm sm:text-base"
                >
                  Notifications
                </Link>
              </div>

              <div className="flex items-center space-x-2">
                <FaRegBookmark
                  onClick={() => navigate("/Saved")}
                  className="cursor-pointer"
                  size={isxsScreen ? 22 : 24}
                />

                <Link
                  to="/Saved"
                  className="font-medium cursor-pointer text-gray-500 hover:text-blue-600 xss:hidden xs:block hover:font-bold transition duration-200 xs:text-sm sm:text-base"
                >
                  Saved Items
                </Link>
              </div>
            </div>
            {/* mobile profile */}
            <div className="px-2 my-2 flex gap-2">
              {user.image ? (
                <img
                  src={user.image}
                  alt="User"
                  className="w-20 h-16 rounded-full object-cover cursor-pointer"
                  onClick={()=>navigate("/profileView")}
                />
              ) : (
                <CgProfile
                  className="w-20 h-16 cursor-pointer"
                  onClick={()=>navigate("/profileView")}
                />
              )}
              <input
                type="text"
                placeholder="search"
                className="w-full  border-2 border-gray-500 rounded-full px-7 text-lg outline-none  placeholder-black"
              />
            </div>
            {/* mobile upload */}
            <div className="flex justify-between items-center p-4">
              <button
                className="flex items-center text-gray-500 font-medium px-0 md:px-5 cursor-pointer"
                onClick={togglePopup}
              >
                <Photo width={40} height={30} /> Create Post{" "}
              </button>
              <button
                className="flex items-center text-gray-500 font-medium px-0 md:px-5"
                onClick={() => navigate("/Upload")}
              >
                <Article width={40} height={30} /> Upload
              </button>
            </div>
          </div>
          {/* Main Content Components Here */}
          <HomePage1
            posts={posts}
            articles={articles}
            dataFetch={setDataFetch}
          />
        </div>
        {/* Suggestions Sidebar */}
      </div>
    </>
  );
};

export default Homepage;
