import React from "react";

const Container = ({ className, content }) => {
  return (
    <div className={`w-full FlexJustify py-8 bg-gray-50 ${className}`}>
      <div className="w-5/6 lg:w-3/4 FlexJustify flex-wrap sm:flex-nowrap Border">
        {content}
      </div>
      {/* <div className="h-full w-full relative z-0"> */}
      {/* <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob z-0"></div>
      <div className="absolute top-0 left-1/2 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 z-0"></div>
      <div className="absolute top-40 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 z-0"></div> */}
      {/* </div> */}
    </div>
  );
};

export default Container;
