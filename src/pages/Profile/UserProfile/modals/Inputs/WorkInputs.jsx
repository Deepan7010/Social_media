import React from "react";

import DateInput from "@/components/Form/InputStyles/DateInput";
import TextInput from "@/components/Form/InputStyles/TextInput";

export const WorkInputs = ({
  workType,
  setWorkType,
  workTitle,
  setWorkTitle,
  journalTitle,
  setJournalTitle,
  link,
  setLink,
  publicationDate,
  setPublicationDate,
  errors = {},
  refs = {},
}) => {
  return (
    <>
      <div className="flex justify-between xss:flex-col md:flex-row md:gap-4">
        <div className="flex flex-col w-[60%] xss:w-full">
          <TextInput
            label={"Work Type"}
            value={workType}
            setValue={setWorkType}
            required
            error={errors.workType}
            inputRef={refs.workType}
          />
        </div>
        <div className="flex flex-col w-[39%] xss:w-full">
          <TextInput
            label={"Work Title"}
            value={workTitle}
            setValue={setWorkTitle}
            required
            error={errors.workTitle}
            inputRef={refs.workTitle}
          />
        </div>
      </div>
      <div className="flex justify-between mt-[1vw] xss:flex-col sm:flex">
        <div className="flex flex-col w-[100%]">
          <TextInput
            label={"Journal Title"}
            value={journalTitle}
            setValue={setJournalTitle}
            required
            error={errors.journalTitle}
            inputRef={refs.journalTitle}
          />
        </div>
      </div>
      <div className="flex justify-between mt-[1vw] xss:flex-col md:flex-row md:gap-4">
        <div className="flex flex-col w-[60%] xss:w-full">
          <TextInput
            label={"Link"}
            value={link}
            setValue={setLink}
            required
            error={errors.link}
            inputRef={refs.link}
          />
        </div>
        <div className="flex flex-col w-[39%] xss:w-full relative">
          <DateInput
            label={"Publication Date"}
            value={publicationDate}
            setValue={setPublicationDate}
            isFullDate={true}
            required
            error={errors.publicationDate}
            inputRef={refs.publicationDate}
          />
        </div>
      </div>
    </>
  );
};
