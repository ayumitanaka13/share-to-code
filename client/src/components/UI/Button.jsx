import React from "react";

const Button = ({ type, onClick, disabled, button }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-yellow-500 rounded py-1 px-6"
    >
      {button}
    </button>
  );
};

export default Button;
