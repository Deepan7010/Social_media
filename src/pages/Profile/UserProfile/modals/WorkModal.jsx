import React, { useContext, useRef, useState } from "react";

import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

import api from "@/components/api/api";
import { validate } from "@/components/Form/formValidator.js";
import { Context } from "@/index";

import { WorkInputs } from "./Inputs/WorkInputs";

export const WorkAddModal = ({
  setbutton5Clicked,
  setPopup,
  setIsDataFetched,
  setAddData,
}) => {
  const { user } = useContext(Context);
  const [workType, setWorkType] = useState("");
  const [workTitle, setWorkTitle] = useState("");
  const [journalTitle, setJournalTitle] = useState("");
  const [link, setLink] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [errors, setErrors] = useState({});

  const values = [
    { label: "Work Type", workType: workType },
    { label: "Work Title", workTitle: workTitle },
    { label: "Journal Title", journalTitle: journalTitle },
    { label: "Link", link: link },
    { label: "Publication Date", publicationDate: publicationDate },
  ];
  const refs = Object.fromEntries(
    values.map((value) => {
      const key = Object.keys(value)[1];
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return [key, useRef()];
    })
  );

  const handleAddWork = async (e) => {
    e.preventDefault();
    if (!validate({ values, setErrors })) return;
    try {
      const data = {
        work_type: workType,
        work_title: workTitle,
        journal_title: journalTitle,
        link,
        publication_date: publicationDate
          ? publicationDate.toLocaleDateString("en-CA")
          : null,
        profile_id: user.profile.id,
        type: "works",
      };
      await api
        .post("/profileAdd", data, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          setbutton5Clicked(false);
          setPopup(false);
          setAddData(false);
          setIsDataFetched(false);
          toast.success(res.data.message);
        });
    } catch (error) {
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
          <WorkInputs
            workType={workType}
            setWorkType={setWorkType}
            workTitle={workTitle}
            setWorkTitle={setWorkTitle}
            journalTitle={journalTitle}
            setJournalTitle={setJournalTitle}
            link={link}
            setLink={setLink}
            publicationDate={publicationDate}
            setPublicationDate={setPublicationDate}
            errors={errors}
            refs={refs}
          />
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
  const { user } = useContext(Context);
  const [workType, setWorkType] = useState(workData.work_type);
  const [workTitle, setWorkTitle] = useState(workData.work_title);
  const [journalTitle, setJournalTitle] = useState(workData.journal_title);
  const [link, setLink] = useState(workData.link);
  const [publicationDate, setPublicationDate] = useState(
    workData.publication_date
  );
  const [errors, setErrors] = useState({});

  const values = [
    { label: "Work Type", workType: workType },
    { label: "Work Title", workTitle: workTitle },
    { label: "Journal Title", journalTitle: journalTitle },
    { label: "Link", link: link },
    { label: "Publication Date", publicationDate: publicationDate },
  ];
  const refs = Object.fromEntries(
    values.map((value) => {
      const key = Object.keys(value)[1];
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return [key, useRef()];
    })
  );

  const handleEditWork = async () => {
    if (!validate({ values, setErrors })) return;
    try {
      const data = {
        work_type: workType,
        work_title: workTitle,
        journal_title: journalTitle,
        link,
        publication_date:
          publicationDate !== workData.publication_date
            ? publicationDate.toLocaleDateString("en-CA")
            : publicationDate,
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

          <WorkInputs
            workType={workType}
            setWorkType={setWorkType}
            workTitle={workTitle}
            setWorkTitle={setWorkTitle}
            journalTitle={journalTitle}
            setJournalTitle={setJournalTitle}
            link={link}
            setLink={setLink}
            publicationDate={publicationDate}
            setPublicationDate={setPublicationDate}
            errors={errors}
            refs={refs}
          />

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
