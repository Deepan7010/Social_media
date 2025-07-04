/* eslint-disable no-unused-expressions */
import React, { useContext, useState } from "react";

import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as solidHeart,
  faBookmark as solidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

import openmojishare from "@/assets/img/openmojishare.png";
import weuieyesonfilled from "@/assets/img/weuieyesonfilled.png";
import api from "@/components/api/api";
import Loader from "@/components/layout/Loader";
import { Context } from "@/index";

const Savedfiles = () => {
  const [expandDescription, setExpandDescription] = useState(false);
  const { navigate } = useNavigate();

  const { user, myUploads, setMyUploads, savedFiles, setSavedFiles } =
    useContext(Context);

  if (!savedFiles) {
    return <Loader />;
  }
  const handleLike = async (action, post_id, postType, { refreshType }) => {
    try {
      const data = new FormData();
      data.append("user_id", user.id);
      postType === "post"
        ? data.append("post_id", post_id)
        : data.append("article_id", post_id);
      data.append("type", postType);
      console.log("data: ", data);
      const response = await api.post(action, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-right",
        });
        refreshData(refreshType, postType);
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

  const handleRemoveSaved = async (action, post_id, type) => {
    try {
      const data = new FormData();
      data.append("user_id", user.id);
      type === "post"
        ? data.append("post_id", post_id)
        : data.append("article_id", post_id);
      data.append("type", type);
      const response = await api.post(action, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      //dataFetch(true);
      //console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-right",
        });
        type === "post"
          ? refreshData("SavedFiles", "post")
          : refreshData("SavedFiles", "articles");
      } else if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
        });
        type === "post"
          ? refreshData("SavedFiles", "post")
          : refreshData("SavedFiles", "articles");
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

  const refreshData = async (refreshType, typeToUpdate) => {
    try {
      await api
        .post(
          `fetchProfile`,
          { user_id: user.id },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          if (refreshType === "SavedFiles") {
            typeToUpdate === "post"
              ? setSavedFiles({
                  posts: res.data.saved_data.posts || [],
                  articles: savedFiles.articles,
                })
              : setSavedFiles({
                  posts: savedFiles.posts,
                  articles: res.data.saved_data.articles || [],
                });
          } else {
            typeToUpdate === "post"
              ? setMyUploads({
                  posts: res.data.post_upload || [],
                  articles: myUploads.articles,
                })
              : setMyUploads({
                  posts: myUploads.posts,
                  articles: res.data.article_upload || [],
                });
          }
        });
    } catch (error) {
      console.error(`Error while refreshing ${refreshType} data: `, error);
      toast.error(`Error while refreshing ${refreshType} data: `, error);
    }
  };

  return (
    <>
      {savedFiles?.posts?.map((post, i) => (
        <div
          key={post.postid || i}
          className="sm:p-3 xss:p-3 border-2 border-gray-300 rounded-lg mb-2"
        >
          {/* Content for Saved Files */}
          <div className="flex sm:space-x-3 md:space-x-3 xss:space-x-2 mx-auto xs:border-b-2 pb-2 border-gray-400 border-opacity-35">
            <div className="xss:w-2/6 xs:w-2/6 h-auto md:w-2/6 xl:w-2/6">
              <img
                src={post.image}
                alt="Notebook"
                className="w-full h-52 xl:object-cover"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <h4 className="sm:text-xl xss:text-md xss:font-bold sm:font-bold">
                {post.title}
              </h4>
              <p className="sm:text-lg xss:text-md text-gray-600">
                By {post.PostUsername}
              </p>
            </div>
          </div>
          <p className="xss:block xs:hidden xss:text-sm sm:text-lg xss:pb-1 text-gray-600 border-b-2 border-gray-300">
            {post.abstract}
          </p>
          <div className="flex justify-between my-1 items-center sm:mx-9">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                onClick={() =>
                  handleLike(
                    post.am_i_liked ? "unlike" : "like",
                    post.postid,
                    "post",
                    { refreshType: "SavedFiles" }
                  )
                }
                icon={post.am_i_liked ? solidHeart : regularHeart}
                className="text-red-600 cursor-pointer text-xl"
              />
              <span className="lg:text-lg xss:text-base">
                {post.likeCount} {post.am_i_liked ? "likes" : "like"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src={weuieyesonfilled}
                alt="Views"
                className="sm:w-7 sm:h-7 xss:w-5 xss:h-5"
              />
              <span className="text-lg xss:text-base">
                {post.viewsCount == null ? 0 : post.viewsCount} Views
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src={openmojishare}
                alt="Share"
                className="sm:w-7 sm:h-7 xss:h-6 xss:w-6"
              />
              <span className="text-lg xss:text-base">Share</span>
            </div>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() =>
                handleRemoveSaved("deleteSave", post.postid, "post")
              }
            >
              <FontAwesomeIcon icon={solidBookmark} className="text-gray-600" />
              <span>Saved</span>
            </div>
          </div>
        </div>
      ))}
      {savedFiles?.articles?.map((post, i) => (
        <div
          key={post.articleId || i}
          className="sm:p-3 xss:p-3 border-2 border-gray-300 rounded-lg mb-2"
        >
          {/* Content for Saved Files */}
          <div className="flex sm:space-x-3 md:space-x-3 xss:space-x-2 mx-auto border-b-2 border-gray-400 border-opacity-35">
            <div className="flex flex-col space-y-1 sm:px-2 mb-2 w-full ">
              <h4 className="sm:text-xl xss:text-lg xss:font-bold sm:font-bold">
                {post.title}
              </h4>
              <div className="flex md:px-1 py-2 items-center">
                {post.profile_img ? (
                  <img
                    src={post.profile_img}
                    alt="profile"
                    onClick={() => navigate(`/profile/${post.articleUserId}`)}
                    className="h-16 cursor-pointer w-16 rounded-full object-cover object-top"
                  />
                ) : (
                  <CgProfile
                    onClick={() => navigate(`/profile/${post.articleUserId}`)}
                    className="w-16 cursor-pointer h-16 rounded-full object-cover object-top"
                  />
                )}
                <div className="ml-2 lg:ml-4 md:ml-2">
                  <div
                    onClick={() => navigate(`/profile/${post.articleUserId}`)}
                    className="text-lg cursor-pointer lg:text-xl font-semibold"
                  >
                    {post.articleUsername}
                  </div>
                  <div className="text-md text-gray-500">
                    {post.articleUserLocation
                      ? post.articleUserLocation
                      : "location"}
                  </div>
                </div>
              </div>
              <div>
                {post.description.length > 100 ? (
                  <div>
                    <p className="xss:text-md sm:text-lg xss:pb-1 text-gray-600">
                      {expandDescription
                        ? post.description
                        : post.description.slice(0, 100)}
                      <span
                        onClick={() => setExpandDescription(!expandDescription)}
                        className="text-blue-500 cursor-pointer"
                      >
                        {expandDescription ? "...Show Less" : "...Read More"}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="xss:text-md sm:text-lg xss:pb-1 text-gray-600">
                    {post.description}
                  </p>
                )}
              </div>
              <Link
                to={post?.image}
                rel="noreferrer"
                target="_blank"
                className="bg-primary text-white font-bold  py-2 mt-4 rounded px-[2vw] text-center xl:py-[0.3vw] xss:w-[35%] md:w-[25%] lg:w-[35%] xl:w-[25%]"
              >
                Download
              </Link>
            </div>
          </div>
          <div className="flex justify-between my-1 items-center sm:mx-9">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                onClick={() =>
                  handleLike(
                    post.am_i_liked ? "unlike" : "like",
                    post.articleId,
                    "article",
                    { refreshType: "SavedFiles" }
                  )
                }
                icon={post.am_i_liked ? solidHeart : regularHeart}
                className="text-red-600 cursor-pointer text-xl"
              />
              <span className="lg:text-lg xss:text-base">
                {post.likeCount} {post.am_i_liked ? "likes" : "like"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src={weuieyesonfilled}
                alt="Views"
                className="sm:w-7 sm:h-7 xss:w-5 xss:h-5 cursor-pointer"
              />
              <span className="text-lg xss:text-base">
                {post.viewsCount ? post.viewsCount : 1} Views
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src={openmojishare}
                alt="Share"
                className="sm:w-7 sm:h-7 xss:h-6 xss:w-6 cursor-pointer"
              />
              <span className="text-lg xss:text-base">Share</span>
            </div>
            <div
              className="flex items-center space-x-2 "
              onClick={() =>
                handleRemoveSaved("deleteSave", post.articleId, "article")
              }
            >
              <FontAwesomeIcon
                icon={solidBookmark}
                className="text-gray-600 cursor-pointer"
              />
              <span>Saved</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Savedfiles;
