import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import FileBase from "react-file-base64";

import { createPost, updatePost } from "../../actions/posts";

import Container from "../UI/Container";
import Card from "../Card/Card";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea";
import Select from "../UI/Select";
import Button from "../UI/Button";
import Human3 from "../../images/human-3.png";

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

  const handleAddSecond = () => {
    setAddSecond(!addSecond);
  };

  const handleAddThird = () => {
    setAddThird(!addThird);
  };

  return (
    <Container
      content={
        <div className="w-full FlexCenter flex-col-reverse md:flex-row">
          <Card>
            {user?.result ? (
              <form onSubmit={handleSubmit} className="text-gray-500">
                <h4 className="text-indigo-800">
                  {currentId ? "Editing" : "Creating"} Post
                </h4>
                <div className="mt-2">
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
                  <Textarea
                    name="message"
                    value={postData.message}
                    onChange={(e) =>
                      setPostData({ ...postData, message: e.target.value })
                    }
                    type="text"
                    placeholder="*Message"
                    required={true}
                  />
                  <Select
                    name="theme"
                    onChange={(e) =>
                      setPostData({ ...postData, theme: e.target.value })
                    }
                    required={true}
                  />
                  {/* <Input
                    name="theme"
                    value={postData.theme}
                    onChange={(e) =>
                      setPostData({ ...postData, theme: e.target.value })
                    }
                    type="text"
                    placeholder="*Theme (Language or Framework)"
                    required={true}
                  /> */}
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
                    placeholder="First YouTube"
                  />
                  {addSecond && (
                    <Input
                      name="matarials.second"
                      defaultValue={postData.materials.second}
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
                      placeholder="Second YouTube"
                    />
                  )}
                  {addThird && (
                    <Input
                      name="matarials.third"
                      defaultValue={postData.materials.third}
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
                      placeholder="Third YouTube"
                    />
                  )}
                  {addSecond ? (
                    !addThird && (
                      <Button
                        type="button"
                        onClick={handleAddThird}
                        button="Add More Link"
                        className="bg-gray-100 mt-4"
                      />
                    )
                  ) : (
                    <Button
                      type="button"
                      onClick={handleAddSecond}
                      button="Add More Link"
                      className="bg-gray-100 mt-4"
                    />
                  )}
                </div>
                <div className="FlexJustify mt-6">
                  <Button type="submit" button="Submit" className="mr-4" />
                  <Button type="button" onClick={handleClear} button="Clear" />
                </div>
              </form>
            ) : (
              <div className="text-center m-2">
                <h1>Let's share your roadmaps to the world!</h1>
                <Link to="/auth">
                  <Button button="Sign In Right Now" className="mt-4 xl:mt-6" />
                </Link>
              </div>
            )}
          </Card>

          <img src={Human3} alt="" className="ImgSize mb-4 md:mb-0" />
        </div>
      }
    />
  );
};

export default Form;
