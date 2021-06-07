import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { getPosts, getPostsBySearch } from "../actions/posts";
import Container from "./UI/Container";
import Posts from "../components/Posts";
import Form from "../components/Form";
import Paginate from "./UI/Paginate";
// import logo from "./images/logo.png"

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const search = query.get("searchQuery");

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container>
      <Posts setCurrentId={setCurrentId} />
      <Paginate page={page}/>
      <Form currentId={currentId} setCurrentId={setCurrentId} />
    </Container>
  );
};

export default Home;
