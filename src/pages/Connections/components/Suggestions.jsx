import React, { useContext } from "react";

import { toast } from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

import api from "@/components/api/api";
import { Context } from "@/index";

const Suggestions = ({
  setIsDataFetched,
  suggestedFollowers,
  setSuggestedFollowers,
}) => {
  const { navigate } = useNavigate();
  const { user } = useContext(Context);

  const handleFollow = async (followId) => {
    //console.log("Id to be followed: ", followId);
    try {
      await api
        .post(
          `/follow`,
          {
            logged_id: user.id,
            follow_id: followId,
          },
          {
            headers: {
              withCredentials: true,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message);
          setIsDataFetched(true);
          filterSuggestions(followId);
        });
    } catch (error) {
      console.log(error);
      toast.error("Error while following User");
    }
  };

  const filterSuggestions = (followId) => {
    const updatedSuggestions = suggestedFollowers.filter((suggestion) => {
      return suggestion.id !== followId;
    });
    setSuggestedFollowers(updatedSuggestions);
  };

  return (
    <div className="h-fit">
      {suggestedFollowers?.length > 0 ? (
        suggestedFollowers.map((suggestion) => (
          <div
            key={suggestion.id}
            className="xss:w-[90%] xs:w-[80%] lg:w-[60%] mx-auto mt-3 flex justify-between items-center"
          >
            <div className="flex gap-3 items-center ml-3">
              <div className="xss:w-10 xss:h-12 sm:w-12 sm:h-14">
                {suggestion.image ? (
                  <img
                    src={`${suggestion.image}`}
                    onClick={() => navigate(`/profile/${suggestion.id}`)}
                    alt="Avatar"
                    className="h-full w-full object-cover rounded-full cursor-pointer"
                  />
                ) : (
                  <CgProfile
                    onClick={() => navigate(`/profile/${suggestion.id}`)}
                    className="xss:w-10 xss:h-12 sm:w-12 sm:h-14 cursor-pointer"
                  />
                )}
              </div>
              <p
                className="text-[#000] justify-start sm:text-xl font-semibold cursor-pointer"
                onClick={() => navigate(`/profile/${suggestion.id}`)}
              >
                {suggestion.name}
              </p>
            </div>
            <button
              onClick={() => handleFollow(suggestion.id)}
              className="bg-primary text-white px-4 py-1 rounded-lg mr-5 mb-2"
            >
              Follow
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-lg font-semibold mt-5">
          No Suggestions Found
        </p>
      )}
    </div>
  );
};

export default Suggestions;
