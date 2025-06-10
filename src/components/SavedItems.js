import React, { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { FaRegBookmark } from "react-icons/fa";
import { PiEyeFill, PiFilesDuotone } from "react-icons/pi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as regularHeart,
} from "@fortawesome/free-regular-svg-icons";
import { Context } from "../index.js";
import api from "./api";
import { Link,  useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineMessage, MdOutlinePeopleAlt } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import SavedPostImage from "./SavedPostImage.js";
import toast from "react-hot-toast";

const SavedItems = () => {
  const { user, isAuthenticated } = useContext(Context);
  const [savedItems, setSavedItems] = useState([]);
  // const [userList, setUserList] = useState([]);
  const [btn, setBtn] = useState("article");
  const [fetchData, setFetch] = useState(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchSave = async () => {
      console.log("In saved fetch call");

      if (user && user.id) {
        try {
          const response = await api.post(
            "fetchSaved",
            {
              user_id: user.id,
            },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );
          setSavedItems(response.data);
          setFetch(false);
          // setUserList(response.data.users);
          // console.log(response.data)
        } catch (error) {
          console.log("Error while fetch Saved Data: " + error);
        }
      }
    }
    if (fetchData === true && user && user.id) {
      fetchSave();
    }
    // if (user && user.id) fetchSave();

  }, [user, isAuthenticated, fetchData]);

  const articles = savedItems.articles || []
  const posts = savedItems.posts || []

  const downloadpdf = async (id, user_id) => {
    try {
      const response = await api.post(
        "downloadArticle",
        {
          id: id,
          user_id: user_id,
        },
        {
          withCredentials: true,
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const blob = await response.data; // Convert the response to a Blob
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error(error);
    }
  };
  // const users_data = userList[0] || []


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
      <Navbar />
      {/* <LeftSidebar
        user_data={users_data}
        togglePopup={() => {}}
        showPopup={false}
        post={false}
      /> */}
      <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row">
        <div className="xss:w-11/12 mx-auto mt-10 w-11/12 lg:w-[25vw] xl:w-[22vw] border-[2px] border-opacity-85 rounded-xl flex xss:flex-col xs:flex-row lg:flex-col lg:h-fit">
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
        <div className="fixed left-0 top-15 h-8 w-full bg-white "></div>

        <div className="flex px-5 md:px-0 ms-auto w-full lg:w-[68%] md:w-11/12 xl:w-[68%] 2xl:w-[68%] min-h-screen me-[3%] lg:me-[2%] xl:me-[6%] 2xl:me-[6%] my-7">
          <div className="w-full">
            <h2 className="font-bold mb-[1vw] text-lg ">SAVED ITEMS</h2>

            <div className="flex gap-5 w-full justify-center rounded">
              <button
                className={`px-3 py-1 mb-2 w-1/3 font-bold border-b-2 text-2xl ${btn === "article"
                  ? "border-primary  text-primary"
                  : "border-gray-500 text-gray-500"
                  }`}
                onClick={() => setBtn("article")}
              >
                Articles
              </button>
              <button
                className={`px-3 py-1 mb-2 w-1/3 font-bold border-b-2 text-2xl ${btn === "post"
                  ? " border-primary text-primary "
                  : "border-gray-500  text-gray-500"
                  }`}
                onClick={() => setBtn("post")}
              >
                Post
              </button>
            </div>

            {btn === "article" &&
              (articles.length > 0 ? (
                articles.map((art) => (
                  <div
                    key={art.articleId}
                    className="border-2 rounded-lg px-7 md:px-10 py-8 mt-4"
                  >

                    <div className="flex justify-between items-center">
                      <h2 className="font-bold mb-2 md:mb-6 text-xl">{art.title}</h2>
                    </div>
                    <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => {
                      Navigate(
                        `/profile/${art.articleUserId}`
                      )
                    }}>
                   
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
                      {art.description.length > 130 ? (<p className="mt-[1vw] font-medium text-sm text-gray-500">
                        {art.description.slice(0, 130)}...
                      </p>) : (<p className="mt-[1vw] font-medium text-sm text-gray-500">
                        {art.description}
                      </p>)}

                    </Link>
                    {/* <p className='mt-[1.5vw] font-medium text-sm text-gray-500'>Dive into the potential of quantum computing and its implications for solving complex problems in record time. Join our vibrant community of Information Technology scholars and researchers.</p> */}

                    <div className="my-[2vw] flex gap-[2vw] items-center">
                      <div className="flex gap-[0.3vw] items-center hover:cursor-pointer" onClick={() => handleLike(art.am_i_liked ? "unlike" : "like", art.articleId)}>
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

                    <button className="bg-[#0000FF] px-[2vw] py-[0.3vw] text-white font-semibold rounded-sm" onClick={() => downloadpdf(art.articleId, art.articleUserId)}>
                      Download
                    </button>
                  </div>
                ))
              ) : (
                <p className="mt-5 text-center font-bold">No Articles Available</p>
              ))}

            {/* post */}
            {btn === "post" &&
              (posts.length > 0 ? (
                posts.map((post, index) => {
                  return (<SavedPostImage key={index || post.postid} post={post} dataFetch={setFetch} userData={user} />);

                })
              ) : (
                <p className="mt-5 text-center font-bold">No Posts Available</p>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SavedItems;
