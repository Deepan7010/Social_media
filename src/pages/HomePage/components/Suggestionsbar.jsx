import React, { useState } from "react";

import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

import Stories from "@/components/layout/Stories";

export const Suggestionsbar = ({
  suggestedFollowers,
  handleFollow,
  enableStories,
}) => {
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  //console.log("Suggested Followers: ", suggestedFollowers);
  const navigate = useNavigate();
  return (
    <div className="mx-auto xss:space-y-2 lg:space-y-2 xl:space-y-4 h-auto">
      {enableStories && <Stories />}

      <div className="flex justify-between items-center">
        <h2 className="opacity-80 font-semibold text-md lg:text-lg text-gray-600">
          Suggested for You
        </h2>
        {suggestedFollowers.length > 4 ? (
          <h2
            className="opacity-80 text-sm lg:text-md cursor-pointer text-gray-600"
            onClick={() => setShowAllSuggestions(!showAllSuggestions)}
          >
            {showAllSuggestions ? "View Less" : "View All"}
          </h2>
        ) : (
          <></>
        )}
      </div>

      <div
        className={`overflow-y-scroll md:h-[16vh] h-fit xl:h-fit lg:h-auto`}
        style={{ scrollbarWidth: "none" }}
      >
        {suggestedFollowers.length > 0 ? (
          (showAllSuggestions
            ? suggestedFollowers
            : enableStories
            ? suggestedFollowers.slice(0, 3)
            : suggestedFollowers.slice(0, 5)
          ).map((follow) => (
            <div
              key={follow.id ? follow.id : follow.userId}
              className="w-auto  mb-1 flex justify-between items-center"
            >
              <div className="flex gap-[0.8vw] items-center">
                <div className="w-12 h-14">
                  {follow.image ? (
                    <img
                      src={`${follow.image}`}
                      onClick={() =>
                        navigate(
                          `/profile/${follow.id ? follow.id : follow.userId}`
                        )
                      }
                      alt="Avatar"
                      className="h-full w-full object-cover cursor-pointer rounded-full"
                    />
                  ) : (
                    <CgProfile
                      onClick={() =>
                        navigate(
                          `/profile/${follow.id ? follow.id : follow.userId}`
                        )
                      }
                      className="xss:w-10 xss:h-14 cursor-pointer xs:w-12 xs:h-16"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <p
                    onClick={() =>
                      navigate(
                        `/profile/${follow.id ? follow.id : follow.userId}`
                      )
                    }
                    className="text-[#000] sm:text-lg cursor-pointer xl:text-xl font-semibold"
                  >
                    {follow.name}
                  </p>
                  {enableStories && (
                    <p
                      onClick={() =>
                        handleFollow(follow.id ? follow.id : follow.userId)
                      }
                      className="text-[#0000FF] text-md font-semibold cursor-pointer md:block xl:hidden"
                    >
                      Follow
                    </p>
                  )}
                </div>
              </div>
              <p
                onClick={() =>
                  handleFollow(follow.id ? follow.id : follow.userId)
                }
                className={`text-[#0000FF] text-md font-semibold cursor-pointer hidden ${
                  enableStories ? "xl:block" : "xss:block"
                } `}
              >
                Follow
              </p>
            </div>
          ))
        ) : (
          <p className="text-[#000] text-lg font-semibold mt-5">
            No Suggestions
          </p>
        )}
      </div>
    </div>
  );
};
