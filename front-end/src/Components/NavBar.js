import React, { useState } from "react";
import {Nav, NavItem} from "reactstrap"
import { NavLink } from "react-router-dom";
import { IoMdFlame } from "react-icons/io";
import "../CSS/navbar.css"
import { IoNotifications } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
function NavBar() {
    // test data, will be replaced by data from backend in the future
    // will be added to props in the future
    const login = false;
    return (
        <div className={"_nav"}>
            <Nav className="navbar-top row-12">
                <NavItem className="row-6">
                    <span className="title">HabitConnect</span>
                    <span>your path to a better you!</span>
                </NavItem>

                <NavItem className="align-right">
                    {login === true &&
                        <NavItem>
                            Welcome User!
                            <NavLink to="/profile">
                                <FaRegUserCircle size={30} color="#292d32"/>
                            </NavLink>
                        </NavItem>


                    }

                    {login === false &&
                        <div className="sign-link-div">
                            <NavLink
                                className= "sign-link"
                                activeClassName = "active"
                                active
                                to="/LoginForm"
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


                <NavItem className="align-right">
                    <IoMdFlame size={30} color="#e57028"></IoMdFlame>
                    <span>30</span>
                </NavItem>

                <NavItem>
                    <IoNotifications size={30} color="#4e5445"></IoNotifications>
                    <span>0</span>
                </NavItem>


            </Nav>
        </div>
    );
}

export default NavBar;