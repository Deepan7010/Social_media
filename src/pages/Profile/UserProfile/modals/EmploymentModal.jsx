import React, { useContext, useRef, useState } from "react";

import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

import api from "@/components/api/api";
import { validate } from "@/components/Form/formValidator.js";
import { Context } from "@/index";

import { EmploymentInputs } from "./Inputs/EmploymentInputs";

export const EmploymentAddModal = ({
  setbutton1Clicked,
  setPopup,
  setIsDataFetched,
  setAddData,
}) => {
  const { user } = useContext(Context);
  const [organizationName, setOrganizationName] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});

  const values = [
    { label: "Organization Name", organizationName: organizationName },
    { label: "City", city: city },
    { label: "Region", region: region },
    { label: "Country", country: country },
    { label: "Department", department: department },
    { label: "Start Date", startDate: startDate },
    { label: "End Date", endDate: endDate },
    { label: "Role", role: role },
  ];

  const refs = Object.fromEntries(
    values.map((value) => {
      const key = Object.keys(value)[1];
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return [key, useRef()];
    })
  );

  const handleAddEmployment = async () => {
    if (!validate({ values, setErrors })) return;
    try {
      const data = {
        organization: organizationName,
        city,
        region,
        country,
        department,
        start_date: startDate ? startDate.toLocaleDateString("en-CA") : null,
        end_date: endDate ? endDate.toLocaleDateString("en-CA") : null,
        role,
        profile_id: user.profile.id,
        type: "employee",
      };
      await api
        .post("/profileAdd", data, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          setbutton1Clicked(false);
          setPopup(false);
          setAddData(false);
          setIsDataFetched(false);
          toast.success(res.data.message);
        });
    } catch (error) {
      console.log(error);
      toast.error("Error Adding Employment:" + error);
    }
  };
  return (
    <div
      onClick={() => {
        setbutton1Clicked(false);
        setPopup(false);
        setAddData(false);
      }}
      className="backdrop-blur-sm fixed inset-0 justify-center items-center z-50 h-full w-screen bg-black bg-opacity-60 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-auto p-10 pb-24 bg-white rounded-xl  w-[80%] mt-[5vw] mx-auto"
      >
        <div className="bg-white">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-medium">EMPLOYMENT</h2>
            <RxCross2
              onClick={() => setbutton1Clicked(false)}
              className="text-2xl"
            />
          </div>
          <hr className="my-[1vw]" />
          <EmploymentInputs
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
            role={role}
            setRole={setRole}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            errors={errors}
            refs={refs}
          />
          <div className="flex flex-row gap-[1vw] mt-[4vw]">
            <button
              onClick={handleAddEmployment}
              className=" rounded-md px-[6.5vw] py-2 bg-[#0000FF] font-medium  text-white"
            >
              Save
            </button>
            <button
              onClick={() => {
                setbutton1Clicked(false);
                setAddData(false);
              }}
              className=" rounded-md px-[6.5vw] py-2 text-[#0000FF]  font-medium bg-transparent border-[#0000FF] border-[1.5px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EmploymentEditModal = ({
  setbutton1Clicked,
  setPopup,
  setIsDataFetched,
  employeeData,
  setEditData,
}) => {
  const { user } = useContext(Context);
  const [organizationName, setOrganizationName] = useState(
    employeeData.organization
  );
  const [city, setCity] = useState(employeeData.city);
  const [region, setRegion] = useState(employeeData.region);
  const [country, setCountry] = useState(employeeData.country);
  const [department, setDepartment] = useState(employeeData.department);
  const [startDate, setStartDate] = useState(employeeData.start_date);
  const [endDate, setEndDate] = useState(employeeData.end_date);
  const [role, setRole] = useState(employeeData.role);
  const [errors, setErrors] = useState({});

  const values = [
    { label: "Organization Name", organizationName: organizationName },
    { label: "City", city: city },
    { label: "Region", region: region },
    { label: "Country", country: country },
    { label: "Department", department: department },
    { label: "Start Date", startDate: startDate },
    { label: "End Date", endDate: endDate },
    { label: "Role", role: role },
  ];

  const refs = Object.fromEntries(
    values.map((value) => {
      const key = Object.keys(value)[1]; // "name", "email", etc.
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return [key, useRef()];
    })
  );

  const handleEditEmployment = async () => {
    if (!validate({ values, setErrors })) return;
    try {
      const data = {
        organization: organizationName,
        city,
        region,
        country,
        department,
        start_date:
          startDate !== employeeData.start_date
            ? startDate.toLocaleDateString("en-CA")
            : startDate,
        end_date:
          endDate !== employeeData.end_date
            ? endDate.toLocaleDateString("en-CA")
            : endDate,
        role,
        profile_id: user.profile.id,
        type: "employee",
      };
      await api
        .post(`/profileEdit/${employeeData.id}`, data, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          setbutton1Clicked(false);
          setPopup(false);
          setEditData(false);
          setIsDataFetched(false);
          toast.success(res.data.message);
        });
    } catch (error) {
      console.log(error);
      toast.error("Error Adding Employment:" + error);
    }
  };

  return (
    <div
      onClick={() => {
        setbutton1Clicked(false);
        setPopup(false);
        setEditData(false);
      }}
      className="backdrop-blur-sm fixed inset-0 justify-center items-center z-50 h-full w-screen bg-black bg-opacity-60 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-auto p-10 pb-24 bg-white rounded-xl  w-[80%] mt-[5vw] mx-auto"
      >
        <div className="bg-white">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-medium">EMPLOYMENT</h2>
            <RxCross2
              onClick={() => setbutton1Clicked(false)}
              className="text-2xl"
            />
          </div>
          <hr className="my-[1vw]" />
          <EmploymentInputs
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
            role={role}
            setRole={setRole}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            errors={errors}
            refs={refs}
          />

          <div className="flex flex-row gap-[1vw] mt-[4vw]">
            <button
              onClick={handleEditEmployment}
              className=" rounded-md px-[6.5vw] py-2 bg-[#0000FF] font-medium  text-white"
            >
              Save
            </button>
            <button
              onClick={() => {
                setbutton1Clicked(false);
                setEditData(false);
              }}
              className=" rounded-md px-[6.5vw] py-2 text-[#0000FF]  font-medium bg-transparent border-[#0000FF] border-[1.5px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
