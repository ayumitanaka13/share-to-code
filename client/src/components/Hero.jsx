import React from "react";
import Top1 from "../images/top-1.png";
import Top2 from "../images/top-2.png";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Container from "./UI/Container";

const Hero = () => {
  return (
    <Container
      className="pt-24 lg:pt-32"
      content={
        <>
          <img src={Top1} alt="top1" className="ImgSize hidden xl:block" />
          <div className="FlexAlign px-0 sm:px-2 md:px-4 2xl:px-6 pb-4 sm:pb-0 Border">
            <div className="text-center Border">
              <h1>Share to Code</h1>
              <h5 className="text-xl 2xl:text-2xl text-orange mt-4">
                Share your roadmap on how to learn coding!
              </h5>
              <form
                action=""
                className="flex flex-wrap lg:flex-nowrap items-end"
              >
                <Input
                  type="search"
                  placeholder="Find Roadmaps"
                  className="bg-gray-100"
                />
                <Button
                  button="Search"
                  className="h-12 w-full lg:w-auto mt-1 lg:mt-4"
                />
              </form>
            </div>
          </div>
          <img src={Top2} alt="top2" className="ImgSize" />
        </>
      }
    />
  );
};

export default Hero;
