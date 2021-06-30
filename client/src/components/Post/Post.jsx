import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import moment from "moment";

import { deletePost, likePost } from "../../actions/posts";

import Card from "../Card/Card";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import Button from "../UI/Button";
import LikesLength from "./LikesLength";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const openPost = (e) => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className="Hover">
      <PostHeader
        theme={post.theme}
        title={<h4>{post.title}</h4>}
        onClick={openPost}
      />
      <PostBody
        message={post.message.split("").splice(0, 60).join("")}
        username={post.username}
        moment={moment(post.createdAt).fromNow()}
      />
      <PostFooter
        content={
          <>
            <Button
              disabled={!user?.result}
              onClick={() => dispatch(likePost(post._id))}
              button={<LikesLength likesLength={post.likes.length} />}
              className={!user?.result ? "opacity-50 cursor-not-allowed" : null}
            />
            <Button onClick={openPost} button="More" />
            {(user?.result?.googleId === post?.creator ||
              user?.result?._id === post?.creator) && (
              <>
                <Button
                  onClick={() => dispatch(deletePost(post._id))}
                  button={<i className="fa fa-times" />}
                  className="bg-gray-100"
                />
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentId(post._id);
                  }}
                  button={<i className="fas fa-edit" />}
                  className="bg-gray-100"
                />
              </>
            )}
          </>
        }
      />
    </Card>
  );
};

export default Post;
