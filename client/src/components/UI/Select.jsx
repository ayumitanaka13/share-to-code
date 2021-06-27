import React from "react";

const Select = ({
  name,
  value,
  type,
  placeholder,
  onChange,
  required,
  className,
}) => {
  return (
    // <input
    //   name={name}
    //   value={value}
    //   type={type}
    //   placeholder={placeholder}
    //   onChange={onChange}
    //   required={required}
    //   className={className}
    // />
    <select id="theme">
      <option value="" disabled selected>*Theme</option>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
      <option value="hamster">Hamster</option>
      <option value="parrot">Parrot</option>
      <option value="spider">Spider</option>
      <option value="goldfish">Goldfish</option>
    </select>
  );
};

export default Select;
