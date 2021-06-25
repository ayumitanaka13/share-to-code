import React from "react";

const PostDetailsFooter = ({ content }) => {
  return (
    <div className="mt-4 Border">
      <h6>You might also like</h6>
      <div className="FlexJustify mt-4 Border">{content}</div>
    </div>
  );
};

export default PostDetailsFooter;
