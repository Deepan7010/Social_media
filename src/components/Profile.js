import React, { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { RiDeleteBin2Line } from "react-icons/ri";
import api from "./api";
import { Context } from "../index";
import toast from "react-hot-toast";
import { VscFeedback } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { Suggestionsbar } from "./Suggestionsbar";
import { MdOutlineMessage, MdOutlinePeopleAlt } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
const Profile = () => {
  const { user, profileData, isAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  !isAuthenticated && navigate("/");

  const [activeTab, setActiveTab] = useState("followers");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [suggestedFollowers, setSuggestedFollowers] = useState([]);

  const [isDatafetched, setIsDataFetched] = useState(true);

  const handleSuggestedFollowers = async (newData) => {
    //console.log("suggestions Data in api now: ", suggestedFollowers);

    //console.log("New Data: ", newData);
    if (suggestedFollowers.length > 0) {
      const updatedSuggestions = [...suggestedFollowers],
        includedNames = [];
      suggestedFollowers.forEach((suggestion) => {
        includedNames.push(suggestion.name);
      });
      newData.forEach((newSuggestion) => {
        if (!includedNames.includes(newSuggestion.name)) {
          updatedSuggestions.push(newSuggestion);
        }
      });
      setSuggestedFollowers(updatedSuggestions);
    } else {
      setSuggestedFollowers(...suggestedFollowers, newData);
    }
  };
  const fetchFollowingData = async () => {
    try {
      await api
        .post(
          "/connection",
          {
            follow_id: user?.id,
            type: "follow",
          },
          {
            headers: {
              withCredentials: true,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("Following Data in response: ", res.data.suggestion);
          setFollowing(res.data.follow);
          handleSuggestedFollowers(
            res.data.suggestion.length > 0 ? res.data.suggestion : []
          );

          setIsDataFetched(false);
        });
    } catch (error) {
      console.log("Error fetching the Following Data: ", error);
    }
  };
  const fetchFollowersData = async () => {
    try {
      await api
        .post(
          "/connection",
          {
            follow_id: user?.id,
            type: "followers",
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
          setFollowers(res.data.followers);
          handleSuggestedFollowers(
            res.data.suggestion.length > 0 ? res.data.suggestion : []
          );
          setIsDataFetched(false);
        });
    } catch (error) {
      console.log("Error fetching the Followers Data: ", error);
    }
  };

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
          setIsDataFetched(true);
          filterSuggestions(followId);
        });
    } catch (error) {
      console.log(error);
      toast.error("Error while following User");
    }
  };

  const handleRemoveFollowing = async (unfollowId) => {
    console.log("Id to be Unfollowed: ", unfollowId);

    try {
      await api
        .post(
          `/unfollow`,
          {
            logged_id: user.id,
            follow_id: unfollowId,
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
          setIsDataFetched(true);
        });
    } catch (error) {
      console.log(error);
      toast.error("Error while Unfollowing User");
    }
  };

  const handleRemoveFollower = async (unfollowerId) => {
    console.log("Id to be Unfollowed: ", unfollowerId);

    try {
      await api
        .post(
          `/unfollow`,
          {
            logged_id: unfollowerId,
            follow_id: user.id,
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
          toast.success("Succesfully Removed Follower");
          setIsDataFetched(true);
        });
    } catch (error) {
      console.log(error);
      toast.error("Error while Removing Follower");
    }
  };

  const filterSuggestions = (followId) => {
    const updatedSuggestions = suggestedFollowers.filter((suggestion) => {
      return suggestion.id !== followId;
    });
    setSuggestedFollowers(updatedSuggestions);
  };

  useEffect(() => {
    if (!isDatafetched) return;
    fetchFollowingData();
    fetchFollowersData();
  }, [isDatafetched]);

  // console.log("Followers Data: ", followers);
  // console.log("Following Data: ", following);
  //console.log("Suggestions Data Global: ", suggestedFollowers);
  // console.log("profile Data: ", profileData);

  return (
    <div>
      <Navbar />

      <div className="w-full mx-auto flex justify-end">
        <div className="xss:my-[5vw] sm:my-[2vw] w-full flex xss:flex-col xss:space-y-5 lg:space-y-0  lg:flex-row  xss:mx-2 xs:mx-4 sm:mx-10 lg:mx-5 xl:mx-8">
          <div className="xss:w-full lg:w-[25vw] xl:w-[22vw] border-[2px] border-opacity-85 rounded-xl flex xss:flex-col xs:flex-row lg:flex-col lg:h-fit">
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

            <div className="w-auto lg:w-auto flex flex-col mx-auto lg:mx-6 justify-center items-center lg:justify-start lg:items-start space-y-5 md:space-y-9 lg:space-y-8 my-4 lg:my-5 md:my-14">
              {[
                {
                  destination: "/connection",
                  text: "My Connections",
                  icon: <MdOutlinePeopleAlt size={28} />,
                },
                {
                  destination: "/Message",
                  text: "Message",
                  icon: <MdOutlineMessage size={25} />,
                },
                {
                  destination: "/Notifications",
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
                  >
                    {item.text}
                  </Link>
                  {/* <p className={`text-lg ${item.color}`}>{item.text}</p> */}
                </div>
              ))}
            </div>
          </div>

          <div className="xss:h-auto lg:h-fit xss:w-full lg:w-[65%] mx-auto">
            <div className="flex xs:gap-1 sm:gap-2 w-full justify-center rounded">
              <button
                className={`xs:px-3 py-1 mb-2 w-1/3 font-bold border-b-2 sm:text-2xl xss:text-lg ${
                  activeTab === "followers"
                    ? "border-gray-500 text-gray-500"
                    : "border-primary  text-primary"
                }`}
                onClick={() => setActiveTab("followers")}
              >
                Followers
              </button>
              <button
                className={`xs:px-3 py-1 mb-2 w-1/3 font-bold border-b-2 sm:text-2xl xss:text-lg ${
                  activeTab === "following"
                    ? "border-gray-500  text-gray-500"
                    : "border-primary text-primary "
                }`}
                onClick={() => setActiveTab("following")}
              >
                Following
              </button>
              <button
                className={`xs:px-3 py-1 mb-2 w-1/3 font-bold border-b-2 sm:text-2xl xss:text-lg ${
                  activeTab === "suggestions"
                    ? "border-gray-500 text-gray-500"
                    : "border-primary  text-primary"
                }`}
                onClick={() => setActiveTab("suggestions")}
              >
                Suggestions
              </button>
            </div>

            {activeTab === "followers" ? (
              <div className="h-fit">
                {followers?.length > 0 ? (
                  followers.map((follower) => (
                    <div
                      key={follower.id}
                      className="xss:w-[90%] xs:w-[80%] lg:w-[60%] mx-auto mt-3 flex justify-between items-center"
                    >
                      <div className="flex gap-3 items-center ml-3">
                        <div className="xss:w-10 xss:h-12 sm:w-12 sm:h-14">
                          {follower.image ? (
                            <img
                              src={`${follower.image}`}
                              onClick={() =>
                                navigate(`/profile/${follower.id}`)
                              }
                              alt="Avatar"
                              className="h-full w-full object-cover rounded-full cursor-pointer"
                            />
                          ) : (
                            <CgProfile
                              onClick={() =>
                                navigate(`/profile/${follower.id}`)
                              }
                              className="xss:w-10 xss:h-12 sm:w-12 sm:h-14 cursor-pointer"
                            />
                          )}
                        </div>
                        <p
                          className="text-[#000] justify-start sm:text-xl font-semibold cursor-pointer"
                          onClick={() => navigate(`/profile/${follower.id}`)}
                        >
                          {follower.name}
                        </p>
                      </div>
                      <RiDeleteBin2Line
                        onClick={() => handleRemoveFollower(follower.id)}
                        className="xss:text-3xl cursor-pointer sm:text-4xl text-black  rounded-xl p-1  mr-5 mb-2"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-center text-lg font-semibold mt-5">
                    No Followers Found
                  </p>
                )}
              </div>
            ) : (
              <></>
            )}
            {activeTab === "following" ? (
              <div className="h-fit">
                {following?.length > 0 ? (
                  following.map((follow) => (
                    <div
                      key={follow.id}
                      className="xss:w-[90%] xs:w-[80%] lg:w-[60%] mx-auto mt-3 flex justify-between items-center"
                    >
                      <div className="flex gap-3 items-center ml-3">
                        <div className="xss:w-10 xss:h-12 sm:w-12 sm:h-14">
                          {follow.image ? (
                            <img
                              src={`${follow.image}`}
                              onClick={() => navigate(`/profile/${follow.id}`)}
                              alt="Avatar"
                              className="h-full w-full object-cover rounded-full cursor-pointer"
                            />
                          ) : (
                            <CgProfile
                              onClick={() => navigate(`/profile/${follow.id}`)}
                              className="xss:w-10 xss:h-12 sm:w-12 sm:h-14 cursor-pointer"
                            />
                          )}
                        </div>
                        <p
                          className="text-[#000] sm:text-xl font-semibold cursor-pointer"
                          onClick={() => navigate(`/profile/${follow.id}`)}
                        >
                          {follow.name}
                        </p>
                      </div>
                      <RiDeleteBin2Line
                        className="xss:text-3xl sm:text-4xl cursor-pointer text-black rounded-xl p-1  mr-5 mb-2"
                        onClick={() => handleRemoveFollowing(follow.id)}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-center text-lg font-semibold mt-5">
                    Not Following Anyone yet.
                  </p>
                )}
              </div>
            ) : (
              <></>
            )}
            {activeTab === "suggestions" ? (
              <div className="h-fit">
                {suggestedFollowers?.length > 0 ? (
                  suggestedFollowers.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="xss:w-[90%] xs:w-[80%] lg:w-[60%] mx-auto mt-3 flex justify-between items-center"
                    >
                      <div className="flex gap-3 items-center ml-3">
                        <div className="xss:w-10 xss:h-12 sm:w-12 sm:h-14">
                          {suggestion.image ? (
                            <img
                              src={`${suggestion.image}`}
                              onClick={() =>
                                navigate(`/profile/${suggestion.id}`)
                              }
                              alt="Avatar"
                              className="h-full w-full object-cover rounded-full cursor-pointer"
                            />
                          ) : (
                            <CgProfile
                              onClick={() =>
                                navigate(`/profile/${suggestion.id}`)
                              }
                              className="xss:w-10 xss:h-12 sm:w-12 sm:h-14 cursor-pointer"
                            />
                          )}
                        </div>
                        <p
                          className="text-[#000] justify-start sm:text-xl font-semibold cursor-pointer"
                          onClick={() => navigate(`/profile/${suggestion.id}`)}
                        >
                          {suggestion.name}
                        </p>
                      </div>
                      <button
                        onClick={() => handleFollow(suggestion.id)}
                        className="bg-primary text-white px-4 py-1 rounded-lg mr-5 mb-2"
                      >
                        Follow
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-lg font-semibold mt-5">
                    No Suggestions Found
                  </p>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
