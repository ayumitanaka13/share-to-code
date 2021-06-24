import React from "react";
import Top1 from "../images/top-1.png";
import Top2 from "../images/top-2.png";
import Top3 from "../images/top-3.png";
import Container from "./UI/Container";

const Hero = () => {
  return (
    <Container
      className="mt-16"
      content={
        // <div className="">
        <>
          <img src={Top1} alt="top1" className="ImgSize hidden lg:block" />
          <div className="FlexAlign px-8 Border">
            <div className="text-center z-10 Border">
              <h1>Share to Code</h1>
              <h5 className="text-orange mt-4">
                Share your roadmap on how to learn coding!
              </h5>
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
