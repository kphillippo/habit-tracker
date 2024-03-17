import React, { useState, useEffect } from "react";
import { FaPencil } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import "../../Css/profile.css";
import { IoMdFlame } from "react-icons/io";
import { GoTrash } from "react-icons/go";
import { apiRequest } from "../../utils/reqTool";
import AddFriendsPopUp from './AddFriendsPopUp';
import UpdateUserPopUp from './UpdateUserPopUp';
import ViewFriendPopup from './ViewFriendPopup';

function Profile(props) {
    const userInfo = props.data;
    const [fullInfo, setFullInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddFriendsPopUp, setAddFriendsShowPopUp] = useState(false);
    const [showUpdateUserPopUp, setUpdateUserPopUp] = useState("");
    const [showViewFriendPopup, setViewFriendPopup] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await apiRequest("POST", "user/userProfileInfo?user_id=" + sessionStorage.getItem("userId"))
                const data = await response;
                setFullInfo(data);
            } catch (err) {
                console.error("Failed to fetch user info:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserInfo(); 
    }, []); 

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (!fullInfo) {
        return <div>Error loading user information.</div>; 
    }

    //Returns html for form with user information
    function generateUserProfile() {
        let penColor = "#B3B3B3";
        let pictureDefault = <><CgProfile size={200} id="profilePictureIcon"></CgProfile></>;
        return <>
            <center>
                <div className="profile">
                    <div className="profilePic" onClick={() => setUpdateUserPopUp("Pic")}>
                        {pictureDefault}
                        Edit profile <br></br> picture
                    </div>
                    <table className="profileInfo">
                        <tr>
                            <td>Name:</td>
                            <td>{userInfo.userName}</td>
                            <td><FaPencil size={25} color={penColor} id="pen" onClick={() => setUpdateUserPopUp("Name")}></FaPencil></td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{fullInfo.Email}</td>
                            <td><FaPencil size={25} color={penColor} id="pen" onClick={() => setUpdateUserPopUp("Email")}></FaPencil></td>
                        </tr>
                        <tr>
                            <td>Username:</td>
                            <td>user123</td>
                            <td><FaPencil size={25} color={penColor} id="pen" onClick={() => setUpdateUserPopUp("Username")}></FaPencil></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td>**********</td>
                            <td><FaPencil size={25} color={penColor} id="pen" onClick={() => setUpdateUserPopUp("Password")}></FaPencil></td>
                        </tr>
                    </table>
                </div>
            </center>
        </>;
    }

    //Deletes friend by sending API request
    

    //Returns html for Friends list
    function generateFriendsList() {
        let friendsList = [];
        let flameColor = "#e57028";
        for (let i = 0; i < fullInfo.userFriends.length; i++) {
            friendsList[i] = <><tr className="friend">
                <td style={{ width: '10%' }}>&nbsp;&nbsp;{fullInfo.userFriends[i].username}</td>
                <td style={{ float: 'right' }}><IoMdFlame color={flameColor} size={40}></IoMdFlame></td>
                <td style={{ width: '18%' }}>{fullInfo.userFriends[i].Streak}</td>
                <td id="viewProfile" onClick={() => setViewFriendPopup(fullInfo.userFriends[i]._id)}>View Profile</td>
                <td style={{ float: 'right' }}>Remove&nbsp;&nbsp;</td>
                <td><GoTrash size={25}></GoTrash></td>
            </tr></>
        }
        return <>
            <center>
                <div className="friendsForm">
                    <div className="myFriendsTitle">My Friends</div>
                    <button className="addFriendsButton" onClick={() => setAddFriendsShowPopUp(true)}>Add Friends +</button>
                    <table className="friendsList">
                        {friendsList}
                    </table>
                </div>
            </center>
        </>;
    }

    return (
        <div className="main-container">

            {userInfo.userToken && generateUserProfile()}
            {userInfo.userToken && generateFriendsList()}

            <div>
                {showViewFriendPopup!="" && <ViewFriendPopup onClose={() => setViewFriendPopup("") } friend={showViewFriendPopup} />}
                {showAddFriendsPopUp && <AddFriendsPopUp onClose={() => setAddFriendsShowPopUp(false)} />}
                {showUpdateUserPopUp!="" && <UpdateUserPopUp onClose={() => setUpdateUserPopUp("") } fieldToUpdate={showUpdateUserPopUp} />}
            </div>
        </div>
    );
}
export default Profile;