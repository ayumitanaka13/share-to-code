import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { getPostsBySearch, likePost } from "../../actions/posts";

import Card from "../Card/Card";
import Button from "../UI/Button";
import LikesLength from "../Post/LikesLength";

const PostDetailsSide = ({ id, username, createdAt, theme, likesLength }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const searchPost = () => {
    dispatch(getPostsBySearch({ search: theme }));
    history.push(`/posts/search?searchQuery=${theme || "none"}`);
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
          button={<LikesLength likesLength={likesLength} />}
          // className="mt-2 xl:mt-0 ml-0 xl:ml-2"
          className={`${
            !user?.result && "opacity-50 cursor-not-allowed"
          } mt-2 xl:mt-0 ml-0 xl:ml-2`}
        />
      </div>
    </Card>
  );
};

export default PostDetailsSide;
