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
import DeleteFriendPopup from './DeleteFriendPopup';

/**
 * User Profile Page
 * Displays the user profile information and allows to edit it
 * There are 4 popups linked to this page
 */
function Profile(props) {
    const userInfo = props.data;
    const [fullInfo, setFullInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddFriendsPopUp, setAddFriendsShowPopUp] = useState(false);
    const [showUpdateUserPopUp, setUpdateUserPopUp] = useState("");
    const [showViewFriendPopup, setViewFriendPopup] = useState("");
    const [showDeleteFriendPopup, setDeleteFriendPopup] = useState("");
    const [friendlistChanged, setFriendlistChanged] = useState(false);
    const toast = props.toast;

    //Get full user information that is not available in the session storage for friends list
    const fetchUserInfo = async () => {
        try {
            const response = await apiRequest("POST", "user/userProfileInfo?user_id=" + sessionStorage.getItem("userId"))
            const data = await response;
            console.log(data)
            setFullInfo(data);
        } catch (err) {
            console.error("Failed to fetch user info:", err);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchUserInfo();
    }, [friendlistChanged]);

    //Temporary output before user info is available
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!fullInfo) {
        return <div>Error loading user information.</div>;
    }

    //Returns html for form with user information
    function generateUserProfile() {
        let penColor = "#A3A3A3";
        let pictureDefault = <><CgProfile size={200} id="profilePictureIcon"></CgProfile></>;
        return <>
            <center>
                <div className="profile">
                    <div className="profilePic" onClick={() => setUpdateUserPopUp("Pic")}>
                        {pictureDefault}
                        Edit profile <br></br> picture
                    </div>
                    <table className="profileInfo">
                        <tbody>
                            <tr onClick={() => setUpdateUserPopUp("FirstName")}>
                                <td>FirstName:</td>
                                <td>&nbsp;&nbsp;{sessionStorage.getItem("userFirstName")}</td>
                                <td><FaPencil size={25} color={penColor} id="pen"></FaPencil></td>
                            </tr>
                            <tr onClick={() => setUpdateUserPopUp("LastName")}>
                                <td>LastName:</td>
                                <td>&nbsp;&nbsp;{sessionStorage.getItem("userLastName")}</td>
                                <td><FaPencil size={25} color={penColor} id="pen"></FaPencil></td>
                            </tr>
                            <tr onClick={() => setUpdateUserPopUp("Email")}>
                                <td>Email:</td>
                                <td>&nbsp;&nbsp;{sessionStorage.getItem("userEmail")}</td>
                                <td><FaPencil size={25} color={penColor} id="pen"></FaPencil></td>
                            </tr>
                            <tr onClick={() => setUpdateUserPopUp("Username")}>
                                <td>Username:</td>
                                <td>&nbsp;&nbsp;{sessionStorage.getItem("userName")}</td>
                                <td><FaPencil size={25} color={penColor} id="pen"></FaPencil></td>
                            </tr>
                            <tr onClick={() => setUpdateUserPopUp("Password")}>
                                <td>Password:</td>
                                <td>&nbsp;&nbsp;**********</td>
                                <td><FaPencil size={25} color={penColor} id="pen"></FaPencil></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </center>
        </>;
    }

    //Returns html for Friends list
    function generateFriendsList() {
        let friendsList = [];
        let flameColor = "#e57028";
        for (let i = 0; i < fullInfo.userFriends.length; i++) {
            friendsList[i] = (
                <tr key={fullInfo.userFriends[i]._id} className="friend">
                    <td style={{ width: '10%' }}>&nbsp;&nbsp;{fullInfo.userFriends[i].Username}</td>
                    <td style={{ float: 'right' }}><IoMdFlame color={flameColor} size={40}></IoMdFlame></td>
                    <td style={{ width: '18%' }}>{fullInfo.userFriends[i].Streak}</td>
                    <td id="viewProfile" onClick={() => setViewFriendPopup(fullInfo.userFriends[i])}>View Profile</td>
                    <td className="deleteFriend" onClick={() => setDeleteFriendPopup(fullInfo.userFriends[i])} style={{ float: 'right' }}>Remove&nbsp;&nbsp;</td>
                    <td className="deleteFriend" onClick={() => setDeleteFriendPopup(fullInfo.userFriends[i])}><GoTrash size={25}></GoTrash></td>
                </tr>
            );
        }
        return <>
            <center>
                <div className="friendsForm">
                    <div className="myFriendsTitle">My Friends</div>
                    <button className="addFriendsButton" onClick={() => setAddFriendsShowPopUp(true)}>Add Friends +</button>
                    <table className="friendsList">
                        <tbody>
                            {friendsList}
                        </tbody>
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
                {showViewFriendPopup !== "" && <ViewFriendPopup onClose={() => setViewFriendPopup("")} friend={showViewFriendPopup} />}
                {showAddFriendsPopUp && <AddFriendsPopUp onClose={() => setAddFriendsShowPopUp(false)} />}
                {showUpdateUserPopUp !== "" && <UpdateUserPopUp onClose={() => setUpdateUserPopUp("")} fieldToUpdate={showUpdateUserPopUp} toast={toast} refreshFunction={() => props.userinfoUpdated()}/>}
                {showDeleteFriendPopup !== "" && <DeleteFriendPopup onClose={() => {setDeleteFriendPopup("");setFriendlistChanged(true);}} friend={showDeleteFriendPopup} toast={toast}/>}
            </div>
        </div>
    );
}
export default Profile;