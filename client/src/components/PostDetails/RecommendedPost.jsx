import React from "react";

import HTML from "../../images/HTML.png";
import CSS from "../../images/CSS.png";
import Sass from "../../images/Sass.png";
import JavaScript from "../../images/JavaScript.png";
import ReactJs from "../../images/ReactJs.png";
import Node from "../../images/Node.png";
import Other from "../../images/Other.png";

const RecommendedPost = ({ onClick, title, theme }) => {
  let src;
  let fa;

  switch (theme) {
    case "HTML":
      src = HTML;
      fa = "html5";
      break;
    case "CSS":
      src = CSS;
      fa = "css3-alt";
      break;
    case "Sass":
      src = Sass;
      fa = "sass";
      break;
    case "JavaScript":
      src = JavaScript;
      fa = "js";
      break;
    case "React":
      src = ReactJs;
      fa = "react";
      break;
    case "Node":
      src = Node;
      fa = "node";
      break;
    case "Other":
      src = Other;
      fa = "readme";
      break;
  }

  return (
    <div
      onClick={onClick}
      className="h-24 sm:h-32 w-full relative Hover cursor-pointer my-4"
    >
      <img
        src={src}
        alt={title}
        className="h-full w-full object-cover RoundShadow-lg"
      />
      <div className="h-full w-full FlexCenter absolute top-0">
        <div className="text-white text-center">
          <h1>
            <i className={`fab fa-${fa} text-white mb-2`} />
          </h1>
          <h6>{title}</h6>
        </div>
      </div>
    </div>
  );
};

export default RecommendedPost;
