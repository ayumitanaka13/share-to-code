import React from "react";
import thumbnail from "../../images/thumbnail.png";

const PostHeader = ({ theme, src, alt, title }) => {
  // const { posts } = useSelector((state) => state.posts);
  // console.log("Header", posts);
  // console.log("Header", posts.theme);
  // console.log(theme);

  // switch (theme) {
  //   case 1:
  //     break;
  //   default:
  //     break;
  // }

  const themes = {
    1: "html",
    2: "css",
    3: "sass",
    4: "javascript",
    5: "react",
    6: "node",
    7: "python",
    8: "other",
  };

  return (
    <div className="relative -mt-8">
      <img src={src} alt={alt} className="RoundShadow-lg" />
      <div className="h-full w-full FlexCenter absolute top-0">
        <div className="text-white text-center px-2">
          <h1>
            <i className="fab fa-react text-white mb-2" />
          </h1>
          {title}
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
