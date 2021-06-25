import React from "react";

const FormHeader = ({ currentId }) => {
  return (
    // <div className="bg-orange text-orange text-center -mt-8 py-4 rounded shadow">
      <h4>{currentId ? "Editing" : "Creating"} Post</h4>
    // </div>
  );
};

export default FormHeader;
