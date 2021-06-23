import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import { LOGOUT } from "../constants/actionTypes";
import { getPostsBySearch } from "../actions/posts";

import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavItem from "@material-tailwind/react/NavItem";
// import NavLink from "@material-tailwind/react/NavLink";
import NavbarInput from "@material-tailwind/react/NavbarInput";
import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";

const NavBar = () => {
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

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <div className="h-16 min-w-full FlexAlign justify-between fixed top-0 bg-gray-300 bg-opacity-80 backdrop-filter backdrop-blur z-50 px-16">
      <ul className="FlexAlign border">
        <li className="text-base sm:text-lg xl:text-xl 2xl:text-2xl">
          <Link to="/">Share to Code</Link>
        </li>
      </ul>
      <ul className="FlexAlign border">
        {user?.result ? (
          <>
            <li className="FlexAlign mr-4">
              {user.result.imageUrl && (
                <img
                  src={user?.result.imageUrl}
                  alt={user?.result.name}
                  className="w-8 rounded-full border-2 border-yellow-600 mr-2"
                />
              )}
              Welcome, {user.result.username}
              {user.result.givenName}
              {/* {user.result.name ? user.result.givenName : user.result.username} */}
            </li>
            <li className="mr-4">
              <Link to="/auth">Post</Link>
            </li>
            <li onClick={logout}>Logout</li>
          </>
        ) : (
          <li>
            <Link to="/auth">Sign In</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
