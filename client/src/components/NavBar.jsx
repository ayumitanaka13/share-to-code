import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import { LOGOUT } from "../constants/actionTypes";
// import { getPostsBySearch } from "../actions/posts";

import Button from "./UI/Button";

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  // const [search, setSearch] = useState("");
  // const [tags, setTags] = useState([]);

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    // if token is expired
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  // const searchPost = () => {
  //   if (search.trim() || tags) {
  //     dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
  //     history.push(
  //       `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
  //     );
  //   } else {
  //     history.push("/");
  //   }
  // };

  // const handleKeyPress = (e) => {
  //   if (e.keyCode === 13) {
  //     searchPost();
  //   }
  // };

  return (
    <div className="h-16 min-w-full FlexAlign justify-between fixed top-0 left-0 backdrop-filter backdrop-blur bg-gray-100 bg-opacity-80 shadow-sm z-50 px-8 lg:px-16">
      {/* {user?.result && (
        <div className="h-16 min-w-full FlexAlign lg:hidden absolute top-16 left-0 backdrop-filter backdrop-blur bg-gray-200 bg-opacity-80 px-8">
          <ul>
            <li className="flex items-center mr-4">
              {user.result.imageUrl && (
                <img
                  src={user?.result.imageUrl}
                  alt={user?.result.name}
                  className="w-8 rounded-full mr-2"
                />
              )}
              Welcome, {user.result.username}
              {user.result.givenName}
            </li>
          </ul>
        </div>
      )} */}
      <ul className="FlexAlign border">
        <li className="text-base sm:text-lg xl:text-xl 2xl:text-2xl Hover">
          <Link to="/">Share to Code</Link>
        </li>
      </ul>
      <ul className="FlexAlign">
        {user?.result ? (
          <>
            <li className="hidden lg:flex items-center mr-4">
              {user.result.imageUrl && (
                <img
                  src={user?.result.imageUrl}
                  alt={user?.result.name}
                  className="w-8 rounded-full mr-2"
                />
              )}
              Welcome, {user.result.username}
              {user.result.givenName}
              {/* {user.result.name ? user.result.givenName : user.result.username} */}
            </li>
            <Link to="/auth">
              <Button button="Post" className="mr-2 sm:mr-4" />
            </Link>
            <Button button="Log Out" onClick={logout} />
          </>
        ) : (
          <Link to="/auth">
            <Button button="Sign In" />
          </Link>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
