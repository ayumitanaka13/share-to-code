import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

import Container from "./UI/Container";
import Loading from "./UI/Loading";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  console.log("posts", posts);

  return (
    <Container
      className="bg-gray-100"
      content={
        !posts.length && !isLoading ? (
          <h2>No Post</h2>
        ) : isLoading ? (
          <Loading />
        ) : (
          <div className="w-full flex flex-wrap">
            {posts?.map((post, i) => (
              <div
                key={i}
                className="w-full FlexJustify md:w-1/2 2xl:w-1/3 my-1 sm:my-0 py-2"
              >
                <Post post={post} setCurrentId={setCurrentId} />
              </div>
            ))}
          </div>
        )
      }
    />
  );
};

export default Posts;
