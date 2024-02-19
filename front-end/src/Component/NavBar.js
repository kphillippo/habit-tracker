import React, { useState } from "react";
import {Nav, NavItem} from "reactstrap"
import { NavLink } from "react-router-dom";
import { IoMdFlame } from "react-icons/io";
import "../Css/navbar.css"
import { IoNotifications } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
function NavBar(props) {
    // test data, will be replaced by data from backend in the future
    // will be added to props in the future
    const login = (props.data.status === 'success');
    const notificaitons = 10;
    const streak = props.data.data.user.Streak;
  return (
    <div>
        <Nav className="navbar-top row-12">
            <NavItem className="row-6">
                <span className="title">HabbitConnect</span> 
                <span>your path to a better you!</span>
            </NavItem> 
            
            <div className="align-right">
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
                        activeclassname="active"
                        to="/signin"
                        >
                        Signin
                    </NavLink>
                    <span>/</span>
                    <NavLink
                    className= "sign-link"
                    activeclassname="active"
                    to="/signup"
                    >
                    Signup
                    </NavLink>
                    </div>

                }     
            </div>      
        </Nav>
        <Nav className="navbar-bot row-12">

            <NavItem>
                <NavLink
                    className = "nav-link"
                    activeclassname="active"
                    to="/home"
                >
                Home
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink 
                className = "nav-link"
                activeclassname="active"
                to="/dailies" 
                >
                Dailies
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                className = "nav-link"
                activeclassname="active"
                to="/journal"
                >
                Journal
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                className = "nav-link"
                to="/challenges"
                activeclassname="active"
                >
                Challenges
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                className = "nav-link"
                activeclassname="active"
                to="/leaderboard"
                >
                My Leaderboard
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                className = "nav-link"
                activeclassname="active"
                to="/stats"
                >
                My Stats
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                className = "nav-link"
                activeclassname="active"
                to="/help"
                >
                Help
                </NavLink>
            </NavItem>
            
            <NavItem className="align-right">
                <IoMdFlame size={30} color="#e57028"></IoMdFlame>
                <span>{streak}</span>
            </NavItem>
            
            <NavItem>
                <IoNotifications size={30} color="#4e5445"></IoNotifications>
                <span>{notificaitons}</span>
            </NavItem>


        </Nav>
    </div>
  );
}

export default NavBar;
