import React from "react";

const Container = ({ className, content }) => {
  return (
    <div className={`w-full FlexJustify bg-gray-50 py-8 lg:py-16 ${className}`}>
      <div className="w-5/6 lg:w-3/4 FlexJustify flex-wrap md:flex-nowrap">
        {content}
      </div>
    </div>
  );
};

export default Container;
