import React, { useContext, useRef, useState } from "react";

import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

import api from "@/components/api/api";
import { validate } from "@/components/Form/formValidator.js";
import { Context } from "@/index";

import { EducationInputs } from "./Inputs/EducationInputs";

export const EducationAddModal = ({
  setbutton2Clicked,
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
    { label: "Start Date", startDate: startDate },
    { label: "End Date", endDate: endDate },
    { label: "Degree", degree: degree },
  ];

  const refs = Object.fromEntries(
    values.map((value) => {
      const key = Object.keys(value)[1];
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return [key, useRef()];
    })
  );

  const handleAddEducation = async () => {
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
        type: "education",
      };

      await api
        .post("/profileAdd", data, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data.message);
          setbutton2Clicked(false);
          setPopup(false);
          setAddData(false);
          setIsDataFetched(false);
          toast.success(res.data.message);
        });
    } catch (error) {
      console.log(error);
      toast.error("Error Adding Education:" + error);
    }
  };

  return (
    <div
      onClick={() => {
        setbutton2Clicked(false);
        setPopup(false);
        setAddData(false);
      }}
      className="backdrop-blur-sm inset-0 justify-center items-center h-full w-screen z-50 fixed bg-black bg-opacity-60 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-auto p-10 pb-24 bg-white rounded-xl  w-[80%] mt-[5vw] mx-auto"
      >
        <div className="bg-white">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-medium">EDUCATION</h2>
            <RxCross2
              onClick={() => setbutton2Clicked(false)}
              className="text-2xl"
            />
          </div>
          <hr className="my-[1vw]" />
          <EducationInputs
            organizationName={organizationName}
            setOrganizationName={setOrganizationName}
            department={department}
            setDepartment={setDepartment}
            endDate={endDate}
            setEndDate={setEndDate}
            city={city}
            setCity={setCity}
            region={region}
            setRegion={setRegion}
            country={country}
            setCountry={setCountry}
            degree={degree}
            setDegree={setDegree}
            startDate={startDate}
            setStartDate={setStartDate}
            errors={errors}
            refs={refs}
          />

          <div className="flex flex-row gap-[1vw] mt-[4vw]">
            <button
              onClick={handleAddEducation}
              className="rounded-md px-[6.5vw] py-2 bg-[#0000FF] font-medium  text-white"
            >
              Save
            </button>
            <button
              onClick={() => {
                setbutton2Clicked(false);
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

export const EducationEditModal = ({
  setbutton2Clicked,
  setPopup,
  setIsDataFetched,
  educationData,
  setEditData,
}) => {
  const { user } = useContext(Context);
  const [organizationName, setOrganizationName] = useState(
    educationData.organization_name
  );
  const [department, setDepartment] = useState(educationData.department);
  const [startDate, setStartDate] = useState(educationData.start_date);
  const [endDate, setEndDate] = useState(educationData.end_date);
  const [city, setCity] = useState(educationData.city);
  const [region, setRegion] = useState(educationData.region);
  const [country, setCountry] = useState(educationData.country);
  const [degree, setDegree] = useState(educationData.degree);
  const [errors, setErrors] = useState({});

  const values = [
    { label: "Organization Name", organizationName: organizationName },
    { label: "City", city: city },
    { label: "Region", region: region },
    { label: "Country", country: country },
    { label: "Department", department: department },
    { label: "Start Date", startDate: startDate },
    { label: "End Date", endDate: endDate },
    { label: "Degree", degree: degree },
  ];

  const refs = Object.fromEntries(
    values.map((value) => {
      const key = Object.keys(value)[1];
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return [key, useRef()];
    })
  );
  // Error state and refs for validation

  const handleEditEducation = async () => {
    if (!validate({ values, setErrors })) return;
    try {
      const data = {
        organization_name: organizationName,
        city,
        region,
        country,
        department,
        degree:
          degree !== educationData.degree
            ? degree.getFullYear().toString()
            : degree,
        start_date:
          startDate !== educationData.start_date
            ? startDate.getFullYear()
            : startDate,
        end_date:
          endDate !== educationData.end_date
            ? endDate.toLocaleDateString("en-CA")
            : endDate,
        profile_id: user.profile.id,
        type: "education",
      };
      await api
        .post(`/profileEdit/${educationData.id}`, data, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          setbutton2Clicked(false);
          setPopup(false);
          setEditData(false);
          setIsDataFetched(false);
          toast.success(res.data.message);
        });
    } catch (error) {
      console.log(error);
      toast.error("Error Updating Education:" + error);
    }
  };

  return (
    <div
      onClick={() => {
        setbutton2Clicked(false);
        setPopup(false);
        setEditData(false);
      }}
      className="backdrop-blur-sm inset-0 justify-center items-center h-full w-screen z-50 fixed bg-black bg-opacity-60 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-auto p-10 pb-24 bg-white rounded-xl  w-[80%] mt-[5vw] mx-auto"
      >
        <div className="bg-white">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-medium">EDUCATION</h2>
            <RxCross2
              onClick={() => setbutton2Clicked(false)}
              className="text-2xl"
            />
          </div>
          <hr className="my-[1vw]" />

          <EducationInputs
            organizationName={organizationName}
            setOrganizationName={setOrganizationName}
            department={department}
            setDepartment={setDepartment}
            endDate={endDate}
            setEndDate={setEndDate}
            city={city}
            setCity={setCity}
            region={region}
            setRegion={setRegion}
            country={country}
            setCountry={setCountry}
            degree={degree}
            setDegree={setDegree}
            startDate={startDate}
            setStartDate={setStartDate}
            errors={errors}
            refs={refs}
          />
          <div className="flex flex-row gap-[1vw] mt-[4vw]">
            <button
              onClick={handleEditEducation}
              className="rounded-md px-[6.5vw] py-2 bg-[#0000FF] font-medium  text-white"
            >
              Save
            </button>
            <button
              onClick={() => {
                setbutton2Clicked(false);
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
