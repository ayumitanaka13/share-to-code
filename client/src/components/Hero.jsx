import React, { useEffect } from "react";
import Top1 from "../images/top-1.png";
import Top2 from "../images/top-2.png";
import Top3 from "../images/top-3.png";
import Container from "./UI/Container";

const Hero = () => {
  // useEffect(() => {
  //   const interval =
  // }, [input])

  return (
    <Container
      className="bg-white mt-16"
      content={
        <>
          <img src={Top1} alt="top1" className="h-96 w-96" />
          <div className="FlexAlign px-8 Border">
            <div className="text-center Border">
              <h1>Share to Code</h1>
              <h6 className="mt-4">
                Share your roadmap on how to learn coding!
              </h6>
            </div>
          </div>
          <img src={Top2} alt="top2" className="h-96 w-96" />
        </>
      }
    />
  );
};

export default Hero;
