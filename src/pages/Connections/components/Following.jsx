import React, { useContext } from "react";

import { toast } from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import api from "@/components/api/api.js";
import { Context } from "@/index";

const Following = ({ setIsDataFetched, following }) => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const handleRemoveFollowing = async (unfollowId) => {
    console.log("Id to be Unfollowed: ", unfollowId);

    try {
      await api
        .post(
          `/unfollow`,
          {
            logged_id: user.id,
            follow_id: unfollowId,
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
        });
    } catch (error) {
      console.log(error);
      toast.error("Error while Unfollowing User");
    }
  };

  return (
    <div className="h-fit">
      {following?.length > 0 ? (
        following.map((follow) => (
          <div
            key={follow.id}
            className="xss:w-[90%] xs:w-[80%] lg:w-[60%] mx-auto mt-3 flex justify-between items-center"
          >
            <div className="flex gap-3 items-center ml-3">
              <div className="xss:w-10 xss:h-12 sm:w-12 sm:h-14">
                {follow.image ? (
                  <img
                    src={`${follow.image}`}
                    onClick={() => navigate(`/profile/${follow.id}`)}
                    alt="Avatar"
                    className="h-full w-full object-cover rounded-full cursor-pointer"
                  />
                ) : (
                  <CgProfile
                    onClick={() => navigate(`/profile/${follow.id}`)}
                    className="xss:w-10 xss:h-12 sm:w-12 sm:h-14 cursor-pointer"
                  />
                )}
              </div>
              <p
                className="text-[#000] sm:text-xl font-semibold cursor-pointer"
                onClick={() => navigate(`/profile/${follow.id}`)}
              >
                {follow.name}
              </p>
            </div>
            <RiDeleteBin2Line
              className="xss:text-3xl sm:text-4xl cursor-pointer text-black rounded-xl p-1  mr-5 mb-2"
              onClick={() => handleRemoveFollowing(follow.id)}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-lg font-semibold mt-5">
          Not Following Anyone yet.
        </p>
      )}
    </div>
  );
};

export default Following;
