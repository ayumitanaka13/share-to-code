import React from "react";
import { useDispatch } from "react-redux";

import moment from "moment";

import { deletePost, likePost } from "../actions/posts";

import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H6 from "@material-tailwind/react/Heading6";
import Paragraph from "@material-tailwind/react/Paragraph";
import Button from "@material-tailwind/react/Button";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like ${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return <>Like </>;
  };

  return (
    <Card>
      <CardImage
        src={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        alt={post.title}
      />
      <CardBody>
        <H6 color="gray">{post.title}</H6>
        <Paragraph color="gray">{post.message}</Paragraph>
        <p>{post.username}</p>
        <p>{moment(post.createdAt).fromNow()}</p>
      </CardBody>

      <CardFooter className="flex">
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            color="lightBlue"
            size="lg"
            ripple="light"
            onClick={() => setCurrentId(post._id)}
          >
            Edit
          </Button>
        )}
        <Button
          color="lightBlue"
          size="lg"
          ripple="light"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>

        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            color="lightBlue"
            size="lg"
            ripple="light"
            onClick={() => dispatch(deletePost(post._id))}
          >
            delete
          </Button>
        )}
      </CardFooter>

      <CardFooter>
        <Button>{post.tags.map((tag) => `#${tag}`)}</Button>
      </CardFooter>
    </Card>
  );
};

export default Post;
