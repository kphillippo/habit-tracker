import React from "react";
import { FaPencil } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import "../../Css/profile.css";
import { IoMdFlame } from "react-icons/io";
import { GoTrash } from "react-icons/go";

function Profile(props) {
    const userInfo = props.data;
    console.log(userInfo);

    //Returns html for form with user information
    function generateUserProfile() {
        let penColor = "#B3B3B3";
        let email = "user123@email.com";
        let pictureDefault = <><CgProfile size={200} id="profilePictureIcon"></CgProfile></>;
        return <>
            <center>
                <div className="profile">
                    <div className="profilePic">
                        {pictureDefault}
                        Edit profile <br></br> picture
                    </div>
                    <table className="profileInfo">
                        <tr>
                            <td>Name:</td>
                            <td>{userInfo.userName}</td>
                            <td><FaPencil size={25} color={penColor} id="pen"></FaPencil></td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{email}</td>
                            <td><FaPencil size={25} color={penColor} id="pen"></FaPencil></td>
                        </tr>
                        <tr>
                            <td>Username:</td>
                            <td>user123</td>
                            <td><FaPencil size={25} color={penColor} id="pen"></FaPencil></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td>**********</td>
                            <td><FaPencil size={25} color={penColor} id="pen"></FaPencil></td>
                        </tr>
                    </table>
                </div>
            </center>
        </>;
    }

    //Returns html for Friends list
    function generateFriendsList() {
        let friendsList = [];
        let flameColor = "#4e5445";
        friendsList[0] = <><tr className="friend">
            <td>Username</td>
            <td><IoMdFlame color={flameColor} size={40}></IoMdFlame></td>
            <td>10</td>
            <td>View Profile</td>
            <td>Remove</td>
            <td><GoTrash size={25}></GoTrash></td>
        </tr></>
        flameColor = "#e57028";
        friendsList[1] = <><tr className="friend">
            <td>iamaFriend</td>
            <td><IoMdFlame color={flameColor} size={40}></IoMdFlame></td>
            <td>8</td>
            <td>View Profile</td>
            <td>Remove</td>
            <td><GoTrash size={25}></GoTrash></td>
        </tr></>
        friendsList[2] = <><tr className="friend">
            <td>nellyFurtado</td>
            <td><IoMdFlame color={flameColor} size={40}></IoMdFlame></td>
            <td>6</td>
            <td>View Profile</td>
            <td>Remove</td>
            <td><GoTrash size={25}></GoTrash></td>
        </tr></>
        return <>
            <center>
                <div className="friendsForm">
                    <div className="myFriendsTitle">My Friends</div>
                    <div className="addFriendsButton">Add Friends +</div>
                    <table className="friendsList">
                        {friendsList}
                    </table>
                </div>
            </center>
        </>;
    }

    return (
        <div className="main-container">
            {generateUserProfile()}
            {generateFriendsList()}
        </div>
    );
}
export default Profile;