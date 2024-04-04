import React from "react";
import "../../Css/userProfilePopups.css";
import { CgProfile } from "react-icons/cg";
import { IoMdFlame } from "react-icons/io";

/**
 * 
 * @param {*} parametersForPopup - function to close popup, friend to view
 * @returns popup to see friend profile information
 */
function ViewFriendPopup({ onClose, friend }) {

  function generateFriendProfile() {
    let flameColor = "#b5b5b5"
    if (friend.Streak>0) flameColor = "#e57028";
    let pictureDefault = <><CgProfile size={110} id="friendPictureIcon"></CgProfile></>;
    return <><div style={{ display: 'inline-flex', marginBottom: '15px' }}>
      <div className="friendPic">
        {pictureDefault}
      </div>
      <table className="friendInfo">
        <tbody>
          <tr key={"FirstName & LastName"} >
            <td>&nbsp;&nbsp;{friend.FirstName}&nbsp;&nbsp;{friend.LastName}</td>
          </tr>
          <tr key={"Username"} >
            <td>&nbsp;&nbsp;{friend.Username}</td>
          </tr>
          <tr key={"Email"} >
            <td>&nbsp;&nbsp;{friend.Email}</td>
          </tr>
        </tbody>
      </table>
      </div>
      Streak:&nbsp;&nbsp;&nbsp;&nbsp; <IoMdFlame color={flameColor} size={40}></IoMdFlame> {friend.Streak}
    </>
  }

  return (
    <div className="bg_blur">
      <div style={{ height: '38%' }} className="mainFrame">
        <div className="innerFrame">
          <center><div className="Title">
            View Friend Profile<br></br>
            {generateFriendProfile()}
          </div>
          </center>
          <button className="popup_close" onClick={onClose}>X</button>
        </div>
      </div>
    </div>
  );
}

export default ViewFriendPopup;