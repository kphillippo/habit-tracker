import "../../Css/addFriendsPopup.css";

function AddFriendsPopUp({ onClose }) {
  return (
    <div className="bg_blurA">
      <div className="mainFrameA">
        <div className="innerFrameA">
          <center><div className="Title"> 
            Add Friends 
          </div>
          Enter frined's email: <input type="text" className="friendInput"></input><br></br>
          <button className="request">Send request</button>
          </center>
          <button className="popup_closeA" onClick={onClose}>X</button>
        </div>
      </div>
    </div>
  );
}

export default AddFriendsPopUp;