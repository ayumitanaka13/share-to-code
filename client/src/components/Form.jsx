import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import { createPost, updatePost } from "../actions/posts";

import Input from "./UI/Input";
import Button from "./UI/Button";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
// import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";
import Container from "./UI/Container";

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    theme: "",
    materials: {
      first: "",
      second: "",
      third: "",
    },
    // tags: [],
    // selectedFile: "",
  });

  const [addSecond, setAddSecond] = useState(false);
  const [addThird, setAddThird] = useState(false);

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
      materials: {
        first: "",
        second: "",
        third: "",
      },
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

  const handleAddSecond = () => {
    setAddSecond(!addSecond);
  };

  const handleAddThird = () => {
    setAddThird(!addThird);
  };

  return (
    <Container
      className="bg-white py-16"
      content={
        <Card>
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-100 text-center -mt-8 py-4 rounded shadow">
              <h4>{currentId ? "Editing" : "Creating"} Post</h4>
            </div>

            <div className="Border">
              <small>* required</small>
              <Input
                name="title"
                value={postData.title}
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
                type="text"
                placeholder="*Title"
                required={true}
              />

              <Input
                name="message"
                value={postData.message}
                onChange={(e) =>
                  setPostData({ ...postData, message: e.target.value })
                }
                type="text"
                placeholder="*Message"
                required={true}
              />
              <Input
                name="theme"
                value={postData.theme}
                onChange={(e) =>
                  setPostData({ ...postData, theme: e.target.value })
                }
                type="text"
                placeholder="*Theme (Language or Framework)"
                required={true}
              />
              {/* <div className={`${addSecond ? "mb-8" : "mb-4"} px-4`}> */}
              <Input
                name="matarials.first"
                defaultValue={postData.materials.first}
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    materials: {
                      ...postData.materials,
                      first: e.target.value,
                    },
                  })
                }
                type="text"
                placeholder="First Video"
              />
              {/* </div> */}
              {addSecond && (
                // <div className={`${addThird ? "mb-8" : "mb-4"} px-4`}>
                <Input
                  name="matarials.second"
                  value={postData.materials.second}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      matarials: {
                        ...postData.materials,
                        second: e.target.value,
                      },
                    })
                  }
                  type="text"
                  placeholder="Second Video"
                />
                // </div>
              )}

              {addThird && (
                // <div className="px-4 mb-4">
                <Input
                  name="matarials.third"
                  value={postData.materials.third}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      matarials: {
                        ...postData.materials,
                        third: e.target.value,
                      },
                    })
                  }
                  type="text"
                  placeholder="Third Video"
                />
                // </div>
              )}

              {addSecond ? (
                !addThird && (
                  <Button onClick={handleAddThird} button="Add More" />
                )
              ) : (
                <Button onClick={handleAddSecond} button="Add More" />
              )}
            </div>

            <div className="flex justify-center">
              <Button type="submit" button="Submit" />
              <Button type="button" onClick={handleClear} button="Clear" />
            </div>
          </form>
        </Card>
      }
    />
  );
};

export default Form;
