import React, { useContext, useRef, useState } from "react";

import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

import api from "@/components/api/api";
import { validate } from "@/components/Form/formValidator.js";
import { Context } from "@/index";


import { FundingDetailsInputs } from "./Inputs/FundingDetailsInputs";


export const FundingDetailsAddModal = ({
  setbutton4Clicked,
  setPopup,
  setIsDataFetched,
  setAddData,
}) => {
  const { user } = useContext(Context);
  const [titleOfFundedProject, setTitleOfFundedProject] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [description, setDescription] = useState("");
  const [fundingType, setFundingType] = useState("");
  const [fundingSubtype, setFundingSubtype] = useState("");
  const [totalFundingAmount, setTotalFundingAmount] = useState("");
  const [fundingAgencyName, setFundingAgencyName] = useState("");
  const [fundingIdentifier, setFundingIdentifier] = useState("");
  const [grantLink, setGrantLink] = useState("");
  const [relationship, setRelationship] = useState("");

  const values = [
    { label:"Title of Funded Project", titleOfFundedProject: titleOfFundedProject },
    { label:"Start Date", startDate: startDate },
    { label:"End Date", endDate: endDate },
    { label:"City", city: city },
    { label:"Region", region: region },
    { label:"Country", country: country },
    { label:"Project Link", projectLink: projectLink },
    { label:"Description", description: description },
    { label:"Funding Type", fundingType: fundingType },
    { label:"Funding Subtype", fundingSubtype: fundingSubtype },
    { label:"Total Funding Amount", totalFundingAmount: totalFundingAmount },
    { label:"Funding Agency Name", fundingAgencyName: fundingAgencyName },
    { label:"Funding Identifier", fundingIdentifier: fundingIdentifier },
    { label:"Grant Link", grantLink: grantLink },
    { label:"Relationship", relationship: relationship },
  ];

  const [errors, setErrors] = useState({});

  const refs = Object.fromEntries(
    values.map((value) => {
      const key = Object.keys(value)[1]; // "name", "email", etc.
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return [key, useRef()];
    })
  );

  const handleAddFunding = async (e) => {
    e.preventDefault();
    if (!validate({ values, setErrors })) return;
    try {
      const data = {
        city,
        region,
        country,
        title: titleOfFundedProject,
        project_link: projectLink,
        description,
        funding_type: fundingType,
        funding_subtype: fundingSubtype,
        total_funding_amt: totalFundingAmount,
        funding_agency_name: fundingAgencyName,
        funding_identifier: fundingIdentifier,
        grant_link: grantLink,
        relationship,
        start_date: startDate ? startDate.toLocaleDateString("en-CA") : null,
        end_date: endDate ? endDate.toLocaleDateString("en-CA") : null,
        profile_id: user.profile.id,
        type: "funding_details",
      };
      //console.log(data);

      await api
        .post("/profileAdd", data, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          //console.log(res.data.message);
          setbutton4Clicked(false);
          setPopup(false);
          setAddData(false);
          setIsDataFetched(false);
          toast.success(res.data.message);
        });
    } catch (error) {
      //console.log(error);
      toast.error("Error Adding Funding Details:" + error);
    }
  };

  return (
    <div
      onClick={() => {
        setbutton4Clicked(false);
        setPopup(false);
        setAddData(false);
      }}
      className="backdrop-blur-sm z-50 h-full w-screen absolute justify-center items-center inset-0 bg-black bg-opacity-60 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-auto p-10 pb-24 bg-white rounded-xl  w-[80%] mt-[5vw] mx-auto"
      >
        <div className="bg-white">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-medium">FUNDING DETAILS</h2>
            <RxCross2
              onClick={() => setbutton4Clicked(false)}
              className="text-2xl"
            />
          </div>
          <hr className="my-[1vw]" />

          <FundingDetailsInputs
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            city={city}
            setCity={setCity}
            region={region}
            setRegion={setRegion}
            country={country}
            setCountry={setCountry}
            projectLink={projectLink}
            setProjectLink={setProjectLink}
            description={description}
            setDescription={setDescription}
            fundingType={fundingType}
            setFundingType={setFundingType}
            fundingSubtype={fundingSubtype}
            setFundingSubtype={setFundingSubtype}
            totalFundingAmount={totalFundingAmount}
            setTotalFundingAmount={setTotalFundingAmount}
            fundingAgencyName={fundingAgencyName}
            setFundingAgencyName={setFundingAgencyName}
            fundingIdentifier={fundingIdentifier}
            setFundingIdentifier={setFundingIdentifier}
            grantLink={grantLink}
            setGrantLink={setGrantLink}
            titleOfFundedProject={titleOfFundedProject}
            setTitleOfFundedProject={setTitleOfFundedProject}
            errors={errors}
            refs={refs}
          />

          <h1 className="font-medium mt-[1vw]">Relationship</h1>
          {errors.relationship && (
            <span className="text-red-500 text-xs mt-1">
              {errors.relationship}
            </span>
          )}
          <div className="flex justify-between mt-[1vw]">
            <div className="flex flex-col gap-[0.5vw]">
              <div>
                <div className="flex gap-[0.5vw]">
                  <input
                    type="radio"
                    id="self"
                    name="relationship"
                    value="self"
                    onChange={(e) => setRelationship(e.target.value)}
                  />
                  <label htmlFor="self">Self</label>
                </div>

                <p>The identifier applies to the funding award itself.</p>
              </div>

              <div>
                <div className="flex gap-[0.5vw]">
                  <input
                    type="radio"
                    id="partof"
                    name="relationship"
                    value="partof"
                    onChange={(e) => setRelationship(e.target.value)}
                  />
                  <label htmlFor="partof">Part of</label>
                </div>

                <p>
                  The identifier applies to the larger award of which the
                  project is part.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-[0.5vw]">
              <button className="px-[6.5vw] py-2 rounded-full text-[#0000FF]  font-medium bg-transparent border-[#0000FF] border-[1.5px]">
                Cancel
              </button>
              <button className="px-[6.5vw] py-2 rounded-full bg-[#0000FF] font-medium  text-white">
                + Add another Identifier
              </button>
            </div>
          </div>

          <hr className="my-[1vw]" />

          <div className="flex flex-row gap-[1vw] mt-[4vw]">
            <button
              onClick={handleAddFunding}
              className="rounded-md px-[6.5vw] py-2 bg-[#0000FF] font-medium  text-white"
            >
              Save
            </button>
            <button
              onClick={() => {
                setbutton4Clicked(false);
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
export const FundingDetailsEditModal = ({
  setbutton4Clicked,
  setPopup,
  setIsDataFetched,
  fundingDetailsData,
  setEditData,
}) => {
  const { user } = useContext(Context);
  const [titleOfFundedProject, setTitleOfFundedProject] = useState(
    fundingDetailsData.title
  );
  const [startDate, setStartDate] = useState(fundingDetailsData.start_date);
  const [endDate, setEndDate] = useState(fundingDetailsData.end_date);
  const [city, setCity] = useState(fundingDetailsData.city);
  const [region, setRegion] = useState(fundingDetailsData.region);
  const [country, setCountry] = useState(fundingDetailsData.country);

  const [projectLink, setProjectLink] = useState(
    fundingDetailsData.project_link
  );
  const [description, setDescription] = useState(
    fundingDetailsData.description
  );
  const [fundingType, setFundingType] = useState(
    fundingDetailsData.funding_type
  );
  const [fundingSubtype, setFundingSubtype] = useState(
    fundingDetailsData.funding_subtype
  );
  const [totalFundingAmount, setTotalFundingAmount] = useState(
    fundingDetailsData.total_funding_amt
  );
  const [fundingAgencyName, setFundingAgencyName] = useState(
    fundingDetailsData.funding_agency_name
  );
  const [fundingIdentifier, setFundingIdentifier] = useState(
    fundingDetailsData.funding_identifier
  );
  const [grantLink, setGrantLink] = useState(fundingDetailsData.grant_link);
  const [relationship, setRelationship] = useState(
    fundingDetailsData.relationship
  );

  const values = [
    { label:"Title of Funded Project", titleOfFundedProject: titleOfFundedProject },
    { label:"Start Date", startDate: startDate },
    { label:"End Date", endDate: endDate },
    { label:"City", city: city },
    { label:"Region", region: region },
    { label:"Country", country: country },
    { label:"Project Link", projectLink: projectLink },
    { label:"Description", description: description },
    { label:"Funding Type", fundingType: fundingType },
    { label:"Funding Subtype", fundingSubtype: fundingSubtype },
    { label:"Total Funding Amount", totalFundingAmount: totalFundingAmount },
    { label:"Funding Agency Name", fundingAgencyName: fundingAgencyName },
    { label:"Funding Identifier", fundingIdentifier: fundingIdentifier },
    { label:"Grant Link", grantLink: grantLink },
    { label:"Relationship", relationship: relationship },
  ];

  const [errors, setErrors] = useState({});

  const refs = Object.fromEntries(
    values.map((value) => {
      const key = Object.keys(value)[1]; // "name", "email", etc.
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return [key, useRef()];
    })
  );

  const handleEditFunding = async () => {
    try {
      if (!validate({ values, setErrors })) return;
      const data = {
        city,
        region,
        country,
        title: titleOfFundedProject,
        project_link: projectLink,
        description,
        funding_type: fundingType,
        funding_subtype: fundingSubtype,
        total_funding_amt: totalFundingAmount,
        funding_agency_name: fundingAgencyName,
        funding_identifier: fundingIdentifier,
        grant_link: grantLink,
        relationship,
        start_date:
          startDate !== fundingDetailsData.start_date
            ? startDate.toLocaleDateString("en-CA")
            : startDate,
        end_date:
          endDate !== fundingDetailsData.end_date
            ? endDate.toLocaleDateString("en-CA")
            : endDate,
        profile_id: user.profile.id,
        type: "funding_details",
      };
      //console.log(data);

      await api
        .post(`/profileEdit/${fundingDetailsData.id}`, data, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          //console.log(res.data.message);
          setbutton4Clicked(false);
          setPopup(false);
          setEditData(false);
          setIsDataFetched(false);
          toast.success("Funding Details Updated Successfully");
        });
    } catch (error) {
      //console.log(error);
      toast.error("Error Adding Funding Details:" + error);
    }
  };

  return (
    <div
      onClick={() => {
        setbutton4Clicked(false);
        setPopup(false);
        setEditData(false);
      }}
      className="backdrop-blur-sm z-50 h-full w-screen absolute justify-center items-center inset-0 bg-black bg-opacity-60 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-auto p-10 pb-24 bg-white rounded-xl  w-[80%] mt-[5vw] mx-auto"
      >
        <div className="bg-white">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-medium">FUNDING DETAILS</h2>
            <RxCross2
              onClick={() => setbutton4Clicked(false)}
              className="text-2xl"
            />
          </div>
          <hr className="my-[1vw]" />

          <FundingDetailsInputs
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            city={city}
            setCity={setCity}
            region={region}
            setRegion={setRegion}
            country={country}
            setCountry={setCountry}
            projectLink={projectLink}
            setProjectLink={setProjectLink}
            description={description}
            setDescription={setDescription}
            fundingType={fundingType}
            setFundingType={setFundingType}
            fundingSubtype={fundingSubtype}
            setFundingSubtype={setFundingSubtype}
            totalFundingAmount={totalFundingAmount}
            setTotalFundingAmount={setTotalFundingAmount}
            fundingAgencyName={fundingAgencyName}
            setFundingAgencyName={setFundingAgencyName}
            fundingIdentifier={fundingIdentifier}
            setFundingIdentifier={setFundingIdentifier}
            grantLink={grantLink}
            setGrantLink={setGrantLink}
            titleOfFundedProject={titleOfFundedProject}
            setTitleOfFundedProject={setTitleOfFundedProject}
            errors={errors}
            refs={refs}
          />

          <h1 className="font-medium mt-[1vw]">Relationship</h1>
          {errors.relationship && (
            <span className="text-red-500 text-xs mt-1">
              {errors.relationship}
            </span>
          )}
          <div className="flex justify-between mt-[1vw]">
            <div className="flex flex-col gap-[0.5vw]">
              <div>
                <div className="flex gap-[0.5vw]">
                  <input
                    checked={relationship === "self"}
                    type="radio"
                    id="self"
                    name="relationship"
                    value="self"
                    onChange={(e) => setRelationship(e.target.value)}
                  />
                  <label htmlFor="self">Self</label>
                </div>

                <p>The identifier applies to the funding award itself.</p>
              </div>

              <div>
                <div className="flex gap-[0.5vw]">
                  <input
                    checked={relationship === "partof"}
                    type="radio"
                    id="partof"
                    name="relationship"
                    value="partof"
                    onChange={(e) => setRelationship(e.target.value)}
                  />
                  <label htmlFor="partof">Part of</label>
                </div>

                <p>
                  The identifier applies to the larger award of which the
                  project is part.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-[0.5vw]">
              <button className="px-[6.5vw] py-2 rounded-full text-[#0000FF]  font-medium bg-transparent border-[#0000FF] border-[1.5px]">
                Cancel
              </button>
              <button className="px-[6.5vw] py-2 rounded-full bg-[#0000FF] font-medium  text-white">
                + Add another Identifier
              </button>
            </div>
          </div>

          <hr className="my-[1vw]" />

          <div className="flex flex-row gap-[1vw] mt-[4vw]">
            <button
              onClick={handleEditFunding}
              className="rounded-md px-[6.5vw] py-2 bg-[#0000FF] font-medium  text-white"
            >
              Save
            </button>
            <button
              onClick={() => {
                setbutton4Clicked(false);
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
