import React from "react";
import YouTube from "./YouTube";

const PostDetailsBody = ({ message, youtube, youtube2, youtube3 }) => {
  return (
    <div className="mt-4">
      <div className="bg-gray-50 RoundShadow p-4">
        <p>{message}</p>
      </div>
      <div className="h-60 lg:h-72 xl:h-96 w-full mt-4">
        <YouTube youtube={youtube} />
        {/* <YouTube youtube={youtube2} />
        <YouTube youtube={youtube3} /> */}
      </div>
    </div>
  );
};

export default PostDetailsBody;
