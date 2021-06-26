import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

import { AUTH } from "../constants/actionTypes";
import { signin, signup } from "../actions/auth";
import Container from "../components/UI/Container";

import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Card from "../components/Card/Card";
import Top3 from "../images/top-3.png";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  //   const [formData, setFormData] = useState(initialState)
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  // const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful.");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container
      // className="pt-32"
      className="mt-16"
      content={
        <div className="w-full FlexAlign flex-wrap sm:flex-nowrap">
          <Card>
            <form onSubmit={handleSubmit}>
              <h4>{isSignup ? "Sign Up" : "Sign In"}</h4>
              <div className="mt-2">
                <Input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="*Email Address"
                  required={true}
                />
                <Input
                  name="password"
                  onChange={handleChange}
                  // handleShowPassword={handleShowPassword}
                  type={showPassword ? "text" : "password"}
                  placeholder="*Password"
                  required={true}
                />
              </div>
              {isSignup && (
                <div className="mt-2">
                  <Input
                    name="confirmPassword"
                    onChange={handleChange}
                    type="password"
                    placeholder="*Confirm Password"
                    required={true}
                  />
                  <Input
                    name="username"
                    onChange={handleChange}
                    type="text"
                    placeholder="*Username"
                    required={true}
                  />
                </div>
              )}
              <div className="FlexJustify flex-wrap">
                <Button
                  type="submit"
                  button={isSignup ? "Sign Up" : "Sign In"}
                  className="mx-2  mt-4"
                />
                {!isSignup && (
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                    render={(renderProps) => (
                      <Button
                        type="submit"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        button="Sign In with Google"
                        className="mx-2  mt-4"
                      />
                    )}
                  />
                )}
                {/* </div> */}
                {/* <div className="FlexJustify mt-2"> */}
                <Button
                  type="button"
                  onClick={switchMode}
                  button={
                    isSignup
                      ? "Already have an account? Sign in"
                      : "Don't have an account? Sign Up"
                  }
                  className="bg-gray-100 mx-2  mt-4"
                />
              </div>
            </form>
          </Card>
          <img src={Top3} alt="" className="ImgSize Border" />
        </div>
      }
    />
  );
};

export default Auth;
