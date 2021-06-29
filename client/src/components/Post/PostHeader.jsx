import React from "react";

import HTML from "../../images/HTML.png";
import CSS from "../../images/CSS.png";
import Sass from "../../images/Sass.png";
import JavaScript from "../../images/JavaScript.png";
import ReactJs from "../../images/ReactJs.png";
import Node from "../../images/Node.png";
import Other from "../../images/Other.png";

const PostHeader = ({ onClick, theme, title }) => {
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
    <div className="relative -mt-8" onClick={onClick}>
      <img src={src} alt={title} className="w-full RoundShadow-lg" />
      <div className="h-full w-full FlexCenter absolute top-0">
        <div className="text-white text-center px-2">
          <h1>
            <i className={`fab fa-${fa} text-white mb-2`} />
          </h1>
          {title}
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
