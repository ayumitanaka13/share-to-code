import React, { useState } from "react";

import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavItem from "@material-tailwind/react/NavItem";
import NavLink from "@material-tailwind/react/NavLink";
import NavbarInput from "@material-tailwind/react/NavbarInput";
import Icon from "@material-tailwind/react/Icon";

const NavBar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
    <Navbar color="blueGray" navbar>
      <NavbarContainer>
        <NavbarWrapper>
          <NavbarBrand>
            <span>Share to CODE</span>
          </NavbarBrand>
          <NavbarToggler
            color="white"
            onClick={() => setOpenNavbar(!openNavbar)}
            ripple="light"
          />
        </NavbarWrapper>

        <NavbarCollapse open={openNavbar}>
          <Nav leftSide>
            <NavItem ripple="light">
              {/* <NavItem active="light" ripple="light"> */}
              <Icon name="language" size="xl" />
              <span>Discover</span>
            </NavItem>
            <NavLink href="#navbar" ripple="light">
              <Icon name="account_circle" size="xl" />
              <span>Log In</span>
            </NavLink>
            <NavItem ripple="light">
              <Icon name="settings" size="xl" />
              <span>Sign Up</span>
            </NavItem>
          </Nav>
          <NavbarInput type="text" placeholder="Search" />
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>
  );
};

export default NavBar;
