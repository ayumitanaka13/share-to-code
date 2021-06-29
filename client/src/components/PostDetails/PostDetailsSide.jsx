import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { getPostsBySearch, likePost } from "../../actions/posts";

import Card from "../Card/Card";
import Heart from "../UI/Heart";
import Button from "../UI/Button";

const PostDetailsSide = ({ id, username, createdAt, theme, likes }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const searchPost = () => {
    dispatch(getPostsBySearch({ search: theme }));
    history.push(`/posts/search?searchQuery=${theme || "none"}`);
  };

  // console.log("user", user);

  const Likes = () => {
    return likes > 0 ? (
      <>
        <Heart /> {likes}
      </>
    ) : (
      <Heart />
    );
  };

  // useEffect(() => {
  //   dispatch(likePost());
  // }, []);

  return (
    <Card>
      <div>
        <p>
          <i className="fas fa-user-edit text-gray-400"></i> {username}
        </p>
        <small>{createdAt}</small>
      </div>
      <div className="FlexAlign justify-between flex-wrap xl:flex-nowrap mt-4">
        <Button button={`#${theme}`} onClick={searchPost} />
        <Button
          disabled={!user?.result}
          onClick={() => dispatch(likePost(id))}
          button={<Likes />}
          className="mt-2 xl:mt-0 ml-0 xl:ml-2"
        />
      </div>
    </Card>
  );
};

export default PostDetailsSide;
