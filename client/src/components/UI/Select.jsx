import React from "react";

const Select = ({ name, value, onChange, required, className, valueTheme }) => {
  return (
    <select
      id="theme"
      name={name}
      value={valueTheme}
      onChange={onChange}
      required={required}
      className={className}
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
