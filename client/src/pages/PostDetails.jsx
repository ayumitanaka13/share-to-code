import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { getPost } from "../actions/posts";

import thumbnail from "../images/thumbnail.png";
import Container from "../components/UI/Container";
import Card from "../components/Card/Card";
import Button from "../components/UI/Button";
import PostHeader from "../components/Post/PostHeader";
import PostBody from "../components/Post/PostBody";
import PostDetailsBody from "../components/PostDetails/PostDetailsBody";
import PostFooter from "../components/Post/PostFooter";
import PostDetailsFooter from "../components/PostDetails/PostDetailsFooter";
import PostDetailsSide from "../components/PostDetails/PostDetailsSide";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  //   useEffect(() => {
  //     if (post) {
  //       dispatch(
  //         getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
  //       );
  //     }
  //   }, [post]);

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

  //   if (isLoading) {
  //     return <>progress...</>;
  //   }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Container
      className="mt-16"
      content={
        <>
          <div className="w-full md:w-3/4 FlexJustify">
            <Card>
              <PostHeader
                src={thumbnail}
                title={<h2 className="text-2xl">{post.title}</h2>}
              />
              <PostDetailsBody
                message={post.message}
                youtube={post.materials.first}
              />
              {!!recommendedPosts.length && (
                <PostDetailsFooter
                  content={recommendedPosts.map(
                    ({ title, username, message, _id }) => (
                      <div
                        key={_id}
                        onClick={() => openPost(_id)}
                        className="h-24 sm:h-32 w-full relative my-2"
                      >
                        <img
                          src={thumbnail}
                          alt=""
                          className="h-full w-full object-cover RoundShadow-lg"
                        />
                        <div className="h-full w-full FlexCenter absolute top-0">
                          <div className="text-white text-center">
                            <h1>
                              <i className="fab fa-react text-white mb-2" />
                            </h1>
                            <h6>{title}</h6>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                />
              )}
            </Card>
          </div>

          <div className="h-36 sm:h-40 md:h-48 xl:h-40 w-full md:w-1/4 FlexJustify">
            <PostDetailsSide
              username={post.username}
              createdAt={moment(post.createdAt).fromNow()}
              theme={post.theme}
              likes={post.likes.length}
            />
          </div>
        </>
      }
    />
  );
};

export default PostDetails;
