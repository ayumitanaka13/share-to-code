import React, { useState } from "react";
// import { useLocation } from "react-router-dom";

import Hero from "../components/Hero/Hero";
import Posts from "../components/Posts/Posts";
import Form from "../components/Form/Form";

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

const Home = () => {
  const [currentId, setCurrentId] = useState(0);

  // const query = useQuery();
  // const searchQuery = query.get("searchQuery");
  // const page = query.get("page") || 1;
  // const [tags, setTags] = useState([]);

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
