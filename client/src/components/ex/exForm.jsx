import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import { createPost, updatePost } from "../../actions/posts";


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
    <div className="mt-8">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader color="lightBlue" size="lg">
            <h4>{currentId ? "Editing" : "Creating"} Post</h4>
          </CardHeader>
          <CardBody>
            <small className="px-4">* required</small>
            <div className="mt-4 mb-8 px-4">
              <Button />
              <InputIcon
                name="title"
                value={postData.title}
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
                type="text"
                placeholder="*Title"
                required
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
                placeholder="*Message"
                iconName="message"
                required
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
                placeholder="*Theme (Language or Framework)"
                iconName="code"
                required
              />
            </div>
            <div className={`${addSecond ? "mb-8" : "mb-4"} px-4`}>
              <InputIcon
                name="matarials.first"
                defaultValue={postData.materials.first}
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    materials: { ...postData.materials, first: e.target.value },
                  })
                }
                type="text"
                color="lightBlue"
                placeholder="First Video"
                iconName="ondemand_video"
              />
            </div>
            {addSecond && (
              <div className={`${addThird ? "mb-8" : "mb-4"} px-4`}>
                <InputIcon
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
                  color="lightBlue"
                  placeholder="Second Video"
                  iconName="ondemand_video"
                />
              </div>
            )}

            {addThird && (
              <div className="px-4 mb-4">
                <InputIcon
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
                  color="lightBlue"
                  placeholder="Third Video"
                  iconName="ondemand_video"
                />
              </div>
            )}

            {addSecond ? (
              addThird ? null : (
                <div className="px-4">
                  <Button onClick={handleAddThird}>Add More</Button>
                </div>
              )
            ) : (
              <div className="px-4">
                <Button onClick={handleAddSecond}>Add More</Button>
              </div>
            )}

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
