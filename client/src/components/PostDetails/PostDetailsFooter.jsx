import React from "react";
import Button from "../UI/Button";

const PostDetailsFooter = ({ content }) => {
  return (
    <div className="mt-6 lg:mt-8">
      <div className="bg-gray-100 text-center RoundShadow p-2 lg:p-4">
        {/* <div className="bg-orange bg-opacity-20 text-center RoundShadow p-4"> */}
        {/* <h6 className>Read Next</h6> */}
        <h6 className="text-orange">Read Next</h6>
      </div>
      <div className="h-72 md:h-96 overflow-y-scroll mt-2">{content}</div>
    </div>
  );
};

export default PostDetailsFooter;
