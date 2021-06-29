import React from "react";
import YouTube from "./YouTube";

const PostDetailsBody = ({ message, youtube, youtube2, youtube3 }) => {
  return (
    <div className="mt-4">
      <div className="bg-gray-50 RoundShadow p-4">
        <p>{message}</p>
      </div>
      <YouTube youtube={youtube} />
      {youtube2 && <YouTube youtube={youtube2} />}
      {youtube3 && <YouTube youtube={youtube3} />}
    </div>
  );
};

export default PostDetailsBody;
