import React, { useContext, useRef, useState } from "react";

import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

import api from "@/components/api/api";
import { validate } from "@/components/Form/formValidator.js";
import { Context } from "@/index";

import { ProfessionalActivityInputs } from "./Inputs/ProfessionalActivityInputs";

export const ProfessionalActivityAddModal = ({
  setbutton3Clicked,
  setPopup,
  setIsDataFetched,
  setAddData,
}) => {
  const { user } = useContext(Context);
  const [organizationName, setOrganizationName] = useState("");
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [degree, setDegree] = useState("");
  const [errors, setErrors] = useState({});
  const values = [
    { label: "Organization Name", organizationName: organizationName },
    { label: "City", city: city },
    { label: "Region", region: region },
    { label: "Country", country: country },
    { label: "Department", department: department },
    { label: "End Date", endDate: endDate },
    { label: "Start Date", startDate: startDate },
    { label: "Degree", degree: degree },
  ];

  const refs = Object.fromEntries(
    values.map((value) => {
      const key = Object.keys(value)[1];
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return [key, useRef()];
    })
  );
  const handleAddProfessionalActivity = async () => {
    if (!validate({ values, setErrors })) return;
    try {
      const data = {
        organization_name: organizationName,
        city,
        region,
        country,
        department,
        degree: degree ? `${degree.getFullYear()}` : null,
        start_date: startDate ? startDate.getFullYear() : null,
        end_date: endDate ? endDate.toLocaleDateString("en-CA") : null,
        profile_id: user.profile.id,
        type: "professional_activity",
      };
      await api
        .post("/profileAdd", data, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          setbutton3Clicked(false);
          setPopup(false);
          setAddData(false);
          setIsDataFetched(false);
          toast.success(res.data.message);
        });
    } catch (error) {
      toast.error("Error Adding Professional Acitivity:" + error);
    }
  };
  return (
    <div
      onClick={() => {
        setbutton3Clicked(false);
        setPopup(false);
        setAddData(false);
      }}
      className="backdrop-blur-sm z-50 h-auto justify-center items-center w-screen inset-0 fixed bg-black bg-opacity-60 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-auto p-10 pb-24 bg-white rounded-xl  w-[80%] mt-[5vw] mx-auto"
      >
        <div className="bg-white">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-medium">PROFESSIONAL ACTIVITIES</h2>
            <RxCross2
              onClick={() => setbutton3Clicked(false)}
              className="text-2xl"
            />
          </div>
          <hr className="my-[1vw]" />
          <ProfessionalActivityInputs
            organizationName={organizationName}
            setOrganizationName={setOrganizationName}
            city={city}
            setCity={setCity}
            region={region}
            setRegion={setRegion}
            country={country}
            setCountry={setCountry}
            department={department}
            setDepartment={setDepartment}
            startDate={startDate}
            setStartDate={setStartDate}
            degree={degree}
            setDegree={setDegree}
            endDate={endDate}
            setEndDate={setEndDate}
            errors={errors}
            refs={refs}
          />
          <div className="flex flex-row gap-[1vw] mt-[4vw]">
            <button
              onClick={handleAddProfessionalActivity}
              className="rounded-md px-[6.5vw] py-2 bg-[#0000FF] font-medium  text-white"
            >
              Save
            </button>
            <button
              onClick={() => {
                setbutton3Clicked(false);
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

export const ProfessionalActivityEditModal = ({
  setbutton3Clicked,
  setPopup,
  setIsDataFetched,
  professionalActivityData,
  setEditData,
}) => {
  const { user } = useContext(Context);
  const [organizationName, setOrganizationName] = useState(
    professionalActivityData.organization_name
  );
  const [department, setDepartment] = useState(
    professionalActivityData.department
  );
  const [startDate, setStartDate] = useState(
    professionalActivityData.start_date
  );
  const [endDate, setEndDate] = useState(professionalActivityData.end_date);
  const [city, setCity] = useState(professionalActivityData.city);
  const [region, setRegion] = useState(professionalActivityData.region);
  const [country, setCountry] = useState(professionalActivityData.country);
  const [degree, setDegree] = useState(professionalActivityData.degree);
  const [errors, setErrors] = useState({});

  const values = [
    { label: "Organization Name", organizationName: organizationName },
    { label: "City", city: city },
    { label: "Region", region: region },
    { label: "Country", country: country },
    { label: "Department", department: department },
    { label: "End Date", endDate: endDate },
    { label: "Start Date", startDate: startDate },
    { label: "Degree", degree: degree },
  ];

  const refs = Object.fromEntries(
    values.map((value) => {
      const key = Object.keys(value)[1];
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return [key, useRef()];
    })
  );

  const handleEditProfessionalActivity = async () => {
    if (!validate({ values, setErrors })) return;
    try {
      const data = {
        organization_name: organizationName,
        city,
        region,
        country,
        department,
        degree:
          degree !== professionalActivityData.degree
            ? degree.getFullYear().toString()
            : degree,
        start_date:
          startDate !== professionalActivityData.start_date
            ? startDate.getFullYear()
            : startDate,
        end_date:
          endDate !== professionalActivityData.end_date
            ? endDate.toLocaleDateString("en-CA")
            : endDate,
        profile_id: user.profile.id,
        type: "professional_activity",
      };
      await api
        .post(`/profileEdit/${professionalActivityData.id}`, data, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          setbutton3Clicked(false);
          setPopup(false);
          setEditData(false);
          setIsDataFetched(false);
          toast.success("Professional Activity Details Updated Successfully");
        });
    } catch (error) {
      toast.error("Error Updating Professional Acitivity:" + error);
    }
  };
  return (
    <div
      onClick={() => {
        setbutton3Clicked(false);
        setPopup(false);
        setEditData(false);
      }}
      className="backdrop-blur-sm z-50 h-auto justify-center items-center w-screen inset-0 fixed bg-black bg-opacity-60 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-auto p-10 pb-24 bg-white rounded-xl  w-[80%] mt-[5vw] mx-auto"
      >
        <div className="bg-white">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-medium">PROFESSIONAL ACTIVITIES</h2>
            <RxCross2
              onClick={() => setbutton3Clicked(false)}
              className="text-2xl"
            />
          </div>
          <hr className="my-[1vw]" />
          <ProfessionalActivityInputs
            organizationName={organizationName}
            setOrganizationName={setOrganizationName}
            city={city}
            setCity={setCity}
            region={region}
            setRegion={setRegion}
            country={country}
            setCountry={setCountry}
            department={department}
            setDepartment={setDepartment}
            startDate={startDate}
            setStartDate={setStartDate}
            degree={degree}
            setDegree={setDegree}
            endDate={endDate}
            setEndDate={setEndDate}
            errors={errors}
            refs={refs}
          />
          <div className="flex flex-row gap-[1vw] mt-[4vw]">
            <button
              onClick={handleEditProfessionalActivity}
              className="rounded-md px-[6.5vw] py-2 bg-[#0000FF] font-medium  text-white"
            >
              Save
            </button>
            <button
              onClick={() => {
                setbutton3Clicked(false);
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
