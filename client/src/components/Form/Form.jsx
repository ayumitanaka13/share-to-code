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
                  {currentId ? "Edit" : "Create"} Post
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
                    valueTheme={postData.theme}
                    onChange={(e) =>
                      setPostData({ ...postData, theme: e.target.value })
                    }
                    required={true}
                    className={
                      postData.theme ? "text-gray-500" : "text-gray-300"
                    }
                  />
                  <Input
                    name="materials.first"
                    value={postData.materials.first}
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
                      name="materials.second"
                      value={postData.materials.second}
                      onChange={(e) =>
                        setPostData({
                          ...postData,
                          materials: {
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
                      name="materials.third"
                      value={postData.materials.third}
                      onChange={(e) =>
                        setPostData({
                          ...postData,
                          materials: {
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
                        button={`${currentId ? "Edit" : "Add"} More Link`}
                        className="bg-gray-100 mt-4"
                      />
                    )
                  ) : (
                    <Button
                      type="button"
                      onClick={handleAddSecond}
                      button={`${currentId ? "Edit" : "Add"} More Link`}
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
              <div className="text-center py-4 px-4 2xl:px-8">
                <h1>Let's share your roadmaps to the world!</h1>
                <p className="mt-4">
                  Now, anyone can be a developer completely free of cost because
                  YouTube will be a great teacher! Don't you wanna share helpful
                  videos for absolute learners?
                </p>
                <Link to="/auth">
                  <Button button="Sign In Right Now" className="mt-4" />
                </Link>
                <p className="mt-2">
                  <small>*You can post and fav roadmaps after sign in.</small>
                </p>
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
