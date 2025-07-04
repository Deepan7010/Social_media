import React, { useContext, useState } from "react";

import toast from "react-hot-toast";

import EditIconBlack from "@/assets/img/EditIconBlack.png";
import api from "@/components/api/api";
import { Context } from "@/index";

const Biography = ({ skills }) => {
  const { user, profileData, setFetchData } = useContext(Context);
  //Biography Section states
  const biography = profileData?.bio || "No Biography yet";
  const [isBiographyEdited, setIsBiographyEdited] = useState(false);
  const [tempBiography, setTempBiography] = useState(profileData?.bio || "");

  const handleBiographyData = async () => {
    try {
      await api
        .post(
          `profileEdit/${profileData.id}`,
          {
            user_id: user.id,
            bio: tempBiography,
            skills: skills,
            type: "profile",
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message);
          setFetchData(true);
          setTempBiography("");
          setIsBiographyEdited(false);
        });
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-lg sm:my-4">
      <div className="flex justify-between border-b-2 rounded-md border-gray-300">
        <h3 className="text-xl p-4 text-gray-300">Biography</h3>
        {isBiographyEdited ? (
          <div className="flex gap-4 p-4 xss:gap-2">
            <button
              onClick={() => {
                setIsBiographyEdited(false);
                setTempBiography("");
              }}
              className="text-gray-700 font-semibold text-md rounded-2xl border-black border-[1px] xs:px-6 py-1 xss:px-3"
            >
              Cancel
            </button>
            <button
              onClick={() => handleBiographyData()}
              className="text-white text-md rounded-2xl font-semibold bg-[#0000ff] xs:px-6 py-1 xss:px-4"
            >
              Save
            </button>
          </div>
        ) : (
          <button onClick={() => setIsBiographyEdited(true)}>
            <img src={EditIconBlack} alt="Edit Icon" className="h-5 w-5 mr-4" />
          </button>
        )}
      </div>
      <textarea
        onClick={() => setIsBiographyEdited(true)}
        value={isBiographyEdited ? tempBiography : biography}
        onChange={(e) => setTempBiography(e.target.value)}
        className="w-full p-4 text-lg focus:outline-none placeholder-black"
        placeholder="Enter Your Details"
      />
    </div>
  );
};

export default Biography;
