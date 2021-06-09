import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { getPost, getPostsBySearch } from "../actions/posts";

import thumbnail from "../images/thumbnail.png";
import Container from "./UI/Container";

import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H6 from "@material-tailwind/react/Heading6";
import Paragraph from "@material-tailwind/react/Paragraph";
import Button from "@material-tailwind/react/Button";
import CardRow from "@material-tailwind/react/CardRow";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardStatus from "@material-tailwind/react/CardStatus";
import CardStatusFooter from "@material-tailwind/react/CardStatusFooter";
import Icon from "@material-tailwind/react/Icon";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  console.log(post);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

  //   if (isLoading) {
  //     return <>progress...</>;
  //   }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Container>
      <div className="w-full flex">
        <div className="w-full lg:w-3/4 p-2">
          <Card>
            <div className="relative border-4">
              <CardImage
                src={
                  thumbnail
                  // post.selectedFile ||
                  // "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                }
                alt={post.title}
              />
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
              <H6 color="gray">{post.title}</H6>
              <Paragraph color="gray">{post.message}</Paragraph>
              <p>{post.username}</p>
              <p>{moment(post.createdAt).fromNow()}</p>
            </CardBody>

            <CardFooter>
              <Button>{post.tags.map((tag) => `#${tag}`)}</Button>
            </CardFooter>

            {!!recommendedPosts.length && (
              <div>
                <p>You might also like</p>
                <div>
                  {recommendedPosts.map(
                    ({ title, name, message, likes, selectedFile, _id }) => (
                      <div key={_id} onClick={() => openPost(_id)}>
                        <H6 color="gray">{title}</H6>
                        <H6 color="gray">{name}</H6>
                        <img src={selectedFile} alt="" />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>
        <div className="w-full lg:w-1/4 p-2">
          <Card>
            <CardRow>
              {/* <CardHeader
                color="lightBlue"
                size="lg"
                iconOnly
                className="-mt-9 rounded-full"
              >
                <img src={thumbnail} alt="" />
              </CardHeader> */}
              <CardHeader color="lightBlue" size="lg" iconOnly className="CardHeader">
                <Icon name="groups" size="5xl" color="white" />
              </CardHeader>
              {/* <Button></Button> */}

              <CardStatus title="Users" amount="350,000" />
            </CardRow>

            <CardStatusFooter color="green" amount="97%" date="Since one week">
              <Icon color="green" name="arrow_upward" />
            </CardStatusFooter>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default PostDetails;
