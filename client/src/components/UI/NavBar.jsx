import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import { LOGOUT } from "../../constants/actionTypes";

import Button from "./Button";
import Logo from "../../images/logo.png";

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/auth");
    setUser(null);
  };
  const token = user?.token;

  useEffect(() => {
    // if token is expired
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div className="h-16 min-w-full FlexAlign justify-between fixed top-0 left-0 backdrop-filter backdrop-blur bg-gray-100 bg-opacity-80 shadow-sm z-50 px-8 lg:px-16">
      <ul className="FlexAlign">
        <li className="text-base sm:text-lg xl:text-xl 2xl:text-2xl Hover">
          <Link to="/" className="FlexAlign">
            <img src={Logo} alt="logo" className="h-8 w-8 mr-2" />
            Share to Code
          </Link>
        </li>
      </ul>
      <ul className="FlexAlign">
        {user?.result ? (
          <>
            <li className="hidden sm:flex items-center mr-4">
              {user.result.imageUrl ? (
                <img
                  src={user?.result.imageUrl}
                  alt={user?.result.name}
                  className="h-8 w-8 rounded-full mr-2"
                />
              ) : (
                <div className="h-8 w-8 FlexCenter bg-orange bg-opacity-20 text-orange rounded-full mr-2">
                  <h6>{user.result.username.charAt(0)}</h6>
                </div>
              )}
              Welcome, {user.result.username}
              {user.result.givenName}
            </li>
            <li>
              <Button button="Log Out" onClick={logout} />
            </li>
          </>
        ) : (
          <li>
            <Link to="/auth">
              <Button button="Sign In" />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
