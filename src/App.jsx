import React, { useContext, useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";

import api from "@/components/api/api.js";
import Loader from "@/components/layout/Loader.jsx";
import { Context } from "@/index.jsx";
import Connections from "@/pages/Connections/Connections.jsx";
import Homepage from "@/pages/HomePage/HomePage.jsx";
import LandingPage from "@/pages/LandingPage/LandingPage.jsx";

//import CreatePost from "./components/Createpost.js";
import "@/components/style/styles.css";
import Articledetails from "./pages/Articledetails/Articledetails";
import Institutions from "./pages/Institutions/Institutions";
import JournalDetails from "./pages/Journals/components/JournalDetails";
import Journals from "./pages/Journals/Journals";
import OtherProfile from "./pages/Profile/OtherProfile/Otherprofile";
import ViewProfile from "./pages/Profile/UserProfile/ViewProfile";
import Saveditems from "./pages/Saveditems/Saveditems";
import UploadPaperDetails from "./pages/Uploadpage/components/UploadPaperDetails";
import UploadPage from "./pages/Uploadpage/UploadPage";

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
    setToken,
  } = useContext(Context);

  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const location = useLocation();

  const fetchProfileData = async () => {
    const isAuthenticatedFromLocalStorage = JSON.parse(
      localStorage.getItem("isAuthenticated")
    );
    const userIdFromLocal = JSON.parse(localStorage.getItem("userId"));
    const tokenFromLocal = localStorage.getItem("token");
    if (tokenFromLocal) {
      setToken(tokenFromLocal);
    } else {
      setToken(null);
    }

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
      //console.log("fetched user in app: ", res.data);
      setUser(res.data.profile_data.user);
      setProfileData(res.data.profile_data.user.profile || {});
      setSavedFiles({
        posts: res.data.saved_data.posts || [],
        articles: res.data.saved_data.articles || [],
      });
      setMyUploads({
        posts: res.data.post_upload || [],
        articles: res.data.article_upload || [],
      });
      setFollowersData(res.data.follower_count || 0);
      setFollowingData(res.data.following_count || 0);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setIsAuthenticated(false);
      setUser({});
      setProfileData({});
      setSavedFiles({ posts: [], articles: [] });
      setMyUploads({ posts: [], articles: [] });
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
        <Route path="/loader" element={<Loader />} />
        <Route path="/journals" element={<Journals />} />
        <Route path="/journals/journal-details" element={<JournalDetails />} />
        {/* <Route path="/Createpost" element={<CreatePost />} /> */}
        {/* <Route path="/ProfileCard" element={<ProfileCard />} /> */}
        <Route path="/Upload" element={<UploadPage />} />
        <Route path="/UploadPaperDetails" element={<UploadPaperDetails />} />
        <Route path="/profileView" element={<ViewProfile />} />
        <Route path="/connection" element={<Connections />} />
        <Route path="/institutions" element={<Institutions />} />
        <Route path="/profile/:userId" element={<OtherProfile />} />
        <Route path="/saved" element={<Saveditems />} />
        <Route path="/ArticleDetails/:id" element={<Articledetails />} />
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
