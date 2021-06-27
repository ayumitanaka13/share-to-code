import React from "react";

const Textarea = ({
  name,
  value,
  type,
  placeholder,
  onChange,
  required,
  className,
}) => {
  return (
    <textarea
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

export default Textarea;
