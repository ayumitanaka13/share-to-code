import React from "react";

const PostHeader = ({ src, alt, title }) => {
  return (
    <div className="relative -mt-8">
      <img src={src} alt={alt} className="rounded-lg shadow-lg" />
      <div className="h-full w-full FlexCenter absolute top-0 Border">
        <div className="text-white text-center Border">
          <h1>
            <i className="fab fa-react mb-2" />
          </h1>
          {title}
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
