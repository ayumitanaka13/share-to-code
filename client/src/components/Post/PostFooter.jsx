import React from "react";
import Button from "../UI/Button";

const PostFooter = ({content}) => {
  return (
    <div className="FlexAlign justify-between mt-2 Border">
        {content}
    </div>
  );
};

export default PostFooter;
