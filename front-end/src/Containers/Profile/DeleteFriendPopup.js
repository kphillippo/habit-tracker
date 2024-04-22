import "../../Css/userProfilePopups.css";
import { apiRequest } from "../../utils/reqTool";

/**
 * 
 * @param {*} parametersForPopup - function to close popup, friend to delete
 * @returns popup to send a friend request
 */
function DeleteFriendPopup({ onClose, friend, toast }) {
  //Sends api request to delete friend from user's frinend list and closes popup automatically
  function deleteFriend() {
    //sendAPI request to delete a friend from user's friends list
    const data = {"User": sessionStorage.getItem("userId"),"FriendsWith": friend.id};
    apiRequest("POST", "Friends/deleteFriend", data)
      .then(({ token, ...data }) => {
        console.log(data);
        toast.success("Friend was removed successfully!"); 
      })
      .catch(err => {
        console.log(err);
        toast.error(err.error);
      })
    //close popup automatically
    onClose();
  }
  return (
    <div className="bg_blur">
      <div style={{ height: '22%' }} className="mainFrame">
        <div className="innerFrame">
          <center><div className="Title">
            Unfriend {friend.username}
          </div>
            Are you sure you want to remove {friend.username} from your friends list?<br></br>
            <button className="answer" onClick={deleteFriend}>Yes, &nbsp;remove</button>
            <button className="answer" onClick={onClose}>No, &nbsp;cancel</button>
          </center>
          <button className="popup_close" onClick={onClose}>X</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteFriendPopup;