import "../../Css/ViewFriendPopup.css";
import React, { useState, useEffect } from "react";
import { apiRequest } from "../../utils/reqTool";

function ViewFriendPopup({ onClose, friend }) {
  
  return (
    <div className="bg_blurV">
      <div className="mainFrameV">
        <div className="innerFrameV">
          <center><div className="Title">
            View Friend Profile<br></br>
           ID:  {friend}
          </div>
          </center>
          <button className="popup_closeA" onClick={onClose}>X</button>
        </div>
      </div>
    </div>
  );
}

export default ViewFriendPopup;