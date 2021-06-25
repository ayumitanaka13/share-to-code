import React from "react";

const Card = (props) => {
  return (
    <div className="w-full FlexJustify bg-white rounded-lg shadow-lg relative　m-2">
      <div className="w-full p-4">{props.children}</div>
    </div>
  );
};

export default Card;
