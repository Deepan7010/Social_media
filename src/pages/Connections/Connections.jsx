import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "@/components/api/api";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Context } from "@/index";

import SidebarLinks from "../../components/layout/SidebarLinks";

import Followers from "./components/Followers";
import Following from "./components/Following";
import Suggestions from "./components/Suggestions";

const Profile = () => {
  const { user, isAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  !isAuthenticated && navigate("/");

  const [activeTab, setActiveTab] = useState("followers");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [suggestedFollowers, setSuggestedFollowers] = useState([]);

  const [isDatafetched, setIsDataFetched] = useState(true);

  const handleSuggestedFollowers = async (newData) => {
    if (suggestedFollowers.length > 0) {
      const updatedSuggestions = [...suggestedFollowers],
        includedNames = [];
      suggestedFollowers.forEach((suggestion) => {
        includedNames.push(suggestion.name);
      });
      newData.forEach((newSuggestion) => {
        if (!includedNames.includes(newSuggestion.name)) {
          updatedSuggestions.push(newSuggestion);
        }
      });
      setSuggestedFollowers(updatedSuggestions);
    } else {
      setSuggestedFollowers(...suggestedFollowers, newData);
    }
  };
  const fetchFollowingData = async () => {
    try {
      await api
        .post(
          "/connection",
          {
            follow_id: user?.id,
            type: "follow",
          },
          {
            headers: {
              withCredentials: true,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          //console.log("Following Data in response: ", res.data.suggestion);
          setFollowing(res.data.follow);
          handleSuggestedFollowers(
            res.data.suggestion.length > 0 ? res.data.suggestion : []
          );

          setIsDataFetched(false);
        });
    } catch (error) {
      console.log("Error fetching the Following Data: ", error);
    }
  };
  const fetchFollowersData = async () => {
    try {
      await api
        .post(
          "/connection",
          {
            follow_id: user?.id,
            type: "followers",
          },
          {
            headers: {
              withCredentials: true,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          //console.log(res.data);
          setFollowers(res.data.followers);
          handleSuggestedFollowers(
            res.data.suggestion.length > 0 ? res.data.suggestion : []
          );
          setIsDataFetched(false);
        });
    } catch (error) {
      console.log("Error fetching the Followers Data: ", error);
    }
  };

  useEffect(() => {
    if (!isDatafetched) return;
    fetchFollowingData();
    fetchFollowersData();
  }, [isDatafetched]);

  // console.log("Followers Data: ", followers);
  // console.log("Following Data: ", following);
  //console.log("Suggestions Data Global: ", suggestedFollowers);
  // console.log("profile Data: ", profileData);

  return (
    <div>
      <Navbar />

      <div className="w-full mx-auto flex justify-end">
        <div className="w-full flex xss:flex-col lg:flex-row">
          <SidebarLinks homepage={false} />

          <div className="xss:my-[5vw] sm:my-[2.5vw] mx-auto xss:h-auto lg:h-fit xss:w-11/12 lg:w-[68%] md:w-11/12 xl:w-[68%] 2xl:me-[6%] sm:min-h-[30vh] lg:min-h-[50vh]">
            <div className="flex xs:gap-1 sm:gap-2 w-full justify-center rounded">
              <button
                className={`xs:px-3 py-1 mb-2 w-1/3 font-bold border-b-2 text-lg sm:text-xl xss:text-lg ${
                  activeTab === "followers"
                    ? "border-primary  text-primary"
                    : "border-gray-500 text-gray-500"
                }`}
                onClick={() => setActiveTab("followers")}
              >
                Followers
              </button>
              <button
                className={`xs:px-3 py-1 mb-2 w-1/3 font-bold border-b-2 sm:text-xl xss:text-lg ${
                  activeTab === "following"
                    ? "border-primary text-primary"
                    : "border-gray-500 text-gray-500"
                }`}
                onClick={() => setActiveTab("following")}
              >
                Following
              </button>
              <button
                className={`xs:px-3 py-1 mb-2 w-1/3 font-bold border-b-2 sm:text-xl xss:text-lg ${
                  activeTab === "suggestions"
                    ? "border-primary text-primary"
                    : "border-gray-500 text-gray-500"
                }`}
                onClick={() => setActiveTab("suggestions")}
              >
                Suggestions
              </button>
            </div>

            {activeTab === "followers" ? (
              <Followers
                setIsDataFetched={setIsDataFetched}
                followers={followers}
              />
            ) : (
              <></>
            )}
            {activeTab === "following" ? (
              <Following
                setIsDataFetched={setIsDataFetched}
                following={following}
              />
            ) : (
              <></>
            )}
            {activeTab === "suggestions" ? (
              <Suggestions
                setIsDataFetched={setIsDataFetched}
                suggestedFollowers={suggestedFollowers}
                setSuggestedFollowers={setSuggestedFollowers}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
