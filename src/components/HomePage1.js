import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  faEye,
  faShareAlt,
  faBookmark as solidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as regularHeart,
  faBookmark as regularBookmark,
} from "@fortawesome/free-regular-svg-icons";
import Ellipse4 from "../assets/img/Ellipse4.png";
import weuieyesonfilled from "../assets/img/weuieyesonfilled.png";
import openmojishare from "../assets/img/openmojishare.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Context } from "../index.js";
import api from "./api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

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
        <div className="flex px-0 py-4 items-center md:px-0 xl:px-2 lg:px-0 ">
          {user.id !== user_id && (
            <button
              className="text-primary text-base lg:text-lg xl:text-xl mr-1 xl:mr-4 lg:mr-2 md:mr-1"
              onClick={() => handleFollow(follow ? "unfollow" : "follow")}
            >
              {follow ? "Unfollow" : "Follow"}
            </button>
          )}

          <MoreVertIcon />
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
          {/* <img src={iconamoonbookmarkthin} alt="Save" className="w-6 h-6" /> */}
          <span className="hidden xs:block">{saved ? "Saved" : "Save"}
          </span>
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
}) => {
  // user_id => user follow user_id
  // follow => already follow or not check
  const { user } = useContext(Context);
  const [views, setViews] = useState(0);
  const [expandDescription, setExpandDescription] = useState(false);

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
    <div className="bg-white shadow-lg  px-4 mb-8  py-2  border-2 rounded-lg">
      <div className="xss:flex-col md:flex md:flex-row justify-between xss:items-start md:items-center">
        <Link
          to={`/ArticleDetails/${article_id}`}
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
          <div className="flex">
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
            <MoreVertIcon />
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
            onClick={() => navigate(`/ArticleDetails/${article_id}`)}
            className="cursor-pointer"
          >
            {expandDescription ? description : description.slice(0, 130)}
          </span>
          <span
            onClick={() => navigate(`/ArticleDetails/${article_id}`)}
            className="text-lg cursor-pointer"
          >
            ......
          </span>
        </div>
      ) : (
        <p
          onClick={() => navigate(`/ArticleDetails/${article_id}`)}
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

const HomePage1 = ({ posts, articles, dataFetch }) => (
  <>
    {articles.length > 0 &&
      articles.map((article) => (
        <ArticleCard
          key={article.articleId}
          title={article.title}
          description={article.description}
          author={article.articleUsername}
          image={article.image}
          user_id={article.articleUserId}
          follow={article.am_i_following}
          article_id={article.articleId}
          likecount={article.likeCount}
          like={article.am_i_liked}
          saved={article.isSaved}
          dataFetch={dataFetch}
        />
      ))}
    {posts.length > 0 &&
      posts.map((post) => (
        <PostCard
          key={post.postid}
          name={post.PostUsername}
          location={post.postUserLocation}
          description={post.title}
          image={post.image}
          user_id={post.postUserId}
          follow={post.am_i_following}
          post_id={post.postid}
          likecount={post.likeCount}
          like={post.am_i_liked}
          saved={post.isSaved}
          profile_img={post.profile_img}
          dataFetch={dataFetch}
        />
      ))}
  </>
);

export default HomePage1;
