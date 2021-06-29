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
import Heart from "../UI/Heart";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    return post?.likes?.length > 0 ? (
      <>
        <Heart /> {post.likes.length}
      </>
    ) : (
      <Heart />
    );
  };

  const openPost = (e) => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className="Hover cursor-pointer">
      <PostHeader theme={post.theme} title={<h4>{post.title}</h4>} onClick={openPost} />
      <PostBody
        message={post.message.split("").splice(0, 45).join("")}
        username={post.username}
        moment={moment(post.createdAt).fromNow()}
      />
      <PostFooter
        content={
          <>
            <Button
              disabled={!user?.result}
              onClick={() => dispatch(likePost(post._id))}
              button={<Likes />}
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
