/* eslint-disable no-unused-expressions */
import React, { useContext } from "react";

import {
  faHeart as regularHeart,
  faBookmark as regularBookmark,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as solidHeart,
  faBookmark as solidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import openmojishare from "@/assets/img/openmojishare.png";
import weuieyesonfilled from "@/assets/img/weuieyesonfilled.png";
import api from "@/components/api/api";
import { Context } from "@/index";

const Articles = ({ articles, userId, setArticles, setPosts }) => {
  const { user } = useContext(Context);
  const handleLike = async (action, post_id, postType, { refreshType }) => {
    try {
      const data = new FormData();
      data.append("user_id", userId);
      postType === "post"
        ? data.append("post_id", post_id)
        : data.append("article_id", post_id);
      data.append("type", postType);
      //console.log("data: ", data);
      const response = await api.post(action, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-right",
        });
        refreshData(refreshType);
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
  const refreshData = async (refreshType) => {
    console.log("In Refresh caller");

    console.log("refreshType: ", refreshType);
    try {
      await api
        .post(
          `fetchProfile`,
          {
            user_id: userId,
            follow_id: user.id,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          //console.log("Data in refreshData: ", res.data);
          refreshType === "Posts"
            ? setPosts(res.data.post_upload == null ? [] : res.data.post_upload)
            : setArticles(
                res.data.article_upload == null ? [] : res.data.article_upload
              );
        });
    } catch (error) {
      console.error(`Error while refreshing ${refreshType} data: `, error);
      toast.error(`Error while refreshing ${refreshType} data: `, error);
    }
  };

  const handlesaved = async (action, post_id, type) => {
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
      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-right",
        });
        type === "post" ? refreshData("Posts") : refreshData("Articles");
      } else if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
        });
        type === "post" ? refreshData("Posts") : refreshData("Articles");
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
    <>
      {articles && articles.length > 0 ? (
        articles.map((post, i) => (
          <div
            key={i}
            className="sm:p-3 xss:p-3 border-2 border-gray-300 rounded-lg mb-2"
          >
            {/* {console.log("Article Data: ", post)} */}
            {/* Content for Saved Files */}
            <div className="flex sm:space-x-3 md:space-x-3 xss:space-x-2 mx-auto xs:border-b-2 border-gray-400 border-opacity-35">
              <div className="flex flex-col space-y-1 w-full">
                <Link to={`/ArticleDetails/${post.id}`}>
                  <div className=" flex items-center">
                    <h4 className="sm:text-xl xss:text-md xss:font-bold sm:font-bold">
                      {post.paper_title}
                    </h4>
                  </div>
                </Link>

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
                  to={post?.image}
                  rel="noreferrer"
                  target="_blank"
                  className="bg-primary text-white font-bold  py-2 mt-4 rounded px-[2vw] text-center xl:py-[0.3vw] xss:w-[30%] md:w-[23%] lg:w-[25%] xl:w-[22%] "
                >
                  Download
                </Link>
              </div>
            </div>
            <p className="xss:block xs:hidden xss:text-sm sm:text-lg xss:pb-1 text-gray-600 border-b-2 border-gray-300">
              {post.abstract}
            </p>

            <div className="flex justify-between my-1 items-center sm:mx-9">
              <div className="flex items-center space-x-2 cursor-pointer">
                <FontAwesomeIcon
                  onClick={() =>
                    handleLike(
                      post.am_i_liked ? "unlike" : "like",
                      post.id,
                      "article",
                      { refreshType: "Articles" }
                    )
                  }
                  icon={post.am_i_liked ? solidHeart : regularHeart}
                  className="text-red-600 cursor-pointer text-xl"
                />
                <span className="lg:text-lg xss:text-base">
                  {post.likeCount} {post.am_i_liked ? "likes" : "like"}
                </span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <img
                  src={weuieyesonfilled}
                  alt="Views"
                  className="sm:w-7 sm:h-7 xss:w-6 xss:h-6"
                />
                <span className="text-lg xss:text-base">
                  {post.viewsCount == null ? 0 : post.viewsCount} Views
                </span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <img
                  src={openmojishare}
                  alt="Share"
                  className="sm:w-8 sm:h-8 xss:h-7 xss:w-7"
                />
                <span className="text-lg xss:text-base">Share</span>
              </div>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() =>
                  handlesaved(
                    post.isSaved ? "deleteSave" : "save",
                    post.id,
                    "article"
                  )
                }
              >
                <FontAwesomeIcon
                  icon={post.isSaved ? solidBookmark : regularBookmark}
                  className="text-gray-600 sm:w-5 sm:h-5"
                />
                <span className="">{post.isSaved ? "Saved" : "Save"}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No Article Uploads yet</p>
      )}
    </>
  );
};

export default Articles;
