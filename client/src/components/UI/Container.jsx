import React from "react";

const Container = (props) => {
  return (
    <div className="min-h-full w-full flex justify-center py-32 border">
      <div className="w-5/6 lg:w-3/4 border">{props.children}</div>
    </div>
  );
};

export default Container;
