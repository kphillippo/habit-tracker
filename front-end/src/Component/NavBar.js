import React, { useState } from "react";
import {Nav, NavItem, NavLink} from "reactstrap"

import "../Css/navbar.css"
import { Link } from "react-router-dom";

function NavBar() {

  return (
    <Nav>
        <NavItem>
            <NavLink
                active
                href="/"
                as={Link}
            >
            Home
            </NavLink>
        </NavItem>

        <NavItem>
            <NavLink href="/signin" as={Link}>
            Sign in
            </NavLink>
        </NavItem>

        <NavItem>
            <NavLink
            as={Link}
            href="/signup"
            >
            Sign up
            </NavLink>
        </NavItem>

        <NavItem>
            <NavLink
            as={Link}
            href="/profile"
            >
            Profile
            </NavLink>
        </NavItem>
    </Nav>
  );
}

export default NavBar;
