import React from "react";

import DateInput from "@/components/Form/InputStyles/DateInput";
import SelectionInput from "@/components/Form/InputStyles/SelectionInput";
import TextInput from "@/components/Form/InputStyles/TextInput";

export const EmploymentInputs = ({
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
  role,
  setRole,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  errors = {},
  refs = {},
}) => {
  return (
    <>
      <div className="flex xss:flex-col md:flex-row md:gap-4 justify-between ">
        <div className="flex flex-col xss:w-full w-[60%] ">
          <TextInput
            label={"Organization Name"}
            value={organizationName}
            setValue={setOrganizationName}
            required
            error={errors.organizationName}
            inputRef={refs.organizationName}
          />
        </div>
        <div className="flex flex-col w-[39%] xss:w-full ">
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
      <div className="flex justify-between xss:flex-col md:flex-row md:gap-4 mt-[1vw]">
        <div className="flex flex-col w-[60%] xss:w-full">
          <TextInput
            label={"Enter Region or State"}
            value={region}
            setValue={setRegion}
            required
            error={errors.region}
            inputRef={refs.region}
          />
        </div>
        <div className="flex flex-col w-[39%]  xss:w-full">
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
        <div className="flex flex-col xss:w-full">
          <TextInput
            label={"Role/Title"}
            value={role}
            setValue={setRole}
            required
            error={errors.role}
            inputRef={refs.role}
          />
        </div>
      </div>
      <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
        <div className="flex flex-col w-[60%] xss:w-full relative">
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
        <div className="flex flex-col w-[39%] xss:w-full relative">
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
    </>
  );
};
