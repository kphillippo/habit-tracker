import React from "react";
import "../Css/NotificationPopup.css";
import { apiRequest } from "../utils/reqTool";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 
 * @param {*} parametersForPopup - function to close popup
 * @returns popup for notficatioins
 */
function NotificationPopup({ onClose, toast }) {
  const [notifications, setNotifications] = useState(null);
  let navigate = useNavigate();//For links on windows to different pages

  if (sessionStorage.getItem("userId") && !notifications) {
    const data = { "User": sessionStorage.getItem("userId") };
    apiRequest("POST", "notifications/returnNotifications", data)
      .then(({ token, ...data }) => {
        console.log(data);
        setNotifications(data);
      })
      .catch(err => {
        console.log(err);
      })
  }
  //Sends API request to Accept/Decline friend request
  //response -> true/false for Accept/Decline
  //friend -> username of a user that send friend request
  function respondFriendrequest(response, friend, nId) {
    if (response) {//Accept
      const data = {
        User: sessionStorage.getItem("userId"),
        FriendsWithUsername: friend,
        notificationID: nId
      };
      console.log(data);
      apiRequest("POST", "friends/acceptFriendRequest", data)
        .then(({ token, ...data }) => {
          console.log(data);
          toast.success("Friend was added successfully!");
          onClose();
        })
        .catch(err => {
          toast.error(err.error);
        })
    }
    else {//Decline
      const data = {
        User: sessionStorage.getItem("userId"),
        FriendsWith: friend
      };
      apiRequest("POST", "friends/declineFriendRequest", data)
        .then(({ token, ...data }) => {
          console.log(data);
          toast.success("Friend request was declined.");
          onClose();
        })
        .catch(err => {
          toast.error(err.error);
        })
    }
  }

  //Handles navigation to other pages
  function handleClick(location) {
    navigate(location);
  }

  //deletes notification upon action
  function deleteNotification(nId) {
    const data = {
      notificationID: nId
    };
    apiRequest("POST", "notifications/deleteNotification", data)
      .then(({ token, ...data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err.error);
      })
  }

  //generate list of notifications
  function showNotifications() {
    let notificationList = [];
    let allNotifications = notifications;
    for (let i = 0; i < Object.values(allNotifications).length; i++) {
      notificationList[i] = (
        <tr key={i} className="notification">
          <td style={{ display: "inline-flex" }}>&nbsp;&nbsp;{Object.values(allNotifications)[i].Message}
            {/* Options to respond to notifications */}&nbsp;&nbsp;&nbsp;&nbsp;
            {Object.values(allNotifications)[i].Title.includes("Friend Request Sent") &&
              <div style={{ display: "inline-flex" }}><div className="notificationAction" onClick={() => respondFriendrequest(true, Object.values(allNotifications)[i].Message.split(' ')[0], Object.values(allNotifications)[i]._id)}>Accept</div>
                &nbsp;&nbsp;&nbsp;&nbsp; <div className="notificationAction" onClick={() => respondFriendrequest(false, Object.values(allNotifications)[i].Message.split(' ')[0])}>Decline</div></div>}
            {(Object.values(allNotifications)[i].Title.includes("You Have Habits To Do") || Object.values(allNotifications)[i].Title.includes("You Have To Dos To Do")) &&
              <div className="notificationAction" onClick={() => { handleClick('/dailies'); onClose();deleteNotification(Object.values(allNotifications)[i]._id) }}>Go to Dailies</div>
            }
            {(Object.values(allNotifications)[i].Title.includes("Friend Request Accepted")) &&
              <div className="notificationAction" onClick={() => { handleClick('/profile'); onClose(); deleteNotification(Object.values(allNotifications)[i]._id) }}>Go to Profile</div>
            }
          </td>
        </tr>
      );
    }
    return <>
      <center>
        <table className="NotificationList">
          <tbody>
            {notificationList}
          </tbody>
        </table>
      </center>
    </>;
  }
  return (
    <div className="bg_blurNotification">
      <div className="mainFrameNotification">
        <div className="innerFrameNotification">
          <center><div className="TitleNotification">
            Notifications
          </div><br></br>
            {notifications ? showNotifications() : "No notifications"}
          </center>
          <button className="popup_closeNotification" onClick={onClose}>X</button>
        </div>
      </div>
    </div>
  );
}

export default NotificationPopup;