import React from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";

const Education = ({
  toggleSection,
  educationOpen,
  setbutton2Clicked,
  setEducationToEdit,
  setAddData,
  setEditData,
  setPopup,
  handleDataDelete,
  educationData,
}) => {
  return (
    <div>
      <div className="p-4 flex justify-between border-2 border-gray-300 rounded-[10px] xss:my-4">
        <div>
          <div className="flex">
            <h3 className="text-lg font-medium pr-2">Education</h3>
            <button onClick={() => toggleSection("education")}>
              {educationOpen ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              setbutton2Clicked((prev) => !prev);
              setAddData(true);
              setPopup((prev) => !prev);
            }}
            className="mt-2 lg:mt-0 bg-[#0000ff] text-white py-[7px] px-[21px] rounded-full"
          >
            + Add
          </button>
        </div>
      </div>
      {educationOpen && (
        <>
          {educationData.length > 0 ? (
            <>
              {educationData.map((education, index) => (
                <div
                  key={education.id || index}
                  className="mt-2 border-[1px] rounded-[10px] xss:mx-3 xs:mx-0 xss:px-3 xss:leading-7  xs:mr-10 xs:ml-5 xs:px-7 py-6 xs:leading-10 relative"
                >
                  <p>Degree: {education.degree}</p>
                  <p>Department: {education.department} </p>
                  <p>
                    University Name: {education.organization_name},
                    {education.city}, {education.region},{education.country}
                  </p>
                  <p className="mb-4">
                    {education.start_date} - {education.end_date}
                  </p>
                  <div className="flex gap-4 absolute bottom-2 right-4">
                    <BiSolidEditAlt
                      onClick={() => {
                        setbutton2Clicked((prev) => !prev);
                        setEditData(true);
                        setEducationToEdit(education);
                        setPopup((prev) => !prev);
                      }}
                      className="text-4xl text-white bg-[#0000ff] rounded-xl p-1 cursor-pointer"
                    />
                    <RiDeleteBin2Line
                      onClick={() => {
                        handleDataDelete({
                          dataId: education.id,
                          dataType: "education",
                        });
                      }}
                      className="text-4xl text-white bg-[#0000ff] rounded-xl p-1 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="mt-1 border-[1px] text-lg rounded-[10px] xss:mx-3 xs:mx-0 xss:px-3 xss:leading-7 xs:mr-10 xs:ml-5 xs:px-7 py-6 xs:leading-5 relative">
              Please Add Education Details
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Education;
