import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getPosts } from "./actions/posts";

import "@material-tailwind/react/tailwind.css";
import NavBar from "./components/NavBar";
import Posts from "./components/Posts";
import Form from "./components/Form";
// import logo from "./images/logo.png"

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div className="App">
      <NavBar />
      <Posts setCurrentId={setCurrentId} />
      <Form currentId={currentId} setCurrentId={setCurrentId} />
    </div>
  );
};

export default App;
