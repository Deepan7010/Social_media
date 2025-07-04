import React from "react";

import DateInput from "@/components/Form/InputStyles/DateInput";
import SelectionInput from "@/components/Form/InputStyles/SelectionInput";
import TextInput from "@/components/Form/InputStyles/TextInput";

export const FundingDetailsInputs = ({
  titleOfFundedProject,
  setTitleOfFundedProject,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  city,
  setCity,
  region,
  setRegion,
  country,
  setCountry,
  projectLink,
  setProjectLink,
  description,
  setDescription,
  fundingType,
  setFundingType,
  fundingSubtype,
  setFundingSubtype,
  totalFundingAmount,
  setTotalFundingAmount,
  fundingAgencyName,
  setFundingAgencyName,
  fundingIdentifier,
  setFundingIdentifier,
  grantLink,
  setGrantLink,
  errors = {},
  refs = {},
}) => {
  return (
    <>
      <div className="flex justify-between xss:flex-col md:flex-row md:gap-4">
        <div className="flex flex-col w-[60%] xss:w-full ">
          <SelectionInput
            label={"Funding Type"}
            value={fundingType}
            setValue={setFundingType}
            options={["One", "Two", "Three"]}
            error={errors.fundingType}
            refs={refs.fundingType}
          />
        </div>

        <div className="flex flex-col w-[39%] xss:w-full">
          <TextInput
            label={"Funding Sub Type"}
            value={fundingSubtype}
            setValue={setFundingSubtype}
            error={errors.fundingSubtype}
            inputRef={refs.fundingSubtype}
          />
        </div>
      </div>
      <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
        <div className="flex flex-col w-[60%] xss:w-full">
          <TextInput
            label={"Title of Funded Project"}
            value={titleOfFundedProject}
            setValue={setTitleOfFundedProject}
            error={errors.titleOfFundedProject}
            inputRef={refs.titleOfFundedProject}
          />
        </div>
        <div className="flex flex-col w-[39%] xss:w-full">
          <TextInput
            label={"Project Link"}
            value={projectLink}
            setValue={setProjectLink}
            error={errors.projectLink}
            inputRef={refs.projectLink}
          />
        </div>
      </div>

      <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
        <div className="flex flex-col w-[60%] xss:w-full">
          <TextInput
            label={"Description"}
            value={description}
            setValue={setDescription}
            error={errors.description}
            inputRef={refs.description}
          />
        </div>
        <div className="flex flex-col xss:w-full">
          <DateInput
            isFullDate={true}
            label={"Start Date"}
            value={startDate}
            setValue={setStartDate}
            required
            error={errors.startDate}
            inputRef={refs.startDate}
          />
        </div>
      </div>

      <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
        <div className="flex flex-col w-[60%] xss:w-full">
          <TextInput
            label={"Total Funding Amount"}
            value={totalFundingAmount}
            setValue={setTotalFundingAmount}
            error={errors.totalFundingAmount}
            inputRef={refs.totalFundingAmount}
          />
        </div>
        <div className="flex flex-col w-[39%] xss:w-full">
          <DateInput
            isFullDate={true}
            label={"End Date"}
            value={endDate}
            setValue={setEndDate}
            required
            error={errors.endDate}
            inputRef={refs.endDate}
          />
        </div>
      </div>

      <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
        <div className="flex flex-col w-[60%] xss:w-full">
          <TextInput
            label={"Funding Agency Name"}
            value={fundingAgencyName}
            setValue={setFundingAgencyName}
            error={errors.fundingAgencyName}
            inputRef={refs.fundingAgencyName}
          />
        </div>
        <div className="flex flex-col w-[39%] xss:w-full">
          <TextInput
            label={"City"}
            value={city}
            setValue={setCity}
            error={errors.city}
            inputRef={refs.city}
          />
        </div>
      </div>

      <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
        <div className="flex flex-col w-[60%] xss:w-full">
          <TextInput
            label={"Region or state"}
            value={region}
            setValue={setRegion}
            error={errors.region}
            inputRef={refs.region}
          />
        </div>
        <div className="flex flex-col w-[39%] xss:w-full">
          <SelectionInput
            label={"Country"}
            value={country}
            setValue={setCountry}
            options={["India", "Pakistan", "Afghanistan"]}
            error={errors.country}
            refs={refs.country}
          />
        </div>
      </div>

      <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
        <div className="flex flex-col w-[60%] xss:w-full">
          <TextInput
            label={"Funding Identifier(1) Grant Number"}
            value={fundingIdentifier}
            setValue={setFundingIdentifier}
            error={errors.fundingIdentifier}
            inputRef={refs.fundingIdentifier}
          />
        </div>
        <div className="flex flex-col w-[39%] xss:w-full">
          <TextInput
            label={"Grant Link"}
            value={grantLink}
            setValue={setGrantLink}
            error={errors.grantLink}
            inputRef={refs.grantLink}
          />
        </div>
      </div>
    </>
  );
};
