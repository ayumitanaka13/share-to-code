import React from "react";

const Button = ({ type, onClick, disabled, className, button }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {button}
    </button>
  );
};

export default Button;
