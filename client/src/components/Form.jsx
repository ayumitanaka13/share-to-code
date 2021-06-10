import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import { createPost, updatePost } from "../actions/posts";

import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    theme: "",
    materials: [],
    // materials: {
    //   first: "",
    //   second: "",
    //   third: "",
    // },
    // tags: [],
    // selectedFile: "",
  });

  const [addVideo, setAddVideo] = useState(false);

  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (!post?.title) {
      handleClear();
    }
    if (post) setPostData(post);
  }, [post]);

  const handleClear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      theme: "",
      materials: [],
      // materials: {
      //   first: "",
      //   second: "",
      //   third: "",
      // },
      // tags: [],
      // selectedFile: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(
        createPost(
          {
            ...postData,
            username: user?.result?.username || user?.result?.givenName,
            userImg: user?.result?.imageUrl,
          },
          history
        )
      );
      handleClear();
      // history.push("/");
    } else {
      dispatch(
        updatePost(currentId, {
          ...postData,
          username: user?.result?.username || user?.result?.givenName,
          userImg: user?.result?.imageUrl,
        })
      );
    }
    handleClear();
  };

  if (!user?.result) {
    return <p>Please Sign in</p>;
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  const handleAddVideo = () => {
    setAddVideo(!addVideo);
  };

  console.log(postData.materials);

  return (
    <div className="mt-8">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader color="lightBlue" size="lg">
            <H5 color="white">{currentId ? "Editing" : "Creating"} Post</H5>
          </CardHeader>

          <CardBody>
            <div className="mt-4 mb-8 px-4">
              <InputIcon
                name="title"
                value={postData.title}
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
                type="text"
                color="lightBlue"
                placeholder="Title"
                iconName="title"
              />
            </div>
            <div className="mb-8 px-4">
              <InputIcon
                name="message"
                value={postData.message}
                onChange={(e) =>
                  setPostData({ ...postData, message: e.target.value })
                }
                type="text"
                color="lightBlue"
                placeholder="Message"
                iconName="message"
              />
            </div>
            <div className="mb-8 px-4">
              <InputIcon
                name="theme"
                value={postData.theme}
                onChange={(e) =>
                  setPostData({ ...postData, theme: e.target.value })
                }
                type="text"
                color="lightBlue"
                placeholder="Theme"
                iconName="more"
              />
            </div>
            <div className={`${addVideo ? "mb-8" : "mb-4"} px-4`}>
              <InputIcon
                name="matarials.first"
                value={postData.materials}
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    materials: e.target.value,
                    // matarials: { first: e.target.value },
                  })
                }
                type="text"
                color="lightBlue"
                placeholder="First Video"
                iconName="more"
              />
            </div>
            {addVideo && (
              <div className={`${addVideo ? "mb-8" : "mb-4"} px-4`}>
                <InputIcon
                  name="matarials.first"
                  value={postData.materials}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      materials: e.target.value,
                      // matarials: { first: e.target.value },
                    })
                  }
                  type="text"
                  color="lightBlue"
                  placeholder="Second Video"
                  iconName="more"
                />
              </div>
            )}
            {/* <Button onClick={handleAddVideo}>Add more?</Button> */}

            {/* <div className="mb-8 px-4">
              <InputIcon
                name="tags"
                value={postData.tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                // type="text"
                color="lightBlue"
                placeholder="Tags (coma separated)"
                iconName="more"
              />
            </div>
            <div className="mb-4 px-4">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, selectedFile: base64 })
                }
              />
            </div> */}
          </CardBody>
          <CardFooter>
            <div className="flex justify-center">
              <Button
                type="submit"
                color="lightBlue"
                buttonType="link"
                size="lg"
                ripple="dark"
              >
                Submit
              </Button>
              <Button
                type="button"
                onClick={handleClear}
                color="lightBlue"
                buttonType="link"
                size="lg"
                ripple="dark"
              >
                Clear
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Form;
