import React, { useContext } from "react";

import { toast } from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import api from "@/components/api/api";
import { Context } from "@/index";
const Followers = ({ setIsDataFetched, followers }) => {
  const { navigate } = useNavigate();
  const { user } = useContext(Context);

  const handleRemoveFollower = async (unfollowerId) => {
    console.log("Id to be Unfollowed: ", unfollowerId);
    try {
      await api
        .post(
          `/unfollow`,
          {
            logged_id: unfollowerId,
            follow_id: user.id,
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
          toast.success("Succesfully Removed Follower");
          setIsDataFetched(true);
        });
    } catch (error) {
      console.log(error);
      toast.error("Error while Removing Follower");
    }
  };

  return (
    <div className="h-fit">
      {followers?.length > 0 ? (
        followers.map((follower) => (
          <div
            key={follower.id}
            className="xss:w-[90%] xs:w-[80%] lg:w-[60%] mx-auto mt-3 flex justify-between items-center"
          >
            <div className="flex gap-3 items-center ml-3">
              <div className="xss:w-10 xss:h-12 sm:w-12 sm:h-14">
                {follower.image ? (
                  <img
                    src={`${follower.image}`}
                    onClick={() => navigate(`/profile/${follower.id}`)}
                    alt="Avatar"
                    className="h-full w-full object-cover rounded-full cursor-pointer"
                  />
                ) : (
                  <CgProfile
                    onClick={() => navigate(`/profile/${follower.id}`)}
                    className="xss:w-10 xss:h-12 sm:w-12 sm:h-14 cursor-pointer"
                  />
                )}
              </div>
              <p
                className="text-[#000] justify-start sm:text-xl font-semibold cursor-pointer"
                onClick={() => navigate(`/profile/${follower.id}`)}
              >
                {follower.name}
              </p>
            </div>
            <RiDeleteBin2Line
              onClick={() => handleRemoveFollower(follower.id)}
              className="xss:text-3xl cursor-pointer sm:text-4xl text-black  rounded-xl p-1  mr-5 mb-2"
            />
          </div>
        ))
      ) : (
        <p className="text-center text-lg font-semibold mt-5">
          No Followers Found
        </p>
      )}
    </div>
  );
};

export default Followers;
