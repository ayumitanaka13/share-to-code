import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { getPost } from "../actions/posts";

import thumbnail from "../images/thumbnail.png";
import Container from "../components/UI/Container";
import Card from "../components/Card/Card";
import Button from "../components/UI/Button";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  console.log(post);

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
      className="pt-32"
      content={
        <>
          <div className="w-full lg:w-3/4">
            <Card>
              <div className="relative border">
                <img src={thumbnail} alt={post.title} className="rounded-lg" />
                <div className="w-full h-full flex items-center justify-center absolute top-0 -mt-4 border">
                  <div className="text-center">
                    <h1>
                      <i className="fab fa-react mb-2" />
                    </h1>
                    <h3>{post.title}</h3>
                  </div>
                </div>
              </div>
              <div>
                <p>{post.message}</p>
                <iframe
                  width="100%"
                  height="315px"
                  src={`https://www.youtube.com/embed/${
                    post.materials.first.split("=")[1]
                  }`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              {!!recommendedPosts.length && (
                <div>
                  <p>You might also like</p>
                  <div>
                    {recommendedPosts.map(
                      ({ title, name, message, likes, selectedFile, _id }) => (
                        <div key={_id} onClick={() => openPost(_id)}>
                          <h6 color="gray">{title}</h6>
                          <h6 color="gray">{name}</h6>
                          <img src={selectedFile} alt="" />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </Card>
          </div>

          <div className="w-full lg:w-1/4">
            <Card>
              <div>
                <p>{post.username}</p>
                <p>{moment(post.createdAt).fromNow()}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <Button button={`#${post.theme}`}/>
                <Button button={`♡　${post.likes.length}`}/>
              </div>
            </Card>
          </div>
        </>
      }
    />
  );
};

export default PostDetails;
