import React from "react";
import Heart from "../UI/Heart";

const LikesLength = ({ likesLength }) => {
  return likesLength > 0 ? (
    <>
      <Heart /> {likesLength}
    </>
  ) : (
    <Heart />
  );
};

export default LikesLength;
