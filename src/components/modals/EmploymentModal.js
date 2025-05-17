import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../index";
import api from "../api";
import toast from "react-hot-toast";

export const EmploymentAddModal = ({
  setbutton1Clicked,
  setPopup,
  setIsDataFetched,
  setAddData,
}) => {
  const { user, setFetchData } = useContext(Context);
  const [organizationName, setOrganizationName] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [role, setRole] = useState("");

  const handleAddEmployment = async () => {
    try {
      const data = {
        organization: organizationName,
        city,
        region,
        country,
        department,
        start_date: startDate,
        end_date: endDate,
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
          //console.log(res.data.message);
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

          <div className="flex xss:flex-col md:flex-row md:gap-4 justify-between ">
            <div className="flex flex-col xss:w-full w-[60%] ">
              <label className="font-medium">Organization Name</label>
              <input
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder="Enter Organization"
              />
            </div>
            <div className="flex flex-col w-[39%] xss:w-full ">
              <label className="font-medium">City</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="text"
                placeholder="Enter City"
              />
            </div>
          </div>

          <div className="flex justify-between xss:flex-col md:flex-row md:gap-4 mt-[1vw]">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">Region or state</label>
              <input
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%]  xss:w-full">
              <label className="font-medium">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="text"
                placeholder="Enter City"
              >
                <option disabled value="">
                  Select Country
                </option>
                <option value="india">India</option>
                <option value="pakistan">Pakistan</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">Department</label>
              <input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%]  xss:w-full">
              <label className="font-medium">Start Date</label>
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="date"
                placeholder=""
              />
            </div>
          </div>

          <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">Role/Title</label>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%]  xss:w-full">
              <label className="font-medium">End Date</label>
              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="date"
                placeholder=""
              />
            </div>
          </div>

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
  //console.log("Employee Data: ", employeeData);
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

  const handleEditEmployment = async () => {
    try {
      const data = {
        organization: organizationName,
        city,
        region,
        country,
        department,
        start_date: startDate,
        end_date: endDate,
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
          console.log(res.data.message);
          setbutton1Clicked(false);
          setPopup(false);
          setEditData(false);
          console.log("Calling setFetchData from EmploymentEditModal");
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

          <div className="flex xss:flex-col md:flex-row md:gap-4 justify-between ">
            <div className="flex flex-col xss:w-full w-[60%] ">
              <label className="font-medium">Organization Name</label>
              <input
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder="Enter Organization"
              />
            </div>
            <div className="flex flex-col w-[39%] xss:w-full ">
              <label className="font-medium">City</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="text"
                placeholder="Enter City"
              />
            </div>
          </div>

          <div className="flex justify-between xss:flex-col md:flex-row md:gap-4 mt-[1vw]">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">Region or state</label>
              <input
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%]  xss:w-full">
              <label className="font-medium">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="text"
                placeholder="Enter City"
              >
                <option disabled value="">
                  Select Country
                </option>
                <option value="india">India</option>
                <option value="pakistan">Pakistan</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">Department</label>
              <input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%]  xss:w-full">
              <label className="font-medium">Start Date</label>
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="date"
                placeholder=""
              />
            </div>
          </div>

          <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">Role/Title</label>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%]  xss:w-full">
              <label className="font-medium">End Date</label>
              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="date"
                placeholder=""
              />
            </div>
          </div>

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
