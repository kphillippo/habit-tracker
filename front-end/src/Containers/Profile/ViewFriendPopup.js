import "../../Css/ViewFriendPopup.css";
import React, { useState, useEffect } from "react";
import { apiRequest } from "../../utils/reqTool";

function ViewFriendPopup({ onClose, friend }) {
  // const [fullInfoF, setFullInfoF] = useState(null);
  // const [isLoadingF, setIsLoadingF] = useState(true);

  // useEffect(() => {
  //   // Function to fetch user info
  //   const fetchFriendInfo = async () => {
  //     try {
  //       // Perform the API request
  //       const response = await apiRequest("POST", "user/userProfileInfo?user_id=" + sessionStorage.getItem("userId"))
  //       const data = await response; // Assuming the response is JSON

  //       // Update state with the fetched user info
  //       setFullInfoF(data);
  //     } catch (err) {
  //       console.error("Failed to fetch user info:", err);
  //       // Optionally handle error state here
  //     } finally {
  //       setIsLoadingF(false); // Set loading to false regardless of outcome
  //     }
  //   };

  //   fetchFriendInfo(); // Call the fetch function when the component mounts
  // }, []); // Empty dependency array means this effect runs once on mount

  // if (isLoadingF) {
  //   return <div>Loading...</div>; // Render loading state
  // }

  // if (!fullInfoF) {
  //   return <div>Error loading user information.</div>; // Render error state or alternative content
  // }

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