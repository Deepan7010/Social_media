import React, { useContext } from "react";

import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { PiEyeFill, PiFilesDuotone } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

import api from "@/components/api/api.js";
import { Context } from "@/index.jsx";


const Articles = ({ articles, setFetch }) => {
  const { Navigate } = useNavigate();
  const { user } = useContext(Context);
  const handleLike = async (action, id) => {
    try {
      const data = new FormData();
      data.append("user_id", user.id);
      data.append("article_id", id);
      data.append("type", "article");
      const response = await api.post(action, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      // dataFetch(true);
      setFetch(true);
      // window.location.reload()
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
      {articles.length > 0 ? (
        articles.map((art) => (
          <div
            key={art.articleId}
            className="border-2 rounded-lg px-7 md:px-10 py-8 mt-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-bold mb-2 md:mb-6 text-xl">{art.title}</h2>
            </div>
            <div
              className="flex flex-row items-center gap-2 cursor-pointer"
              onClick={() => {
                Navigate(`/profile/${art.articleUserId}`);
              }}
            >
              <img
                src={art.profile_img || "images/Ellipse4.png"}
                alt="Avatar"
                className="object-cover rounded-full w-10 h-10"
              />

              <div className="">
                <h2 className="font-bold">{art.articleUsername}</h2>
                <h2 className="opacity-80">
                  {art.articleUserLocation || "location"}
                </h2>
              </div>
            </div>
            <Link to={`/ArticleDetails/${art.articleId}`}>
              {art.description.length > 130 ? (
                <p className="mt-[1vw] font-medium text-sm text-gray-500">
                  {art.description.slice(0, 130)}...
                </p>
              ) : (
                <p className="mt-[1vw] font-medium text-sm text-gray-500">
                  {art.description}
                </p>
              )}
            </Link>

            <div className="my-[2vw] flex gap-[2vw] items-center">
              <div
                className="flex gap-[0.3vw] items-center hover:cursor-pointer"
                onClick={() =>
                  handleLike(art.am_i_liked ? "unlike" : "like", art.articleId)
                }
              >
                {/* <img src='./images/like.png'></img> */}
                <FontAwesomeIcon
                  icon={art.am_i_liked ? solidHeart : regularHeart}
                  className="text-red-600"
                />
                <h2 className="text-sm ">
                  {art.likeCount} {art.am_i_liked ? "Likes" : "Like"}
                </h2>
              </div>

              <div className="flex gap-[0.3vw] items-center">
                {/* <img src='./images/views.png'></img> */}
                <PiEyeFill size={20} color="gray" />
                <h2 className="text-sm ">Views</h2>
              </div>

              <div className="flex gap-[0.3vw] items-center">
                {/* <img src='./images/pages.png' /> */}
                <PiFilesDuotone size={20} color="gray" />
                <h2 className="text-sm ">50 Pages</h2>
              </div>
            </div>
            {/* {console.log("Article Data: ", art)} */}
            <Link
              to={art?.image}
              rel="noreferrer"
              target="_blank"
              className="bg-[#0000FF] px-[2vw] py-[0.3vw] text-white font-semibold rounded-sm"
            >
              Download
            </Link>
          </div>
        ))
      ) : (
        <p className="mt-5 text-center font-bold">No Articles Available</p>
      )}
    </>
  );
};

export default Articles;
