/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from "react";

import {
  faHeart as regularHeart,
  faBookmark as regularBookmark,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as solidHeart,
  faBookmark as solidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import toast from "react-hot-toast";
import { BiSolidEditAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import openmojishare from "@/assets/img/openmojishare.png";
import weuieyesonfilled from "@/assets/img/weuieyesonfilled.png";
import api from "@/components/api/api.js";
import { Context } from "@/index.jsx";

const ContextMenu = () => {
  return (
    <div className="absolute top-0 right-4 min-w-[110px] min-h-[30px] w-fit h-fit p-2 backdrop-blur-xl bg-gray-200  bg-opacity-20 rounded-lg">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2 cursor-pointer">
          <BiSolidEditAlt className="text-2xl text-black " />
          <p className="text-md font-semibold">Edit</p>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <RiDeleteBin2Line className="text-2xl text-black " />
          <p className="text-md font-semibold">Delete</p>
        </div>
      </div>
    </div>
  );
};

const PostCard = ({
  name,
  location,
  description,
  image,
  user_id,
  follow,
  post_id,
  likecount,
  like,
  saved,
  profile_img,
  dataFetch,
}) => {
  const { user } = useContext(Context);
  const [views, setViews] = useState(0);
  const navigate = useNavigate();
  const handleView = () => setViews(views + 1);
  const [isPortrait, setIsPortrait] = useState(false);
  const [openPostsContextMenuId, setOpenPostsContextMenuId] = useState(null);
  useEffect(() => {
    handleView();
    isImagePortrait(image);
  }, []);

  const isImagePortrait = (image) => {
    //console.log("Image: ", image);
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const { height, width } = img;
      //console.log("Image dimensions: ", height, width);

      height > width || height == width
        ? setIsPortrait(true)
        : setIsPortrait(false);
    };
    img.onerror = () => {
      console.error("Failed to load image.");
    };
  };

  const handleFollow = async (action) => {
    try {
      const data = new FormData();
      data.append("logged_id", user.id);
      data.append("follow_id", user_id);
      const response = await api.post(action, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      dataFetch(true);
      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-right",
        });
      } else if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
        });
      }
      // window.location.reload();
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        if (error.response.data.message) {
          toast.error(error.response.data.message, {
            position: "top-right",
          });
        } else {
          toast.error(error.response.data.error, {
            position: "top-right",
          });
        }
      }

      console.log(`Errors while ${action} user `, error);
    }
  };

  const handleLike = async (action) => {
    try {
      const data = new FormData();
      data.append("user_id", user.id);
      data.append("post_id", post_id);
      data.append("type", "post");
      const response = await api.post(action, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      dataFetch(true);

      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-right",
        });
      }
      // window.location.reload();
    } catch (err) {
      console.log(err);
      if (err.code === "ERR_BAD_REQUEST") {
        if (err.response.data.message) {
          toast.error(err.response.data.message, {
            position: "top-right",
          });
        } else {
          toast.error(err.response.data.error, {
            position: "top-right",
          });
        }
      }
    }
  };

  const handlesaved = async (action) => {
    try {
      const data = new FormData();
      data.append("user_id", user.id);
      data.append("post_id", post_id);
      data.append("type", "post");
      const response = await api.post(action, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      dataFetch(true);
      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-right",
        });
      } else if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
        });
      }
      // window.location.reload()
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        if (error.response.data.message) {
          toast.error(error.response.data.message, {
            position: "top-right",
          });
        } else {
          toast.error(error.response.data.error, {
            position: "top-right",
          });
        }
      }
      console.log(error);
    }
  };

  return (
    <div className="py-2 mb-8 border-2 rounded-lg h-1/2">
      {/* head */}
      <div className="flex justify-between items-center px-2 xl:px-2 lg:px-0">
        <div className="flex px-1 md:px-1 py-4 items-center xl:px-6 lg:px-4">
          {profile_img ? (
            <img
              src={profile_img}
              alt="Profile"
              onClick={() => navigate(`/profile/${user_id}`)}
              className="w-12 h-12 rounded-full object-cover object-top cursor-pointer"
            />
          ) : (
            <CgProfile
              onClick={() => navigate(`/profile/${user_id}`)}
              className="w-12 h-12 cursor-pointer"
            />
          )}

          <div className="ml-2 lg:ml-4 md:ml-2">
            <div
              className="md:text-lg lg:text-xl font-semibold cursor-pointer"
              onClick={() => navigate(`/profile/${user_id}`)}
            >
              {name}
            </div>
            <div className="text-sm text-gray-500">
              {location || "location"}
            </div>
          </div>
        </div>
        <div className="flex px-0 py-4 items-center relative">
          {user.id !== user_id && (
            <button
              className="text-primary text-base lg:text-lg xl:text-xl mr-1 xl:mr-4 lg:mr-2 md:mr-1"
              onClick={() => handleFollow(follow ? "unfollow" : "follow")}
            >
              {follow ? "Unfollow" : "Follow"}
            </button>
          )}
          {user.id === user_id && (
            <MoreVertIcon
              className="cursor-pointer"
              onClick={() => {
                setOpenPostsContextMenuId(
                  openPostsContextMenuId === post_id ? null : post_id
                );
              }}
            />
          )}
          {openPostsContextMenuId === post_id && <ContextMenu />}
        </div>
      </div>
      {/* body */}
      <div className="flex-col w-auto border-b-gray-200 border-b-2 pb-1">
        <p className="mt-2 px-9 xl:px-9 lg:px-4 text-gray-700">{description}</p>
        {isPortrait ? (
          <img
            src={image}
            alt="Post"
            className="px-3 object-contain mt-2 w-full h-96"
          />
        ) : (
          <img
            src={image}
            alt="Post"
            className="xss:px-3 sm:px-6 xss:object-contain xl:object-fill mt-2 w-full h-96 me-auto"
          />
        )}
      </div>

      <div className="flex justify-between mt-3 mb-2 items-center mx-9">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => handleLike(like ? "unlike" : "like")}
        >
          <FontAwesomeIcon
            icon={like ? solidHeart : regularHeart}
            className="text-red-600"
          />
          <span className="hidden xs:block">
            {likecount} {like ? "Likes" : "Like"}{" "}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <img src={weuieyesonfilled} alt="Views" className="w-6 h-6" />
          <span className="hidden xs:block">{views} Views</span>
        </div>
        <div className="flex items-center space-x-2">
          <img src={openmojishare} alt="Share" className="w-6 h-6" />
          <span className="hidden xs:block">Share</span>
        </div>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => handlesaved(saved ? "deleteSave" : "save")}
        >
          <FontAwesomeIcon
            icon={saved ? solidBookmark : regularBookmark}
            className="text-gray-600"
          />
          <span className="hidden xs:block">{saved ? "Saved" : "Save"}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;