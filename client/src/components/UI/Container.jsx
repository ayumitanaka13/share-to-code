import React from "react";

const Container = ({ className, content }) => {
  return (
    <div className={`w-full FlexJustify py-8 lg:py-16 bg-gray-50 ${className}`}>
      <div className="w-5/6 lg:w-3/4 FlexJustify flex-wrap sm:flex-nowrap Border">
        {content}
      </div>
    </div>
  );
};

export default Container;
