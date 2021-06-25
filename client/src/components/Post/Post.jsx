import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import moment from "moment";

import { deletePost, likePost } from "../../actions/posts";
import thumbnail from "../../images/thumbnail.png";

import Card from "../Card/Card";
import Button from "../UI/Button";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          {post.likes.length} <i className="fas fa-heart" />
        </>
      ) : (
        <>
          {post.likes.length} <i className="fas fa-heart" />
        </>
      );
    }
    return <i className="fas fa-heart" />;
  };

  const openPost = (e) => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card>
      <PostHeader src={thumbnail} title={<h4>{post.title}</h4>} />
      <PostBody
        message={`${post.message.split(" ").splice(0, 12).join(" ")}...`}
        username={post.username}
        moment={moment(post.createdAt).fromNow()}
      />
      <PostFooter
        content={
          <>
            {/* <div className="flex justify-between"> */}
            <Button
              disabled={!user?.result}
              onClick={() => dispatch(likePost(post._id))}
              button={<Likes />}
            />
            <Button onClick={openPost} button="more" />
            {/* </div> */}
            {(user?.result?.googleId === post?.creator ||
              user?.result?._id === post?.creator) && (
              // <div className="flex justify-between">
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
              // </div>
            )}
          </>
        }
      />
    </Card>
  );
};

export default Post;
