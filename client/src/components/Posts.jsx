import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

import Container from "./UI/Container";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  console.log("posts data", posts);

  if (!posts.length && !isLoading) return <>No Posts</>;

  // return isLoading ? (
  //   <Progress color="lightBlue" value="50" percentage={false} />
  // ) : (
  return (
    <Container
      className="bg-gray-100"
      content={
        // isLoading ? (
        //   <Progress color="lightBlue" value="50" percentage={false} />
        // ) : (
        <div className="w-full flex flex-wrap Border">
          {posts?.map((post, i) => (
            <div key={i} className="w-full md:w-1/2 2xl:w-1/3 py-4 px-2">
              <Post post={post} setCurrentId={setCurrentId} />
            </div>
          ))}
        </div>
        // )
      }
    />
  );
};

export default Posts;
