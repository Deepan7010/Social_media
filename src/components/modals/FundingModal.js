import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../index";
import toast from "react-hot-toast";
import api from "../api";
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

  const handleAddFunding = async (e) => {
    e.preventDefault();
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
        start_date: startDate,
        end_date: endDate,
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

          <div className="flex justify-between xss:flex-col md:flex-row md:gap-4">
            <div className="flex flex-col w-[60%] xss:w-full ">
              <label className="font-medium">Funding Type</label>
              <select
                value={fundingType}
                onChange={(e) => setFundingType(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="text"
                placeholder="Select Funding Type"
              >
                <option disabled value="">
                  Select Funding Type
                </option>
                <option value="one">One</option>
                <option value="two">Two</option>
                <option value="three">Three</option>
              </select>
            </div>

            <div className="flex flex-col w-[39%] xss:w-full">
              <label className="font-medium">Funding Sub Type</label>
              <input
                value={fundingSubtype}
                onChange={(e) => setFundingSubtype(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder="Enter City"
              />
            </div>
          </div>

          <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">Title of Funded Project</label>
              <input
                value={titleOfFundedProject}
                onChange={(e) => setTitleOfFundedProject(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%]  xss:w-full">
              <label className="font-medium">Project Link</label>
              <input
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="text"
                placeholder=""
              />
            </div>
          </div>

          <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">Description</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%] xss:w-full ">
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
            <div className="flex flex-col w-[60%] xss:w-full ">
              <label className="font-medium">Total Funding Amount</label>
              <input
                value={totalFundingAmount}
                onChange={(e) => setTotalFundingAmount(e.target.value)}
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

          <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">Funding Agency Name</label>
              <input
                value={fundingAgencyName}
                onChange={(e) => setFundingAgencyName(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%] xss:w-full ">
              <label className="font-medium">City</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="text"
                placeholder=""
              />
            </div>
          </div>

          <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
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
                <option value="India">India</option>
                <option value="Pakistan">Pakistan</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">
                Funding Identifier(1) Grant Number
              </label>
              <input
                value={fundingIdentifier}
                onChange={(e) => setFundingIdentifier(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%]  xss:w-full">
              <label className="font-medium">Grant Link</label>
              <input
                value={grantLink}
                onChange={(e) => setGrantLink(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="text"
                placeholder=""
              />
            </div>
          </div>

          <h1 className="font-medium mt-[1vw]">Relationship</h1>
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
  const { user, setFetchData } = useContext(Context);
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

  const handleEditFunding = async () => {
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
        start_date: startDate,
        end_date: endDate,
        profile_id: user.profile.id,
        type: "funding_details",
      };
      //console.log(data);

      await api
        .post(`/profileEdit/${fundingDetailsData.id}`, data, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
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

          <div className="flex justify-between md:gap-4 xss:flex-col md:flex-row">
            <div className="flex flex-col w-[60%] xss:w-full ">
              <label className="font-medium">Funding Type</label>
              <select
                value={fundingType}
                onChange={(e) => setFundingType(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="text"
                placeholder="Select Funding Type"
              >
                <option disabled value="">
                  Select Funding Type
                </option>
                <option value="one">One</option>
                <option value="two">Two</option>
                <option value="three">Three</option>
              </select>
            </div>

            <div className="flex flex-col w-[39%] xss:w-full">
              <label className="font-medium">Funding Sub Type</label>
              <input
                value={fundingSubtype}
                onChange={(e) => setFundingSubtype(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder="Enter City"
              />
            </div>
          </div>

          <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">Title of Funded Project</label>
              <input
                value={titleOfFundedProject}
                onChange={(e) => setTitleOfFundedProject(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%]  xss:w-full">
              <label className="font-medium">Project Link</label>
              <input
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="text"
                placeholder=""
              />
            </div>
          </div>

          <div className="flex justify-between mt-[1vw] xss:flex-col">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">Description</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%] xss:w-full ">
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
            <div className="flex flex-col w-[60%] xss:w-full ">
              <label className="font-medium">Total Funding Amount</label>
              <input
                value={totalFundingAmount}
                onChange={(e) => setTotalFundingAmount(e.target.value)}
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

          <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row gap-4">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">Funding Agency Name</label>
              <input
                value={fundingAgencyName}
                onChange={(e) => setFundingAgencyName(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%] xss:w-full ">
              <label className="font-medium">City</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="text"
                placeholder=""
              />
            </div>
          </div>

          <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row gap-4">
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
                <option value="India">India</option>
                <option value="Pakistan">Pakistan</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
            <div className="flex flex-col w-[60%] xss:w-full">
              <label className="font-medium">
                Funding Identifier(1) Grant Number
              </label>
              <input
                value={fundingIdentifier}
                onChange={(e) => setFundingIdentifier(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4"
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col w-[39%]  xss:w-full">
              <label className="font-medium">Grant Link</label>
              <input
                value={grantLink}
                onChange={(e) => setGrantLink(e.target.value)}
                className="w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md border-black mt-4 "
                type="text"
                placeholder=""
              />
            </div>
          </div>

          <h1 className="font-medium mt-[1vw]">Relationship</h1>
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
