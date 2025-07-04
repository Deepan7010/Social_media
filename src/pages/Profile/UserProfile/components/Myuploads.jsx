/* eslint-disable no-unused-expressions */
import React, { useContext, useState } from "react";

import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import openmojishare from "@/assets/img/openmojishare.png";
import weuieyesonfilled from "@/assets/img/weuieyesonfilled.png";
import api from "@/components/api/api";
import Loader from "@/components/layout/Loader";
import { Context } from "@/index";

import { ContextMenu } from "../ViewProfile";

const Myuploads = () => {
  const { user, myUploads, setMyUploads, savedFiles, setSavedFiles } =
    useContext(Context);
  const [openPostsContextMenuId, setOpenPostsContextMenuId] = useState(null);
  const [openArticlesContextMenuId, setOpenArticlesContextMenuId] =
    useState(null);
  if (!myUploads) {
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
      {myUploads?.posts.length > 0 &&
        myUploads?.posts.map((post, i) => (
          <div
            key={post.id || i}
            className="sm:p-3 xss:p-3 border-2 border-gray-300 rounded-lg mb-2"
          >
            <div className="flex sm:space-x-3 md:space-x-3 xss:space-x-2 mx-auto xs:border-b-2 pb-2 border-gray-400 border-opacity-35">
              <div className="xss:w-2/6 xs:w-2/6 h-auto md:w-2/6 xl:w-2/6">
                <img
                  src={post.post}
                  alt="Post"
                  className="w-full h-52 object-contain"
                />
              </div>
              <div className="flex justify-between w-full relative">
                <div className="flex flex-col space-y-1">
                  <h4 className="sm:text-xl xss:text-md xss:font-bold sm:font-bold">
                    {post.description}
                  </h4>
                  <p className="sm:text-lg xss:text-md text-gray-600">
                    By {post.PostUsername}
                  </p>
                </div>
                <MoreVertIcon
                  onClick={() => {
                    setOpenPostsContextMenuId(
                      openPostsContextMenuId === post.id ? null : post.id
                    );
                  }}
                  className="text-gray-800 cursor-pointer font-bold text-2xl"
                />
                {openPostsContextMenuId === post.id && <ContextMenu />}
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
                      post.id,
                      "post",
                      { refreshType: "MyUploads" }
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
            </div>
          </div>
        ))}
      {myUploads?.articles.length > 0 &&
        myUploads?.articles.map((post, i) => (
          <div
            key={post.id || i}
            className="sm:p-3 xss:p-3 border-2 border-gray-300 rounded-lg mb-2"
          >
            {/* Content for Saved Files */}
            <div className="flex sm:space-x-3 md:space-x-3 xss:space-x-2 mx-auto xs:border-b-2 border-gray-400 border-opacity-35">
              <div className="flex justify-between w-full relative">
                <div className="flex flex-col space-y-1 w-full">
                  <h4 className="sm:text-xl xss:text-md xss:font-bold sm:font-bold">
                    {post.paper_title}
                  </h4>
                  <p className="sm:text-lg xss:text-md text-gray-600">
                    By {post.authors}
                  </p>
                  <p className="xs:block sm:text-lg text-gray-600">
                    Publication Name: {post.publication_name}
                  </p>
                  <p className="xs:block sm:text-lg text-gray-600">
                    Research Interest: {post.research_interest} | year:{" "}
                    {post.year}
                  </p>

                  <Link
                    to={`${post.image}${post.article}`}
                    rel="noreferrer"
                    target="_blank"
                    className="bg-primary text-white font-bold  py-2 mt-4 rounded px-[2vw] text-center xl:py-[0.3vw] xss:w-[35%] md:w-[25%] lg:w-[35%] xl:w-[25%]"
                  >
                    Download
                  </Link>
                  <br />
                </div>
                <MoreVertIcon
                  onClick={() => {
                    setOpenArticlesContextMenuId(
                      openArticlesContextMenuId === post.id ? null : post.id
                    );
                  }}
                  className="text-gray-800 cursor-pointer font-bold text-2xl"
                />
                {openArticlesContextMenuId === post.id && <ContextMenu />}
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
                      post.id,
                      "article",
                      { refreshType: "MyUploads" }
                    )
                  }
                  icon={post.am_i_liked ? solidHeart : regularHeart}
                  className="text-red-600 cursor-pointer text-xl"
                />
                <span className="sm:text-lg xss:text-base">
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
            </div>
          </div>
        ))}
    </>
  );
};

export default Myuploads;
