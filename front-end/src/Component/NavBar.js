import React, { useState } from "react";
import {Nav, NavItem} from "reactstrap"
import { NavLink } from "react-router-dom";

import "../Css/navbar.css"
import { Link } from "react-router-dom";

function NavBar() {
    const login = false;
  return (
    <div>
        <Nav className="navbar-top row-12">
            <NavItem className="row-6">
                <span className="title">Lifetrack</span> 
                <span>your path to a better you!</span>
            </NavItem> 
            
            <NavItem className="top-right">
            {login === true && 
                    <span>Welcome User!</span>
                }

            {login === false && 
                    <div className="sign-link-div">
                    <NavLink
                        className= "sign-link"
                        activeClassName = "active"
                        active
                        to="/signin"
                        >
                        Signin
                    </NavLink>
                    <span>/</span>
                    <NavLink
                    className= "sign-link"
                    activeClassName = "active"
                    active
                    to="/signup"
                    >
                    Signup
                    </NavLink>
                    </div>

                }     
            </NavItem>      
        </Nav>
        <Nav className="navbar-bot row-12">

            <NavItem>
                <NavLink
                    className = "nav-link"
                    activeClassName = "active"
                    active
                    to="/home"
                >
                Home
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink 
                className = "nav-link"
                activeClassName = "active"
                to="/dailies" 
                >
                Dailies
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                className = "nav-link"
                to="/journal"
                >
                Journal
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                className = "nav-link"
                to="/challenges"
                >
                Challenges
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                className = "nav-link"
                to="/leaderboard"
                >
                My Leaderboard
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                className = "nav-link"
                to="/stats"
                >
                My Stats
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                className = "nav-link"
                to="/help"
                >
                Help
                </NavLink>
            </NavItem>


        </Nav>
    </div>
  );
}

export default NavBar;
