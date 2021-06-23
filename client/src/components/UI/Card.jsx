import React from "react";

const Card = (props) => {
  return (
    <div className="w-full FlexJustify bg-white rounded-lg shadow-lg relative">
      <div className="w-11/12 Border py-4">{props.children}</div>
    </div>
  );
};

export default Card;
