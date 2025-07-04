import React,{ useState } from "react";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";

const formatClasses = ({ isFullDateNeeded }) => {
  if (isFullDateNeeded) {
    return {
      format: "dd-MM-yyyy",
      view: "day",
      maxDetail: "month",
      dayPlaceholder: "dd",
      monthPlaceholder: "mm",
      yearPlaceholder: "yyyy",
    };
  } else {
    return {
      format: "yyyy",
      view: "year",
      maxDetail: "decade",
      yearPlaceholder: "Select Year",
    };
  }
};

const DateInput = ({
  label,
  value,
  setValue,
  isFullDate,
  required,
  error,
  inputRef,
}) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  return (
    <div className="relative">
      <label className="font-medium">{label}</label>
      <DatePicker
        value={value}
        onChange={(date) => {
          setValue(date);
          setPickerOpen(false);
        }}
        clearIcon={null}
        calendarIcon={null}
        isOpen={pickerOpen}
        required={required}
        ref={inputRef}
        className={`peer w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md mt-4 ${
          error ? "border-red-500" : "border-black"
        }`}
        {...formatClasses({ isFullDateNeeded: isFullDate })}
      />

      <FaCalendarAlt
        className="absolute right-3 top-[50px] text-gray-500 cursor-pointer z-10"
        onClick={() => setPickerOpen(!pickerOpen)}
        size={16}
      />
      {error && <p className="text-red-600 font-semibold mt-2">{error}</p>}
    </div>
  );
};

export default DateInput;
