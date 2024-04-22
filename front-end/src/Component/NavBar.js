import React, { useState } from "react";
import {Nav, NavItem} from "reactstrap"
import { NavLink } from "react-router-dom";
import { IoMdFlame } from "react-icons/io";
import "../Css/navbar.css"
import { IoNotifications } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/reqTool";
import NotificationPopup from './NotificationPopup'; 

function NavBar({isSignedout, data, toast}) {
    // test data, will be replaced by data from backend in the future
    // will be added to props in the future

    const [notiificationPopup, setNotiificationPopup] = useState(false);
    const [numNotifications, setNumNotifications] = useState(0);
    
    const userInfo = data;
    // const isLogin = true;
    const isLogin = userInfo.userToken?true:false;
    // console.log(data);
    let navigate = useNavigate();

    const fetchUserInfo = async () => {
        try {
            const response = await apiRequest("POST", "user/userProfileInfo?user_id=" + sessionStorage.getItem("userId"))
            const data = await response;
            sessionStorage.setItem("userPic", "http://localhost:8081/api/images/"+data.ProfilePic);
        } catch (err) {
            console.error("Failed to fetch user info:", err);
        } 
        try {
            const userdata = {
                User: sessionStorage.getItem("userId")
            }
            const response = await apiRequest("POST", "notifications/numOfNotifications", userdata)
            const data = await response;
            setNumNotifications(data)
        } catch (err) {
            console.error("Failed to get notification number:", err);
        }
    };
   if(sessionStorage.getItem("userToken")) fetchUserInfo();

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
            trigger={<span className="user-icon">
                {sessionStorage.getItem("userPic") ? <img src={sessionStorage.getItem("userPic")} style={{width: "30px", height: "30px"}} alt="profile picture"></img> : <FaRegUserCircle size={30} color="#292d32"/> }
                </span>}
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


      const NotificationIconWithPopup = ({ userInfo }) => (
        <NavItem>
             <span className="notification-icon" onClick={() => setNotiificationPopup(true)}><IoNotifications size={30} color="#4e5445"></IoNotifications></span>
            {notiificationPopup && <NotificationPopup onClose={() => setNotiificationPopup(false)} toast={toast}></NotificationPopup>}
            <span>{numNotifications}</span>
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

                <NavItem className="align-right">
                    <IoMdFlame size={30} color="#e57028"></IoMdFlame>
                    <span>{userInfo.userStreak}</span>
                </NavItem>
                
                <NavItem className="">
                <NotificationIconWithPopup userInfo={userInfo}></NotificationIconWithPopup>
                </NavItem>


            </Nav>
        </div>
    );
}

export default NavBar;