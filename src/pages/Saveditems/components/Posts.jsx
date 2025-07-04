import React, { useState } from "react";

import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { PiEyeFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

import Ellipse4 from "@/assets/img/Ellipse4.png";
import api from "@/components/api/api.js";

const Posts = ({ posts,dataFetch,userDataId }) => {
  const navigate = useNavigate();
  const [isPortrait, setIsPortrait] = useState(false);
  const isImagePortrait = (postImage) => {
    const image = new Image();
    image.src = postImage;
    image.onload = () => {
      const { width, height } = image;
      height > width || width === height
        ? setIsPortrait(true)
        : setIsPortrait(false);
    };
  };

  const handleLike = async (action,postId) => {
    try {
      const data = new FormData();
      data.append("user_id", userDataId);
      data.append("post_id", postId);
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
  return (
    <>
      {posts.length > 0 ? (
        posts.map((post, index) => {
          return (
            <div key={index} className="py-2 mb-10 border-2 rounded-lg mt-5">
              {/* head */}
              <div className="flex justify-between items-center px-2 xl:px-2 lg:px-0">
                <div
                  className="flex px-1 md:px-1 py-4 items-center xl:px-6 lg:px-4 cursor-pointer"
                  onClick={() => {
                    navigate(`/profile/${post.postUserId}`);
                  }}
                >
                  <img
                    src={post.profile_img || Ellipse4}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover object-top"
                  />
                  <div className="ml-2 lg:ml-4 md:ml-2">
                    <div className="md:text-lg lg:text-xl font-semibold">
                      {post.PostUsername}
                    </div>
                    <div className="text-sm text-gray-500">
                      {post.postUserLocation || "location"}
                    </div>
                  </div>
                </div>
              </div>
              {/* body */}
              <div className="flex-col">
                <p className="mt-2 px-9 xl:px-9 lg:px-4 text-gray-700">
                  {post.title}
                </p>
                {isImagePortrait(post.image)}
                <img
                  src={post.image}
                  alt={post.title}
                  className={`${
                    isPortrait
                      ? "px-3 object-contain mt-2 w-full h-96"
                      : "xss:px-3 sm:px-6 xss:object-contain xl:object-fill mt-2 w-full h-96 me-auto"
                  } `}
                />
              </div>
              <div className="flex justify-between mt-3 mb-2 items-center mx-9">
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() =>
                    handleLike(post.am_i_liked ? "unlike" : "like")
                  }
                >
                  <FontAwesomeIcon
                    icon={post.am_i_liked ? solidHeart : regularHeart}
                    className="text-red-600"
                  />
                  <span className="home-like-share-saved">
                    {post.likeCount} {post.am_i_liked ? "Likes" : "Like"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <PiEyeFill size={20} color="gray" />
                  <span className="home-like-share-saved"> Views</span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="mt-5 text-center font-bold">No Posts Available</p>
      )}
    </>
  );
};

export default Posts;
