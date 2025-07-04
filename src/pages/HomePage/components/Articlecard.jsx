import React, { useState, useEffect, useContext } from "react";

import {
  faHeart as regularHeart,
  faBookmark as regularBookmark,
} from "@fortawesome/free-regular-svg-icons";
import {
  faEye,
  faShareAlt,
  faHeart as solidHeart,
  faBookmark as solidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import toast from "react-hot-toast";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

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

const ArticleCard = ({
  title,
  description,
  author,
  user_id,
  follow,
  article_id,
  likecount,
  like,
  saved,
  dataFetch,
  articleUrl,
}) => {
  // user_id => user follow user_id
  // follow => already follow or not check
  const { user } = useContext(Context);
  const [views, setViews] = useState(0);
  const [expandDescription] = useState(false);
  const [openArticlesContextMenuId, setOpenArticlesContextMenuId] =
    useState(null);
  // const handleLike = () => setLiked(!liked);
  const handleView = () => setViews(views + 1);
  const navigate = useNavigate();
  useEffect(() => {
    handleView();
  }, []);

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
      // console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-right",
        });
      } else if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
        });
      }
      // console.log(response)
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
      data.append("article_id", article_id);
      data.append("type", "article");
      const response = await api.post(action, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      dataFetch(true);
      // window.location.reload()
      // console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-right",
        });
      } else if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
        });
      }
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

  const handlesaved = async (action) => {
    try {
      const data = new FormData();
      data.append("user_id", user.id);
      data.append("article_id", article_id);
      data.append("type", "article");
      const response = await api.post(action, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      dataFetch(true);
      // console.log(response);
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
    <div className="bg-white shadow-lg  px-4 mb-8  py-2  border-2 rounded-lg">
      <div className="xss:flex-col md:flex md:flex-row justify-between xss:items-start md:items-center">
        <Link
          to={`/ArticleDetails/${articleUrl}`}
          className="text-2xl font-semibold pe-5"
        >
          {title}
        </Link>
        <div className="flex xss:py-1 md:py-3 xss:justify-between md:justify-between xl:justify-normal items-center">
          <div className="flex gap-1 text-sm text-gray-500 md:hidden">
            By
            <p
              className="cursor-pointer"
              onClick={() => navigate(`/profile/${user_id}`)}
            >
              {author}
            </p>
          </div>
          <div className="flex relative">
            {user.id !== user_id && (
              <button
                className="text-primary text-base  lg:text-lg xl:text-xl mr-4"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFollow(follow ? "unfollow" : "follow");
                }}
              >
                {follow ? "Unfollow" : "Follow"}
              </button>
            )}
            {user.id === user_id && (
              <MoreVertIcon
                className="cursor-pointer"
                onClick={() => {
                  setOpenArticlesContextMenuId(
                    openArticlesContextMenuId === article_id ? null : article_id
                  );
                }}
              />
            )}
            {openArticlesContextMenuId === article_id && <ContextMenu />}
          </div>
        </div>
      </div>
      <div className="hidden mb-1 gap-1 text-sm text-gray-500 md:flex">
        By
        <p
          className="cursor-pointer"
          onClick={() => navigate(`/profile/${user_id}`)}
        >
          {author}
        </p>
      </div>
      {description.length > 100 ? (
        <div className="xss:text-md sm:text-lg xss:pb-1 text-gray-600 text-wrap">
          <span
            onClick={() => navigate(`/ArticleDetails/${articleUrl}`)}
            className="cursor-pointer"
          >
            {expandDescription ? description : description.slice(0, 130)}
          </span>
          <span
            onClick={() => navigate(`/ArticleDetails/${articleUrl}`)}
            className="text-lg cursor-pointer"
          >
            ......
          </span>
        </div>
      ) : (
        <p
          onClick={() => navigate(`/ArticleDetails/${articleUrl}`)}
          className="xss:text-md sm:text-lg xss:pb-1 text-gray-600 cursor-pointer"
        >
          {description}
        </p>
      )}
      <div className="flex justify-between mt-2 py-1 px-5 border-t-2 border-gray-200">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => handleLike(like ? "unlike" : "like")}
        >
          <FontAwesomeIcon
            icon={like ? solidHeart : regularHeart}
            className="text-red-600"
          />
          <span className="hidden xs:block">
            {likecount} {like ? "Likes" : "Like"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faEye} className="text-gray-600" />
          <span className="hidden xs:block">{views} Views</span>
        </div>
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faShareAlt} className="text-gray-600" />
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

export default ArticleCard;
