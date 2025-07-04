import React, { createContext, useState } from "react";

import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./components/style/styles.css";
export const Context = createContext({ isAuthenticated: false });

const Appwrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [savedFiles, setSavedFiles] = useState({ posts: [], articles: [] });
  const [myUploads, setMyUploads] = useState({ posts: [], articles: [] });
  const [followingData, setFollowingData] = useState([]);
  const [followersData, setFollowersData] = useState([]);
  const [popup, setPopup] = useState(false);
  const [btn, setBtn] = useState(null);
  const [fetchData, setFetchData] = useState(false);

  const toggle = () => {
    setPopup(!popup);
  };

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        profileData,
        setProfileData,
        savedFiles,
        setSavedFiles,
        myUploads,
        setMyUploads,
        followersData,
        setFollowersData,
        followingData,
        setFollowingData,
        fetchData,
        setFetchData,
        popup,
        setPopup,
        toggle,
        btn,
        setBtn,
        token,
        setToken,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Appwrapper />);
