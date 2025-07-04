import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "@/components/api/api";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Context } from "@/index.jsx";

import SidebarLinks from "../../components/layout/SidebarLinks.jsx";

import Articles from "./components/Articles.jsx";
import Posts from "./components/Posts.jsx";

const Saveditems = () => {
  const { user, isAuthenticated } = useContext(Context);
  const [savedItems, setSavedItems] = useState([]);
  // const [userList, setUserList] = useState([]);
  const [btn, setBtn] = useState("article");
  const [fetchData, setFetch] = useState(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchSave = async () => {
      //console.log("In saved fetch call");

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
    };
    if (fetchData === true && user && user.id) {
      fetchSave();
    }
    // if (user && user.id) fetchSave();
  }, [user, isAuthenticated, fetchData]);

  const articles = savedItems.articles || [];
  const posts = savedItems.posts || [];

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row">
        <SidebarLinks homepage={false} />
        <div className="fixed left-0 top-15 h-8 w-full bg-white "></div>

        <div className="flex px-5 md:px-0 ms-auto w-full lg:w-[68%] md:w-11/12 xl:w-[68%] 2xl:w-[68%] sm:min-h-[30vh] lg:min-h-[50vh] me-[3%] lg:me-[2%] xl:me-[6%] 2xl:me-[6%] my-7">
          <div className="w-full">
            <h2 className="font-bold mb-[1vw] text-lg ">SAVED ITEMS</h2>

            <div className="flex gap-5 w-full justify-center rounded">
              <button
                className={`px-3 py-1 mb-2 w-1/3 font-bold border-b-2 text-2xl ${
                  btn === "article"
                    ? "border-primary  text-primary"
                    : "border-gray-500 text-gray-500"
                }`}
                onClick={() => setBtn("article")}
              >
                Articles
              </button>
              <button
                className={`px-3 py-1 mb-2 w-1/3 font-bold border-b-2 text-2xl ${
                  btn === "post"
                    ? " border-primary text-primary "
                    : "border-gray-500  text-gray-500"
                }`}
                onClick={() => setBtn("post")}
              >
                Post
              </button>
            </div>

            {btn === "article" && (
              <Articles articles={articles} setFetch={setFetch} />
            )}

            {/* post */}
            {btn === "post" && (
              <Posts posts={posts} dataFetch={setFetch} userDataId={user.id} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Saveditems;
