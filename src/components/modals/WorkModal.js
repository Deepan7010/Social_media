import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import api from "../api";
import toast from "react-hot-toast";
import { Context } from "../../index";
export const WorkAddModal = ({
  setbutton5Clicked,
  setPopup,
  setIsDataFetched,
  setAddData,
}) => {
  const { user, setFetchData } = useContext(Context);
  const [workType, setWorkType] = useState("");
  const [workTitle, setWorkTitle] = useState("");
  const [journalTitle, setJournalTitle] = useState("");
  const [link, setLink] = useState("");
  const [publicationDate, setPublicationDate] = useState("");

  const handleAddWork = async (e) => {
    e.preventDefault();
    try {
      const data = {
        work_type: workType,
        work_title: workTitle,
        journal_title: journalTitle,
        link,
        publication_date: publicationDate,
        profile_id: user.profile.id,
        type: "works",
      };

      await api
        .post("/profileAdd", data, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          //console.log(res.data.message);
          setbutton5Clicked(false);
          setPopup(false);
          setAddData(false);
          setIsDataFetched(false);
          toast.success(res.data.message);
        });
    } catch (error) {
      //console.log(error);
      toast.error("Error Adding Education:" + error);
    }
  };

  return (
    <div
      onClick={() => {
        setbutton5Clicked(false);
        setPopup(false);
        setAddData(false);
      }}
      className="z-50 backdrop-blur-sm h-full w-screen fixed justify-center items-center bg-black bg-opacity-60 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-auto p-10 bg-white rounded-xl  w-[80%] mt-[5vw] mx-auto"
      >
        <div className="bg-white">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-medium">WORKS</h2>
            <RxCross2
              onClick={() => setbutton5Clicked(false)}
              className="text-2xl"
            />
          </div>
          <hr className="my-[1vw]" />

          <div className="flex justify-between xss:flex-col md:flex-row md:gap-4">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">Work Type</label>
              <input
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%]  xss:w-full">
              <label className="font-medium">Work Title</label>
              <input
                value={workTitle}
                onChange={(e) => setWorkTitle(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="text"
                placeholder=""
              />
            </div>
          </div>

          <div className="flex justify-between mt-[1vw] xss:flex-col sm:flex">
            <div className="flex flex-col w-[100%] ">
              <label className="font-medium">Journal Title</label>
              <input
                value={journalTitle}
                onChange={(e) => setJournalTitle(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
          </div>

          <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">Link</label>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%] xss:w-full ">
              <label className="font-medium">Publication Date</label>
              <input
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="date"
                placeholder=""
              />
            </div>
          </div>

          <hr className="my-[1vw]" />

          <div className="flex flex-row gap-[1vw] mt-[4vw]">
            <button
              onClick={handleAddWork}
              className="rounded-md px-[6.5vw] py-2 bg-[#0000FF] font-medium  text-white"
            >
              Save
            </button>
            <button
              onClick={() => {
                setbutton5Clicked(false);
                setAddData(false);
              }}
              className="rounded-md px-[6.5vw] py-2 text-[#0000FF]  font-medium bg-transparent border-[#0000FF] border-[1.5px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WorkEditModal = ({
  setbutton5Clicked,
  setPopup,
  setIsDataFetched,
  workData,
  setEditData,
}) => {
  const { user, setFetchData } = useContext(Context);
  const [workType, setWorkType] = useState(workData.work_type);
  const [workTitle, setWorkTitle] = useState(workData.work_title);
  const [journalTitle, setJournalTitle] = useState(workData.journal_title);
  const [link, setLink] = useState(workData.link);
  const [publicationDate, setPublicationDate] = useState(
    workData.publication_date
  );

  const handleEditWork = async () => {
    try {
      const data = {
        work_type: workType,
        work_title: workTitle,
        journal_title: journalTitle,
        link,
        publication_date: publicationDate,
        profile_id: user.profile.id,
        type: "works",
      };

      await api
        .post(`/profileEdit/${workData.id}`, data, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          //console.log(res.data.message);
          setbutton5Clicked(false);
          setPopup(false);
          setEditData(false);
          setIsDataFetched(false);
          toast.success(res.data.message);
        });
    } catch (error) {
      //console.log(error);
      toast.error("Error Adding Education:" + error);
    }
  };

  return (
    <div
      onClick={() => {
        setbutton5Clicked(false);
        setPopup(false);
        setEditData(false);
      }}
      className="z-50 backdrop-blur-sm h-full w-screen fixed justify-center items-center bg-black bg-opacity-60 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-auto p-10 bg-white rounded-xl  w-[80%] mt-[5vw] mx-auto"
      >
        <div className="bg-white">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-medium">WORKS</h2>
            <RxCross2
              onClick={() => setbutton5Clicked(false)}
              className="text-2xl"
            />
          </div>
          <hr className="my-[1vw]" />

          <div className="flex justify-between xss:flex-col sm:flex md:flex-row md:gap-4">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">Work Type</label>
              <input
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%]  xss:w-full">
              <label className="font-medium">Work Title</label>
              <input
                value={workTitle}
                onChange={(e) => setWorkTitle(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="text"
                placeholder=""
              />
            </div>
          </div>

          <div className="flex justify-between mt-[1vw] xss:flex-col sm:flex">
            <div className="flex flex-col w-[100%] ">
              <label className="font-medium">Journal Title</label>
              <input
                value={journalTitle}
                onChange={(e) => setJournalTitle(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
          </div>

          <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">Link</label>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%] xss:w-full ">
              <label className="font-medium">Publication Date</label>
              <input
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="date"
                placeholder=""
              />
            </div>
          </div>

          <hr className="my-[1vw]" />

          <div className="flex flex-row gap-[1vw] mt-[4vw]">
            <button
              onClick={handleEditWork}
              className="rounded-md px-[6.5vw] py-2 bg-[#0000FF] font-medium  text-white"
            >
              Save
            </button>
            <button
              onClick={() => {
                setbutton5Clicked(false);
                setEditData(false);
              }}
              className="rounded-md px-[6.5vw] py-2 text-[#0000FF]  font-medium bg-transparent border-[#0000FF] border-[1.5px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
