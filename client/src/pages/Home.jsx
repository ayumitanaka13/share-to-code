import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { getPostsBySearch } from "../actions/posts";
import Container from "../components/UI/Container";
import Posts from "../components/Posts";
import Form from "../components/Form";
import Paginate from "../components/UI/Paginate";
import Hero from "../components/Hero";
// import logo from "./images/logo.png"

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const page = query.get("page") || 1;

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <>
      <Hero />
      <Posts setCurrentId={setCurrentId} />
      <Form currentId={currentId} setCurrentId={setCurrentId} />
      {/* {!searchQuery && !tags.length && <Paginate page={page} />} */}
    </>
  );
};

export default Home;
