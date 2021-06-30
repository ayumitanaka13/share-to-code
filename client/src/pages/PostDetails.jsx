import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { getPost } from "../actions/posts";

import Container from "../components/UI/Container";
import Card from "../components/Card/Card";
import PostHeader from "../components/Post/PostHeader";
import PostDetailsBody from "../components/PostDetails/PostDetailsBody";
import PostDetailsFooter from "../components/PostDetails/PostDetailsFooter";
import PostDetailsSide from "../components/PostDetails/PostDetailsSide";
import Loading from "../components/UI/Loading";
import RecommendedPost from "../components/PostDetails/RecommendedPost";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [posts]);

  if (!post) return null;
  const openPost = (_id) => history.push(`/posts/${_id}`);
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Container
      className="mt-16"
      content={
        isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="w-full md:w-3/4 FlexJustify">
              <Card>
                <PostHeader theme={post.theme} title={<h2>{post.title}</h2>} />
                <PostDetailsBody
                  message={post.message}
                  youtube={post.materials.first}
                  youtube2={post.materials.second}
                  youtube3={post.materials.third}
                />
                {!!recommendedPosts.length && (
                  <PostDetailsFooter
                    content={recommendedPosts.map(({ _id, title, theme }) => (
                      <RecommendedPost
                        key={_id}
                        onClick={() => openPost(_id)}
                        title={title}
                        theme={theme}
                      />
                    ))}
                  />
                )}
              </Card>
            </div>
            <div className="h-36 sm:h-40 md:h-48 xl:h-40 w-full md:w-1/4 FlexJustify">
              <PostDetailsSide
                id={post._id}
                username={post.username}
                createdAt={moment(post.createdAt).fromNow()}
                theme={post.theme}
                likesLength={post.likes.length}
              />
            </div>
          </>
        )
      }
    />
  );
};

export default PostDetails;
