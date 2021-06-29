import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";

import Container from "../UI/Container";
import Loading from "../UI/Loading";
import Post from "../Post/Post";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

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
                className="w-full FlexJustify md:w-1/2 xl:w-1/3 my-1 sm:my-0 py-4"
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
