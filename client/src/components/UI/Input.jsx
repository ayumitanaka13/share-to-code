import React from "react";

const Input = ({ name, value, type, placeholder, onChange, required }) => {
  return (
    <input
      className="h-12 w-full bg-gray-50 rounded shadow-inner focus:outline-none mt-4 px-2"
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
    />
  );
};

export default Input;
