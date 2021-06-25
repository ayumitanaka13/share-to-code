import React from "react";
import Card from "../Card/Card";
import Button from "../UI/Button";

const PostDetailsSide = ({ username, createdAt, theme, likes }) => {
  return (
    <Card>
      <div>
        <p>{username}</p>
        <p>{createdAt}</p>
      </div>
      <div className="FlexAlign justify-between mt-4">
        <Button button={`#${theme}`} />
        <Button button={`♡${likes}`} className="ml-2" />
      </div>
    </Card>
  );
};

export default PostDetailsSide;
