import React, { useContext, useEffect, useState } from "react";

import {
  faHeart as regularHeart,
  faBookmark as regularBookmark,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as solidHeart,
  faShareAlt,
  faBookmark as solidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { FiShare2 } from "react-icons/fi";
import { LiaDownloadSolid } from "react-icons/lia";
import { PiEyeFill, PiFilesDuotone } from "react-icons/pi";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "@/components/api/api";
import Navbar from "@/components/layout/Navbar";
import { Context } from "@/index";

const Articledetails = () => {
  const { id } = useParams();
  const { user, isAuthenticated, token } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    !isAuthenticated && navigate("/");
  }, [isAuthenticated]);
  //console.log("Id in params:", id);

  const [article, setArticle] = useState([]);
  const [fetch, setFetch] = useState(true);
  const [suggestion, setSuggestion] = useState([]);
  const [follow, setFollow] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.post(
          "fetchArticle",
          {
            id: id,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Assuming user.token contains the JWT token
            },
          }
        );
        setArticle(response.data.article);
        setSuggestion(response.data.suggestion);
        setFollow(response.data.follow);
        console.log(response.data.follow);
        setFetch(false);
        // console.log(response.data.article);
      } catch (error) {
        console.error(error);
      }
    };
    if (id && fetch === true) fetchArticle();
  }, [id, fetch]);

  //console.log(article, "article");

  const handlesaved = async (action, art_id) => {
    try {
      const data = new FormData();
      data.append("user_id", user.id);
      data.append("article_id", art_id);
      data.append("type", "article");
      const response = await api.post(action, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      setFetch(true);
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

  const handleFollow = async (action, user_id) => {
    try {
      const data = new FormData();
      data.append("logged_id", user.id);
      data.append("follow_id", user_id);
      const response = await api.post(action, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      setFetch(true);
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
  return (
    <>
      {isAuthenticated == true && <Navbar />}
      <div className="w-full px-5 justify-between">
        {article.length > 0 ? (
          article.map((art, index) => (
            <div
              className="mt-10 w-full h-screen flex xss:flex-col lg:flex-row"
              key={index}
            >
              <div className="flex-col xss:w-full lg:w-3/5 lg:border-r-4 px-4 ">
                <h1 className="text-3xl">{art.paper_title}</h1>
                <div className="flex mt-5 justify-between">
                  <div className="flex items-center">
                    {art.user.image ? (
                      <img
                        src={art.user.image}
                        alt="User"
                        className="w-16 h-16 rounded-full object-cover object-top"
                      />
                    ) : (
                      <CgProfile className="w-16 h-16" />
                    )}

                    <div className="ml-5">
                      <h1 className="text-lg">{art.user.name}</h1>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <FiShare2 color="gray" />
                    <p className="text-gray-500 font-semibold">Share</p>
                  </div>
                </div>
                <div className="my-4 flex items-center gap-5">
                  <div className="flex gap-2 items-center">
                    {/* <img src='./images/like.png'></img> art.am_i_liked */}
                    <FontAwesomeIcon
                      icon={art.am_i_liked ? solidHeart : regularHeart}
                      className="text-red-600"
                    />
                    {/* art.am_i_liked */}
                    <h2 className="text-sm ">
                      {" "}
                      {art.am_i_liked ? "Likes" : "Like"}
                    </h2>
                  </div>

                  <div className="flex gap-[0.3vw] items-center">
                    {/* <img src='./images/views.png'></img> */}
                    <PiEyeFill size={20} color="gray" />
                    <h2 className="text-sm ">Views</h2>
                  </div>

                  <div className="flex items-center">
                    {/* <img src='./images/pages.png' /> */}
                    <PiFilesDuotone size={20} color="gray" />
                    <h2 className="text-sm ">50 Pages</h2>
                  </div>
                </div>
                <p className="text-gray-500 mb-3">{art.abstract}</p>
                
                <Link
                  to={art?.article}
                  rel="noreferrer"
                  target="_blank"
                  className="bg-[#0000FF] px-[2vw] py-[0.3vw] text-white font-semibold rounded-sm"
                >
                  Download
                </Link>
              </div>
              <div className="w-auto lg:w-2/5 ps-6 h-screen">
                <h1 className="font-semibold text-2xl lg:mt-0 xss:mt-4">
                  About Author
                </h1>
                <div className="flex mt-5 justify-between">
                  <div className="flex items-center">
                    {art.user.image ? (
                      <img
                        src={art.user.image}
                        alt="User"
                        className="w-16 h-16 rounded-full object-cover object-top"
                      />
                    ) : (
                      <CgProfile className="w-16 h-16" />
                    )}
                    <div className="ml-5">
                      <h1 className="text-lg">{art.user.name}</h1>
                      <p className="text-sm text-gray-500">Graduate Student</p>
                    </div>
                  </div>
                  {art.user.id !== user.id && (
                    <div className="flex gap-2 items-center">
                      <button
                        className="bg-primary  font-semibold text-white py-2 px-4  rounded"
                        onClick={() =>
                          handleFollow(
                            follow ? "unfollow" : "follow",
                            art.user.id
                          )
                        }
                      >
                        {follow ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex mt-4 ">
                  <div className="flex gap-6">
                    <div className="text-center">
                      <p className="text-gray-500 text-sm font-semibold">
                        Papers
                      </p>
                      <p className="mt-2">1</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500 text-sm font-semibold">
                        Follwers
                      </p>
                      <p className="mt-2 ">50</p>
                    </div>
                  </div>
                </div>
                <p className="border-b-2 mt-4"></p>
                <div className="my-5">
                  <h1 className="font-semibold">Related Papers</h1>
                  {suggestion.length > 0 ? (
                    suggestion.map((item, index) => (
                      <div
                        className="bg-white shadow-lg  px-4  py-2  border-2 rounded-lg my-3"
                        key={index}
                      >
                        {/* <Link to={`/ArticleDetails/${article_id}`}> */}
                        <div className="flex justify-between items-center px-3 ">
                          <div className=" flex items-center">
                            <h3 className="text-xl font-semibold pe-5 capitalize">
                              {item?.paper_title}
                            </h3>
                          </div>
                        </div>
                        <div
                          className="text-sm text-gray-500  px-3 mt-2"
                          onClick={() => navigate(`/profile/${item?.user?.id}`)}
                        >
                          By {item?.user?.name}
                        </div>
                        
                        <div className="flex justify-between mt-2 py-1 px-5">
                          <div className="flex items-center space-x-2 cursor-pointer">
                            <LiaDownloadSolid />
                            {/* <FontAwesomeIcon icon={Download} className="text-gray-600" /> */}
                            <Link
                              to={art?.image}
                              rel="noreferrer"
                              target="_blank"
                              className="bg-[#0000FF] px-[2vw] py-[0.3vw] text-white font-semibold rounded-sm"
                            >
                              Download
                            </Link>
                          </div>

                          <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() =>
                              handlesaved(
                                item.isSaved ? "deleteSave" : "save",
                                item.id
                              )
                            }
                          >
                            <FontAwesomeIcon
                              icon={
                                item.isSaved ? solidBookmark : regularBookmark
                              }
                              className="text-gray-600"
                            />
                            <span className="home-like-share-saved">
                              {item.isSaved ? "Saved" : "Save"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FontAwesomeIcon
                              icon={faShareAlt}
                              className="text-gray-600"
                            />
                            <span className="home-like-share-saved">Share</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No related papers found.</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </>
  );
};

export default Articledetails;
