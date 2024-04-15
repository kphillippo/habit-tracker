import "../../Css/userProfilePopups.css";
import { apiRequest } from "../../utils/reqTool";

/**
 * 
 * @param {*} parametersForPopup - function to close popup
 * @returns popup to send a friend request
 */
function AddFriendsPopUp({ onClose, toast }) {
  //Sends a friend request and closes popup automatically
  function sendFriendRequest(){
    const data = {
      User: sessionStorage.getItem("userId"),
      FriendsWith: document.getElementById("friend").value
  };
    apiRequest("POST", "friends/sendFriendRequest", data)
      .then(({ token, ...data }) => {
        console.log(data);
        toast.success("Friend request was sent successfully!");
      })
      .catch(err => {
        console.log(err);
        toast.error(err.error);
      })
    //send a friend request API
    onClose();
  }
  return (
    <div className="bg_blur">
      <div style={{ height: '22%' }} className="mainFrame">
        <div className="innerFrame">
          <center><div className="Title"> 
            Add Friends 
          </div>
          Enter friend's username: <input id="friend" type="text" className="friendInput"></input><br></br>
          <button className="request" onClick={sendFriendRequest}>Send request</button>
          </center>
          <button className="popup_close" onClick={onClose}>X</button>
        </div>
      </div>
    </div>
  );
}

export default AddFriendsPopUp;