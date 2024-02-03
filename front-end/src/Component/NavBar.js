import React, { useState } from "react";
import {Nav, NavItem, NavLink} from "reactstrap"

import "../Css/navbar.css"
import { Link } from "react-router-dom";

function NavBar() {

  return (
    <div>
        <Nav className="navbar-top row-12">
            <NavItem>
                Lifetrack your path to a better you!
            </NavItem>              
        </Nav>
        <Nav className="navbar-bot row-12">
            <NavItem>
                <NavLink
                    active
                    href="/home"
                    as={Link}
                >
                Home
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink href="/dailies" 
                as={Link}>
                Dailies
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                as={Link}
                href="/journal"
                >
                Journal
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                as={Link}
                href="/challenges"
                >
                Challenges
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                as={Link}
                href="/leaderboard"
                >
                My Leaderboard
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                as={Link}
                href="/stats"
                >
                My Stats
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                as={Link}
                href="/help"
                >
                Help
                </NavLink>
            </NavItem>


        </Nav>
    </div>
  );
}

export default NavBar;
