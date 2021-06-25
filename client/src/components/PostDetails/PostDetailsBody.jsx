import React from "react";

const PostDetailsBody = ({ message, youtube }) => {
  return (
    <div className="mt-4">
      <div className="bg-gray-50 RoundShadow p-4">
        <p>{message}</p>
      </div>
      <iframe
        width="100%"
        height="480px"
        src={`https://www.youtube.com/embed/${youtube.split("=")[1]}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="RoundShadow mt-4"
      ></iframe>
    </div>
  );
};

export default PostDetailsBody;
