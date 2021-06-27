import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { getPostsBySearch } from "../actions/posts";

import Input from "./UI/Input";
import Button from "./UI/Button";
import Container from "./UI/Container";
import Top1 from "../images/top-1.png";
import Top2 from "../images/top-2.png";

const Hero = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [search, setSearch] = useState("");

  const searchPost = () => {
    if (search.trim()) {
      dispatch(getPostsBySearch({ search }));
      history.push(`/posts/search?searchQuery=${search || "none"}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Container
      className="pt-24 lg:pt-32"
      content={
        <>
          <img src={Top1} alt="top1" className="ImgSize hidden xl:block" />
          <div className="FlexAlign px-0 md:px-2 xl:px-4 2xl:px-6 pb-4 md:pb-0">
            <div className="text-center">
              <h1>Share to Code</h1>
              <h5 className="text-xl 2xl:text-2xl text-orange mt-4">
                Share your roadmap on how to learn coding!
              </h5>
              <div
                // action="/posts/search"
                // method="GET"
                className="flex flex-wrap lg:flex-nowrap items-end"
              >
                <Input
                  // type="search"
                  type="text"
                  name="search"
                  value={search}
                  placeholder="Find Roadmaps"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="bg-gray-100"
                />
                <Button
                  button="Search"
                  onClick={searchPost}
                  className="h-10 w-full lg:w-auto mt-1 lg:mt-4"
                />
              </div>
            </div>
          </div>
          <img src={Top2} alt="top2" className="ImgSize" />
        </>
      }
    />
  );
};

export default Hero;
