import React from "react";

const Card = (props) => {
  return (
    <div
      className={`w-full FlexJustify bg-white RoundShadow-lg relative m-1 sm:m-2 ${props.className}`}
      onClick={props.onClick}
    >
      <div className="w-full p-4">{props.children}</div>
    </div>
  );
};

export default Card;
