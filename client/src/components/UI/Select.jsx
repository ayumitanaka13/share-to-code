import React from "react";

const Select = ({
  name,
  value,
  type,
  placeholder,
  onChange,
  required,
  className,
  defaultValue,
}) => {
  return (
    // <input
    //   name={name}
    //   value={value}
    //   type={type}
    //   placeholder={placeholder}
    // onChange={onChange}
    // required={required}
    //   className={className}
    // />

    <select
      id="theme"
      name={name}
      onChange={onChange}
      required={required}
      className={className}
      defaultValue={defaultValue}
    >
      <option value="" disabled selected>
        *Theme
      </option>
      <option value="HTML">HTML</option>
      <option value="CSS">CSS</option>
      <option value="Sass">Sass</option>
      <option value="JavaScript">JavaScript</option>
      <option value="React">React</option>
      <option value="Node">Node</option>
      <option value="Other">Other</option>
    </select>
  );
};

export default Select;
