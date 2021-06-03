import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getPosts } from "../actions/posts";
import Container from "./UI/Container";
import Posts from "../components/Posts";
import Form from "../components/Form";
// import logo from "./images/logo.png"

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container>
      <Posts setCurrentId={setCurrentId} />
      <Form currentId={currentId} setCurrentId={setCurrentId} />
    </Container>
  );
};

export default Home;
