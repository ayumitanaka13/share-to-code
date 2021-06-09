import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";

import Progress from "@material-tailwind/react/Progress";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return <>No Posts</>;

  return isLoading ? (
    <Progress color="lightBlue" value="50" percentage={false} />
  ) : (
    <div className="w-full flex flex-wrap border-4">
      {posts?.map((post, i) => (
        <div key={i} className="w-1/2 p-2 md:p-4 border">
          {/* <div key={post.id} className="border"> */}
          <Post post={post} setCurrentId={setCurrentId} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
