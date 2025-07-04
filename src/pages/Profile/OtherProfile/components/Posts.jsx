/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect, useState } from "react";

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
import { CgProfile } from "react-icons/cg";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";

import openmojishare from "@/assets/img/openmojishare.png";
import weuieyesonfilled from "@/assets/img/weuieyesonfilled.png";
import api from "@/components/api/api";
import { Context } from "@/index";

const ImageContainer = ({ image }) => {
  const [isPortrait, setIsPortrait] = useState(false);
  useEffect(() => {
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

      height > width || height === width
        ? setIsPortrait(true)
        : setIsPortrait(false);
    };
    img.onerror = () => {
      console.error("Failed to load image.");
    };
  };
  return (
    <>
      {isPortrait ? (
        <img
          src={image}
          alt="Post"
          className="object-contain mt-2 w-full xss:h-auto xs:h-96 py-3"
        />
      ) : (
        <img
          src={image}
          alt="Post"
          className="xss:object-contain xl:object-fill mt-2 w-full xss:h-auto sm:h-96 me-auto py-3"
        />
      )}
    </>
  );
};

const Posts = ({
  otherProfileData,
  posts,
  userId,
  setArticles,
  setPosts,
  activeTab,
}) => {
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
      {posts && posts.length > 0
        ? posts.map((post, index) => (
            <div
              id={index}
              className="books flex flex-col space-y-4"
              key={index}
            >
              {console.log("Post Data: ", post)}
              <div className="flex flex-col w-auto h-auto xss:px-3 xs:px-4 py-4 border rounded-lg shadow-sm bg-white mr-4z">
                <div className="flex items-center justify-between space-x-4 border-b border-gray-200 pb-4">
                  <div className="flex items-center xss:space-x-2 sm:space-x-4 sm:ml-4">
                    <div className="w-16 h-16">
                      {otherProfileData?.image ? (
                        <img
                          src={otherProfileData?.image}
                          alt="User profile"
                          className="rounded-full object-cover w-full h-full"
                        />
                      ) : (
                        <CgProfile className="w-16 h-16" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-600 mb-1">
                        {otherProfileData?.name}
                      </h2>
                      <p className="text-lg text-gray-500">
                        {otherProfileData?.country}
                      </p>
                    </div>
                  </div>
                  <PiDotsThreeOutlineVertical className="h-8 w-8 mr-6" />
                </div>
                <div className="mt-4 px-2 border-b-[1.4px] border-gray-200">
                  <p className="text-xl text-gray-500 font-medium mb-2">
                    {post.description}
                  </p>
                  <ImageContainer image={post.post} />
                </div>
                <div className="flex justify-between my-1 items-center sm:mx-9 ">
                  <div className="flex items-center space-x-1">
                    <FontAwesomeIcon
                      onClick={() =>
                        handleLike(
                          post.am_i_liked ? "unlike" : "like",
                          post.id,
                          "post",
                          { refreshType: "Posts" }
                        )
                      }
                      icon={post.am_i_liked ? solidHeart : regularHeart}
                      className="text-red-600 cursor-pointer text-xl"
                    />
                    <span className="sm:text-lg xss:text-base">
                      {post.likeCount} {post.am_i_liked ? "likes" : "like"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <img
                      src={weuieyesonfilled}
                      alt="Views"
                      className="sm:w-7 sm:h-7 xss:w-5 xss:h-5"
                    />
                    <span className="text-lg xss:text-base">
                      {post.viewsCount == null ? 0 : post.viewsCount} Views
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
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
                      handlesaved(
                        post.isSaved ? "deleteSave" : "save",
                        post.id,
                        "post"
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={post.isSaved ? solidBookmark : regularBookmark}
                      className="text-gray-600"
                    />
                    <span className="hidden xs:block">
                      {post.isSaved ? "Saved" : "Save"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : activeTab === "Posts" && <p>No Post Uploads yet</p>}
    </>
  );
};

export default Posts;
