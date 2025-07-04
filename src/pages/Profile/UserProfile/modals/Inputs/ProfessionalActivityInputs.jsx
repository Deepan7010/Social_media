import React from "react";

import DateInput from "@/components/Form/InputStyles/DateInput";
import SelectionInput from "@/components/Form/InputStyles/SelectionInput";
import TextInput from "@/components/Form/InputStyles/TextInput";


export const ProfessionalActivityInputs = ({
  organizationName,
  setOrganizationName,
  city,
  setCity,
  region,
  setRegion,
  country,
  setCountry,
  department,
  setDepartment,
  startDate,
  setStartDate,
  degree,
  setDegree,
  endDate,
  setEndDate,
  errors = {},
  refs = {},
}) => {
  return (
    <>
      <div className="flex justify-between xss:flex-col md:flex-row md:gap-4">
        <div className="flex flex-col w-[60%] xss:w-full">
          <TextInput
            label={"Organization Name"}
            value={organizationName}
            setValue={setOrganizationName}
            required
            error={errors.organizationName}
            inputRef={refs.organizationName}
          />
        </div>
        <div className="flex flex-col w-[39%]  xss:w-full">
          <TextInput
            label={"City"}
            value={city}
            setValue={setCity}
            required
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
            required
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
            required
            error={errors.country}
            inputRef={refs.country}
          />
        </div>
      </div>
      <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
        <div className="flex flex-col w-[60%] xss:w-full">
          <TextInput
            label={"Department"}
            value={department}
            setValue={setDepartment}
            required
            error={errors.department}
            inputRef={refs.department}
          />
        </div>
        <div className="flex flex-col w-[39%] xss:w-full relative">
          <DateInput
            label={"Start Year"}
            value={startDate}
            setValue={setStartDate}
            isFullDate={false}
            required
            error={errors.startDate}
            inputRef={refs.startDate}
          />
        </div>
      </div>
      <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
        <div className="flex flex-col w-[60%] xss:w-full relative">
          <DateInput
            label={"Degree/Title"}
            value={degree}
            setValue={setDegree}
            isFullDate={false}
            required
            error={errors.degree}
            inputRef={refs.degree}
          />
        </div>
        <div className="flex flex-col w-[39%] xss:w-full relative">
          <DateInput
            label={"End Date"}
            value={endDate}
            setValue={setEndDate}
            isFullDate={true}
            required
            error={errors.endDate}
            inputRef={refs.endDate}
          />
        </div>
      </div>
    </>
  );
};
