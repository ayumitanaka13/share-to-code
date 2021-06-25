import React from "react";
import Top1 from "../images/top-1.png";
import Top2 from "../images/top-2.png";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Container from "./UI/Container";

const Hero = () => {
  return (
    <Container
      className="pt-32"
      content={
        // <div className="">
        <>
          <img src={Top1} alt="top1" className="ImgSize hidden lg:block" />
          <div className="FlexAlign px-8 Border">
            <div className="text-center z-10 Border">
              <h1>Share to Code</h1>
              <h5 className="2xl:text-2xl text-orange mt-4">
                Share your roadmap on how to learn coding!
              </h5>
              <form action="" className="flex items-end">
                <Input
                  type="search"
                  placeholder="Find Roadmaps"
                  className="bg-gray-100"
                />
                <Button button="Search" className="h-12 mt-4" />
              </form>
            </div>
          </div>
          <img src={Top2} alt="top2" className="ImgSize" />
        </>
        // </div>
      }
    />
  );
};

export default Hero;
