import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import { LOGOUT } from "../constants/actionTypes";
import { getPostsBySearch } from "../actions/posts";

const Footer = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

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

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <div className="h-32 min-w-full FlexAlign justify-between  bg-gray-200 px-16">
      <ul className="FlexAlign border">
        <li className="text-base sm:text-lg xl:text-xl 2xl:text-2xl">
          <Link to="/">Share to Code Footer</Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
