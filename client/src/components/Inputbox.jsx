import React from "react";

const Inputbox = ({
  label,
  type,
  value,
  setValue,
  placeholder,
  error,
  readOnly = false,
}) => {
  return (
    <>
      <label
        htmlFor={label}
        className={`block text-sm font-medium text-gray-700 mb-1 `}
      >
        {label}
      </label>
      <input
        id={label}
        type={type}
        readOnly={readOnly}
        className={`input border-2 ${
          error ? "border-red-500" : "border-black "
        }`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error &&<p className="text-red-500 mt-1">{error}</p>}
    </>
  );
};

export default Inputbox;
