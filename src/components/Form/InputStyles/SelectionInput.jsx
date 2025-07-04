import React from "react";

const SelectionInput = ({
  label,
  value,
  setValue,
  options,
  required,
  error,
  inputRef,
}) => {
  return (
    <div>
      <label className="font-medium">{label}</label>
      <select
        value={value}
        required={required}
        ref={inputRef}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full border-[1.3px] border-opacity-50 py-3 px-2 rounded-md mt-4 ${
          error ? "border-red-500" : "border-black"
        }`}
        type="text"
        placeholder={`Enter ${label.toLowerCase()}`}
      >
        <option disabled value="">
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 font-semibold mt-2">{error}</p>}
    </div>
  );
};

export default SelectionInput;
