import React from "react";

const Container = (props) => {
  return (
    <div className="min-h-full w-full flex justify-center py-16 border-4">
      <div className="w-5/6 lg:w-2/3 border-8">{props.children}</div>
    </div>
  );
};

export default Container;
