import React from "react";
import Card from "../Card/Card";
import Heart from "../UI/Heart";
import Button from "../UI/Button";

const PostDetailsSide = ({ username, createdAt, theme, likes }) => {
  return (
    <Card>
      <div>
        <p>{username}</p>
        <small>{createdAt}</small>
      </div>
      <div className="FlexAlign justify-between flex-wrap xl:flex-nowrap mt-4">
        <Button button={`#${theme}`} />
        <Button
          button={
            <>
              <Heart /> {likes}
            </>
          }
          className="mt-2 xl:mt-0 ml-0 xl:ml-2"
        />
      </div>
    </Card>
  );
};

export default PostDetailsSide;
