import React from "react";

const Button = ({ type, value, onClick, disabled, className, button }) => {
  return (
    <button
      type={type}
      // value={value}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {button}
    </button>
  );
};

export default Button;
