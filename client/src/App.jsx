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
    <div className="min-h-screen w-screen bg-gray-200">
      <NavBar />
      <div className="min-h-full w-full flex justify-center py-16 bg-gray-300">
        <div className="w-5/6 lg:w-2/3 border-8">
          <Posts setCurrentId={setCurrentId} />
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
    </div>
  );
};

export default App;
