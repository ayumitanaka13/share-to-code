import React from "react";

const PostBody = ({ message, username, moment }) => {
  return (
    <div className="mt-4">
      <p>{message}...</p>
      <div className="FlexAlign justify-between mt-2">
        <p className="text-gray-400">
          <i class="fas fa-user-edit text-gray-400"></i> {username}
        </p>
        <small>{moment}</small>
      </div>
    </div>
  );
};

export default PostBody;
