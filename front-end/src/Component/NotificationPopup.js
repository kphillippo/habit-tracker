import React from "react";
import "../Css/NotificationPopup.css";
import { apiRequest } from "../utils/reqTool";
import { useState } from "react";

/**
 * 
 * @param {*} parametersForPopup - function to close popup
 * @returns popup for notficatioins
 */
function NotificationPopup({ onClose }) {
  const [notifications, setNotifications] = useState(null);

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
  //generate list of notifications
  function showNotifications() {
    let notificationList = [];
    let allNotifications = notifications;
    for (let i = 0; i < Object.values(allNotifications).length; i++) {
      notificationList[i] = (
        <tr key={i} className="notification">
          <td>&nbsp;&nbsp;{Object.values(allNotifications)[i].Message}</td>
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