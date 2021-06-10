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
    <Navbar color="blueGray" navbar className="bg-transparent">
      <NavbarContainer>
        <NavbarWrapper>
          <NavbarBrand>
            <Link to="/">
              <span>Share to CODE</span>
            </Link>
          </NavbarBrand>
          <NavbarToggler
            color="white"
            onClick={() => setOpenNavbar(!openNavbar)}
            ripple="light"
          />
        </NavbarWrapper>

        <NavbarCollapse open={openNavbar}>
          <Nav leftSide>
            {/* <NavItem ripple="light">
              <Icon name="language" size="xl" />
              <span>Discover</span>
            </NavItem> */}
            {user?.result ? (
              <>
                <NavItem ripple="light">
                  <Icon name="announcement" size="xl" />
                  <Link to="/auth">
                    <span>Post</span>
                  </Link>
                </NavItem>
                <NavItem ripple="light">
                  <Icon name="account_circle" size="xl" />
                  <span onClick={logout}>Logout</span>
                </NavItem>
                <NavItem ripple="light">
                  {user.result.imageUrl ? (
                    <img
                      src={user?.result.imageUrl}
                      alt={user?.result.name}
                      className="w-6 rounded-full border-2 border-gray-300 mr-2"
                    />
                  ) : null}                 
                  <span>
                    Welcome,{" "}
                    {user.result.name
                      ? user.result.givenName
                      : user.result.username}
                  </span>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem ripple="light">
                  <Icon name="settings" size="xl" />
                  <Link to="/auth">
                    <span>Sign In</span>
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>

          <NavbarInput
            type="text"
            placeholder="Search Posts"
            name="search"
            value={search}
            onKeyDown={handleKeyPress}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <NavbarInput
            type="text"
            placeholder="Search Posts by Tags"
            name="tags"
            value={tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
          <Button onClick={searchPost}>Search</Button>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>
  );
};

export default NavBar;
