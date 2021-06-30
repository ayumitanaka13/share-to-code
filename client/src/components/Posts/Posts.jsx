import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";

import Container from "../UI/Container";
import Loading from "../UI/Loading";
import Post from "../Post/Post";
import Button from "../UI/Button";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const [more, setMore] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const ShowMore = () => {
    return posts?.slice(6, 12).map((post, i) => (
      <div
        key={i}
        className="w-full FlexJustify md:w-1/2 xl:w-1/3 my-1 sm:my-0 py-4"
      >
        <Post post={post} setCurrentId={setCurrentId} />
      </div>
    ));
  };

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
            {posts?.slice(0, 6).map((post, i) => (
              <div
                key={i}
                className="w-full FlexJustify md:w-1/2 xl:w-1/3 my-1 sm:my-0 py-4"
              >
                <Post post={post} setCurrentId={setCurrentId} />
              </div>
            ))}
            {more && <ShowMore />}
            {posts.length > 6 && (
              <div className="w-full FlexJustify mt-4">
                <Button
                  type="button"
                  button={`Show ${more ? "Less" : "More"}`}
                  onClick={() => setMore(!more)}
                />
              </div>
            )}
          </div>
        )
      }
    />
  );
};

export default Posts;
