import React from "react";

const Input = ({
  name,
  value,
  type,
  placeholder,
  onChange,
  required,
  className,
}) => {
  return (
    <input
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      className={className}
    />
  );
};

export default Input;
