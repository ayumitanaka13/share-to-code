import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

import { AUTH } from "../constants/actionTypes";
import { signin, signup } from "../actions/auth";
import Container from "../components/UI/Container";

// import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
// import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Card from "../components/Card/Card";

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
      className="mt-16 py-16"
      content={
        <Card>
          <CardHeader color="lightBlue" size="lg">
            <H5 color="white">{isSignup ? "Sign Up" : "Sign In"}</H5>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardBody>
              <Input
                name="email"
                onChange={handleChange}
                type="email"
                placeholder="Email Address"
                required={true}
              />
              {/* <div className={isSignup ? "mb-8 px-4" : "mb-4 px-4"}> */}
              <Input
                name="password"
                onChange={handleChange}
                // handleShowPassword={handleShowPassword}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required={true}
              />
              {/* </div> */}

              {isSignup && (
                <>
                  <Input
                    name="confirmPassword"
                    onChange={handleChange}
                    type="password"
                    placeholder="Confirm Password"
                    required={true}
                  />
                  <Input
                    name="username"
                    onChange={handleChange}
                    type="text"
                    placeholder="Username"
                    required={true}
                  />
                </>
              )}
            </CardBody>
            <CardFooter>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  button={isSignup ? "Sign Up" : "Sign In"}
                />

                {!isSignup && (
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                    render={(renderProps) => (
                      <Button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        button="Sign In with Google"
                      />
                    )}
                  />
                )}
              </div>
            </CardFooter>
            <CardFooter>
              <div className="flex justify-center">
                <Button
                  onClick={switchMode}
                  button={
                    isSignup
                      ? "Already have an account? Sign in"
                      : "Don't have an account? Sign Up"
                  }
                />
              </div>
            </CardFooter>
          </form>
        </Card>
      }
    />
  );
};

export default Auth;
