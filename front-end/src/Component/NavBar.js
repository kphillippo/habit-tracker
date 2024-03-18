import React, { useEffect, useState } from "react";
import {Nav, NavItem} from "reactstrap"
import { NavLink } from "react-router-dom";
import { IoMdFlame } from "react-icons/io";
import "../Css/navbar.css"
import { IoNotifications } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";

function NavBar({isSignedout, data}) {
    // test data, will be replaced by data from backend in the future
    // will be added to props in the future
    
    const userInfo = data;
    // const isLogin = true;
    const isLogin = userInfo.userToken?true:false;
    // console.log(data);
    let navigate = useNavigate();


    //user icon popup
    const UserMenuPopupContent = ({ close }) => (
        <div className="user-icon-popup">
            <Nav>
            <NavItem><NavLink className='nav-link' activeclassname='active' to="/profile">Profile</NavLink></NavItem>
                <NavItem><NavLink className='nav-link' activeclassname='active' to="/setting">Settings</NavLink></NavItem>
                
                <NavItem><NavLink  className='nav-link' activeclassname='active'
                onClick={() => {
                    // Implement your log-out logic here
                        console.log('Logging out...');
                        sessionStorage.clear()
                        isSignedout()
                        window.location.reload();
                        navigate('/home');
                        close();
                        }}
                >Sign-out</NavLink></NavItem>
                
            </Nav>
          
        </div>
      );

    const UserIconWithPopup = ({ userInfo }) => (
        <NavItem>
          Welcome back {userInfo.userName}!
          <Popup 
            trigger={<span className="user-icon"><FaRegUserCircle size={30} color="#292d32"/></span>}
            position="bottom center"
            on="click"
            closeOnDocumentClick
            mouseLeaveDelay={300}
            arrow={false}
          >
            {close => <UserMenuPopupContent close={close} />}
          </Popup>
        </NavItem>
      );

      //notification popup

      const NotificationPopupContent = ({ close }) => (
        <div className="notification-popup">
            <Nav>
            <NavItem><NavLink className='nav-link' activeclassname='active' to="/profile">Profile</NavLink></NavItem>
                <NavItem><NavLink className='nav-link' activeclassname='active' to="/setting">Settings</NavLink></NavItem>
                
                <NavItem><NavLink  className='nav-link' activeclassname='active'
                onClick={() => {
                    // Implement your log-out logic here
                        console.log('Logging out...');
                        sessionStorage.clear()
                        navigate('/home');
                        close();
                        }}
                >Sign-out</NavLink></NavItem>
                
            </Nav>
          
        </div>
      );

      const NotificationIconWithPopup = ({ userInfo }) => (
        <NavItem>
            <Popup 
                trigger={<span className="notification-icon"><IoNotifications size={30} color="#4e5445"></IoNotifications></span>}
                position="bottom left"
                on="click"
                closeOnDocumentClick
                mouseLeaveDelay={300}
                arrow={false}
            >
                {close => <NotificationPopupContent close={close} />}
            </Popup>
            
            <span>0</span>
        </NavItem>
      );
    
  return (
        <div className={"_nav"}>
            <Nav className="navbar-top row-12">
                <NavItem className="row-6">
                    <span className="title">HabitConnect</span>
                    <span>Connect! Commit! Change!</span>
                </NavItem>

                <NavItem className="align-right">
                    {isLogin &&
                        <UserIconWithPopup userInfo={userInfo}></UserIconWithPopup>
                    }

                    {!isLogin &&
                        <div className="sign-link-div">
                            <NavLink
                                className= "sign-link"
                                activeclassname = "active"
                                to="/Signin"
                            >
                                Signin
                            </NavLink>
                            <span>/</span>
                            <NavLink
                                className= "sign-link"
                                activeclassname = "active"
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
                        activeclassname = "active"
                        to="/home"
                    >
                        Home
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className = "nav-link"
                        activeclassname = "active"
                        to="/dailies"
                    >
                        Dailies
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className = "nav-link"
                        activeclassname = "active"
                        to="/journal"
                    >
                        Journal
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className = "nav-link"
                        activeclassname = "active"
                        to="/challenges"
                    >
                        Challenges
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className = "nav-link"
                        to="/leaderboard"
                        activeclassname = "active"
                    >
                        My Leaderboard
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className = "nav-link"
                        to="/stats"
                        activeclassname = "active"
                    >
                        My Stats
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className = "nav-link"
                        to="/help"
                        activeclassname = "active"
                    >
                        Help
                    </NavLink>
                </NavItem>


                <NavItem className="align-right">
                    <IoMdFlame size={30} color="#e57028"></IoMdFlame>
                    <span>{userInfo.Streak && userInfo.Streak}{!userInfo.Streak && 0}</span>
                </NavItem>
                
                <NavItem className="">
                <NotificationIconWithPopup userInfo={userInfo}></NotificationIconWithPopup>
                </NavItem>


            </Nav>
        </div>
    );
}

export default NavBar;