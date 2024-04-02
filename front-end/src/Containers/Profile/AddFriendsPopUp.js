import "../../Css/userProfilePopups.css";

/**
 * 
 * @param {*} parametersForPopup - function to close popup
 * @returns popup to send a friend request
 */
function AddFriendsPopUp({ onClose }) {
  //Sends a friend request and closes popup automatically
  function sendFriendRequest(){
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
          Enter frined's email: <input type="text" className="friendInput"></input><br></br>
          <button className="request" onClick={sendFriendRequest}>Send request</button>
          </center>
          <button className="popup_close" onClick={onClose}>X</button>
        </div>
      </div>
    </div>
  );
}

export default AddFriendsPopUp;