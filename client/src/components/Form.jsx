import React, { useState, useEffect } from "react";
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
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleClear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
    } else {
      dispatch(updatePost(currentId, postData));
    }
    handleClear();
  };

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
                name="creator"
                value={postData.creator}
                onChange={(e) =>
                  setPostData({ ...postData, creator: e.target.value })
                }
                type="text"
                color="lightBlue"
                placeholder="Creator"
                iconName="account_circle"
              />
            </div>
            <div className="mb-8 px-4">
              <InputIcon
                name="title"
                value={postData.title}
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
                type="text"
                color="lightBlue"
                placeholder="Title"
                iconName="email"
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
                iconName="email"
              />
            </div>
            <div className="mb-8 px-4">
              <InputIcon
                name="tags"
                value={postData.tags}
                onChange={(e) =>
                  setPostData({ ...postData, tags: e.target.value.split(",") })
                }
                type="text"
                color="lightBlue"
                placeholder="Tags (coma separated)"
                iconName="lock"
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
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex justify-center">
              <Button
                type="submit"
                // onClick={handleSubmit}
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
