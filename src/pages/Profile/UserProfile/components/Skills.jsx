/* eslint-disable no-unused-expressions */
import React, { useContext, useState } from "react";

import { toast } from "react-hot-toast";

import EditIconBlack from "@/assets/img/EditIconBlack.png";
import api from "@/components/api/api";
import { Context } from "@/index";

const Skills = () => {
  const { profileData, setFetchData } = useContext(Context);

  //Skills Section states
  const isSkillsAvailable =
    profileData &&
    Object.keys(profileData).length > 0 &&
    profileData?.skills[0]?.skills
      ? true
      : false;
  const [isSkillEdited, setIsSkillEdited] = useState(false);
  const [skills, setSkills] = useState(
    profileData && Object.keys(profileData).length > 0 && profileData.skills
      ? profileData.skills[0]?.skills || []
      : []
  );
  const [tempSkills, setTempSkills] = useState([]);
  const [input, setInput] = useState("");

  const addSkill = (event) => {
    event.preventDefault();
    if (input && !tempSkills.includes(input.toUpperCase())) {
      setTempSkills([...tempSkills, input.toUpperCase()]);
      setInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    tempSkills.includes(skillToRemove)
      ? setTempSkills(tempSkills.filter((skill) => skill !== skillToRemove))
      : setSkills(skills.filter((skill) => skill !== skillToRemove));
    setIsSkillEdited(true);
  };

  const handleAddNewSkillsData = async () => {
    try {
      await api
        .post(
          `profileAdd`,
          {
            profile_id: profileData.id,
            skills: tempSkills,
            type: "skills",
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
          setTempSkills([]);
          setIsSkillEdited(false);
        });
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const handleEditSkillsData = async () => {
    let updatedSkills = [...skills, ...tempSkills];
    console.log("Updated Skills: ", updatedSkills);

    updatedSkills.length <= 0 && (updatedSkills = [null]);
    try {
      await api
        .post(
          `profileEdit/${profileData.skills[0].id}`,
          {
            profile_id: profileData.skills[0].profile_id,
            skills: updatedSkills,
            type: "skills",
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
          setTempSkills([]);
          setIsSkillEdited(false);
        });
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="w-auto pb-4 border-2 rounded-[10px] xss:my-4 border-gray-300">
      <div
        className={`flex items-center mb-4 border-b-[1px] rounded-b-md border-gray-300 ${
          isSkillEdited ? "xss:flex-col xss:items-start xs:flex-row" : "flex"
        }`}
      >
        <input
          onClick={() => setIsSkillEdited(true)}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Skills"
          className="flex-1 xss:px-2 xss:py-2 xs:pl-1 xs:px-0 sm:px-4 sm:py-4 border-none rounded-md text-lg focus:outline-none"
        />
        {isSkillEdited ? (
          <div className="flex xs:gap-1 xss:gap-4 sm:gap-4 xss:p-2 xs:px-0 xs:-ml-2 sm:p-4 ">
            <button
              onClick={addSkill}
              className="text-gray-700 text-2xl font-semibold rounded-full border-black border-[1px] px-2"
            >
              +
            </button>
            <button
              onClick={() => {
                setTempSkills([]);
                setIsSkillEdited(false);
                setInput("");
              }}
              className="text-gray-700 font-semibold text-md rounded-2xl border-black border-[1px] px-6 py-1"
            >
              Cancel
            </button>
            {isSkillsAvailable ? (
              <button
                onClick={handleEditSkillsData}
                className="text-white text-md rounded-2xl font-semibold bg-[#0000ff] px-6 py-1"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleAddNewSkillsData}
                className="text-white text-md rounded-2xl font-semibold bg-[#0000ff] px-6 py-1"
              >
                Save
              </button>
            )}
          </div>
        ) : (
          <button onClick={() => setIsSkillEdited(true)}>
            <img src={EditIconBlack} alt="Edit Icon" className="h-5 w-5 mr-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 p-4 break-words">
        {skills === null || skills.length < 1 ? (
          <div key={0} className="flex justify-center text-center gap-2">
            {tempSkills.length < 1 ? (
              <p>No skills yet</p>
            ) : (
              <>
                {isSkillEdited &&
                  tempSkills.map((tempSkill, i) => (
                    <div
                      key={tempSkill || i}
                      className="flex items-center px-2 py-1 border rounded-full w-auto"
                    >
                      <span className="mr-1">{tempSkill}</span>
                      <button
                        onClick={() => removeSkill(tempSkill)}
                        className="text-gray-500 hover:text-red-500 focus:outline-none"
                      >
                        ×
                      </button>
                    </div>
                  ))}
              </>
            )}
          </div>
        ) : (
          <div className="flex gap-2 flex-wrap break-words">
            {skills.length === 1 &&
              tempSkills.length === 0 &&
              skills[0] == null && (
                <div key={0}>
                  <p>No skills yet</p>
                </div>
              )}
            {skills.map((skill, index) =>
              skill != null ? (
                <div
                  key={`skill-${index}-${skill}`}
                  className="flex items-center text-wrap px-3 py-1 border rounded-full"
                >
                  <span className="mr-2 text-wrap">{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-gray-500 hover:text-red-500 focus:outline-none"
                  >
                    ×
                  </button>
                </div>
              ) : null
            )}

            {isSkillEdited &&
              tempSkills.map((tempSkill, i) => (
                <div
                  key={`temp-${i}-${tempSkill}`}
                  className="flex items-center px-3 py-1 border rounded-full"
                >
                  <span className="mr-2">{tempSkill}</span>
                  <button
                    onClick={() => removeSkill(tempSkill)}
                    className="text-gray-500 hover:text-red-500 focus:outline-none"
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
