import React from "react";

const YouTube = ({ youtube }) => {
  return (
    <div className="h-36 sm:h-60 lg:h-72 xl:h-96 w-full mt-4">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${youtube.split("=")[1]}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="RoundShadow"
      ></iframe>
    </div>
  );
};

export default YouTube;
