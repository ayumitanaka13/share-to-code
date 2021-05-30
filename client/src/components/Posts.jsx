import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  console.log("post", posts);

  return !posts.length ? (
    <>progress...</>
  ) : (
    <div className="w-full flex flex-wrap border-4">
      {posts.map((post, i) => (
        <div key={i} className="w-1/3 p-2 md:p-4 border">
          {/* <div key={post.id} className="border"> */}
          <Post post={post} setCurrentId={setCurrentId} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
