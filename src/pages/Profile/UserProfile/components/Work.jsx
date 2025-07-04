import React from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
const Work = ({
  toggleSection,
  workOpen,
  setbutton5Clicked,
  setAddData,
  setEditData,
  setPopup,
  works,
  handleDataDelete,
  setWorkToEdit,
}) => {
  return (
    <div>
      <div className="p-4 flex justify-between border-2 border-gray-300 rounded-[10px] xss:my-4">
        <div>
          <div className="flex">
            <h3 className="text-lg font-medium pr-2">Work</h3>
            <button onClick={() => toggleSection("work")}>
              {workOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              setbutton5Clicked((prev) => !prev);
              setAddData(true);
              setPopup((prev) => !prev);
            }}
            className="mt-2 lg:mt-0 bg-[#0000ff] text-white py-[7px] px-[21px] rounded-full"
          >
            + Add
          </button>
        </div>
      </div>
      {workOpen && (
        <>
          {works.length > 0 ? (
            <>
              {works.map((work, index) => (
                <div
                  key={work.id || index}
                  className="mt-2 border-[1px] rounded-[10px] xss:mx-3 xs:mx-0 xss:px-3 xss:leading-7  xs:mr-10 xs:ml-5 xs:px-7 py-6 xs:leading-10 relative"
                >
                  <p>
                    {work.work_title} | {work.publication_date}
                  </p>
                  <p>Work Type: {work.work_type}</p>
                  <p>{work.work_title}</p>
                  <p className="mb-4">{work.link}</p>
                  <div className="flex gap-4 absolute bottom-2 right-4">
                    <BiSolidEditAlt
                      onClick={() => {
                        setbutton5Clicked((prev) => !prev);
                        setEditData(true);
                        setWorkToEdit(work);
                        setPopup((prev) => !prev);
                      }}
                      className="text-4xl text-white bg-[#0000ff] rounded-xl p-1 cursor-pointer"
                    />
                    <RiDeleteBin2Line
                      onClick={() => {
                        handleDataDelete({
                          dataId: work.id,
                          dataType: "works",
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
              Please Add Work Details
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Work;
