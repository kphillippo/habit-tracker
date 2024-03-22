import React from "react";
import "../../Css/userProfilePopups.css";

/**
 * 
 * @param {*} parametersForPopup - function to close popup, friend to view
 * @returns popup to see friend profile information
 */
function ViewFriendPopup({ onClose, friend }) {
  return (
    <div className="bg_blur">
      <div className="mainFrame">
        <div className="innerFrame">
          <center><div className="Title">
            View Friend Profile<br></br>
            {//display friend info
            friend.username}
          </div>
          </center>
          <button className="popup_close" onClick={onClose}>X</button>
        </div>
      </div>
    </div>
  );
}

export default ViewFriendPopup;