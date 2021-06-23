import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import moment from "moment";

import { getPost, deletePost, likePost } from "../actions/posts";
import thumbnail from "../images/thumbnail.png";

import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H6 from "@material-tailwind/react/Heading6";
import Paragraph from "@material-tailwind/react/Paragraph";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import CardRow from "@material-tailwind/react/CardRow";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        // <>
        //   {post.likes.length > 2
        //     ? `You and ${post.likes.length - 1} others`
        //     : `
        //     ${post.likes.length}
        //     like ${post.likes.length > 1 ? "s" : ""}
        //     `}
        // </>
        <>
          {post.likes.length}
          <Icon name="favorite" size="sm" />
        </>
      ) : (
        // <>
        //   {post.likes.length}
        //   {post.likes.length === 1 ? "Like" : "Likes"}
        // </>
        <>
          {post.likes.length}
          <Icon name="favorite" size="sm" />
        </>
      );
    }

    return <Icon name="favorite" size="sm" />;
  };

  const openPost = (e) => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card>
      <div className="relative border">
        <CardImage src={thumbnail} alt={post.title} />
        <div className="w-full h-full flex items-center justify-center absolute top-0 -mt-4 border">
          <div className="text-center">
            <h1>
              <i className="fab fa-react mb-2" />
            </h1>
            <h3>{post.title}</h3>
          </div>
        </div>
      </div>

      <CardBody>
        <p>{post.message.split(" ").splice(0, 12).join(" ")}...</p>
        <div className="flex items-center justify-between mt-2">
          <p>{post.username}</p>
          <small>{moment(post.createdAt).fromNow()}</small>
        </div>
      </CardBody>

      <CardFooter className="flex justify-between">
        <Button
          color="lightBlue"
          size="lg"
          ripple="light"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>
        <Button onClick={openPost}>more</Button>

        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <>
            <Button
              color="lightBlue"
              size="lg"
              ripple="light"
              iconOnly={true}
              onClick={() => dispatch(deletePost(post._id))}
            >
              <Icon name="close" size="sm" />
            </Button>
            <Button
              color="lightBlue"
              size="lg"
              ripple="light"
              iconOnly={true}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
            >
              <Icon name="edit" size="sm" />
            </Button>
          </>
        )}
      </CardFooter>

      {/* <CardFooter>
        <Button>{post.tags.map((tag) => `#${tag}`)}</Button>
      </CardFooter> */}
    </Card>
  );
};

export default Post;
