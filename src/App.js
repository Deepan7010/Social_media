import React, { useContext, useEffect, useState } from "react";
import { Context } from "./index.js";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage.js";
import Homepage from "./components/HomePage.js";
import UploadPage from "./components/UploadPage.js";
import ProfileCard from "./components/ProfileCard.js";
import CreatePost from "./components/Createpost.js";
import JournalsPage from "./components/JournalsPage.js";
import JournalDetails from "./components/JournalDetails.js";
import Loader from "./components/Loader.js";
import UploadPaperDetails from "./components/UploadPaperDetails.js";
import Profile from "./components/Profile.js";
import Journals from "./components/Journals.js";
import ViewProfile from "./components/ViewProfile.js";
import OtherProfile from "./components/OtherProfile.js";
import SavedItems from "./components/SavedItems.js";
import ArticleDetails from "./components/ArticleDetails.js";
import { Toaster } from "react-hot-toast";
import api from "./components/api.js";
import "../src/App.css";

const InnerApp = () => {
  const {
    setIsAuthenticated,
    setUser,
    profileData,
    setProfileData,
    setSavedFiles,
    setMyUploads,
    setFetchData,
    fetchData,
    setFollowingData,
    setFollowersData,
  } = useContext(Context);

  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const location = useLocation();

  const fetchProfileData = async () => {
    const isAuthenticatedFromLocalStorage = JSON.parse(
      localStorage.getItem("isAuthenticated")
    );
    const userIdFromLocal = JSON.parse(localStorage.getItem("userId"));

    if (!userIdFromLocal || !isAuthenticatedFromLocalStorage) {
      setIsAuthenticated(false);
      setUser({});
      setProfileData({});
      setSavedFiles({});
      setMyUploads([]);
      setFollowersData([]);
      setFollowingData([]);
      return;
    }

    try {
      const res = await api.post(
        `fetchProfile`,
        { user_id: userIdFromLocal },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("fetched user in app: ", res.data);
      setUser(res.data.profile_data.user);
      setProfileData(res.data.profile_data.user.profile || {});
      setSavedFiles(res.data.saved_data || {});
      setMyUploads(res.data.article_upload || []);
      setFollowersData(res.data.follower_count || 0);
      setFollowingData(res.data.following_count || 0);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setIsAuthenticated(false);
      setUser({});
      setProfileData({});
      setSavedFiles({});
      setMyUploads([]);
      setFollowersData([]);
      setFollowingData([]);
    }
  };

  useEffect(() => {
    if (location.pathname === "/profileView") {
      if (Object.keys(profileData).length === 0) {
        setIsAuthLoading(true);
        fetchProfileData().then(() => setIsAuthLoading(false));
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    const checkAuth = async () => {
      await fetchProfileData();
      setIsAuthLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (fetchData) {
      setIsAuthLoading(true);
      fetchProfileData().then(() => {
        setFetchData(false);
        setIsAuthLoading(false);
      });
    }
  }, [fetchData]);

  if (isAuthLoading) return <Loader />;

  return (
    <>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/journals" element={<JournalsPage />} />
        <Route path="/journals/journal-details" element={<JournalDetails />} />
        <Route path="/Upload" element={<UploadPage />} />
        <Route path="/Createpost" element={<CreatePost />} />
        <Route path="/ProfileCard" element={<ProfileCard />} />
        <Route path="/UploadPaperDetails" element={<UploadPaperDetails />} />
        <Route path="/profileView" element={<ViewProfile />} />
        <Route path="/connection" element={<Profile />} />
        <Route path="/institutions" element={<Journals />} />
        <Route path="/profile/:userId" element={<OtherProfile />} />
        <Route path="/saved" element={<SavedItems />} />
        <Route path="/ArticleDetails/:id" element={<ArticleDetails />} />
      </Routes>

      
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: "60px",
            width: "fit-content",
          },
        }}
        reverseOrder={false}
      />
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <InnerApp />
  </BrowserRouter>
);

export default App;
