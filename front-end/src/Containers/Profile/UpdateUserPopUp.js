import { CiCircleCheck } from "react-icons/ci";
import { TiUpload } from "react-icons/ti";
import "../../Css/userProfilePopups.css";
import {apiRequest} from "../../utils/reqTool";

/**
 * 
 * @param {*} parametersForPopup - function to close popup, which user information to update
 * @returns popup to update user information 
 */
function UpdateUserPopUp({ onClose, fieldToUpdate, toast, refreshFunction}) {
  function updateFiled() {
    //set values 
    const data = {
      _id: sessionStorage.getItem("userId"),
      FirstName: sessionStorage.getItem("userFirstName"),
      LastName: sessionStorage.getItem("userLastName"),
      Email: sessionStorage.getItem("userEmail"),
      Username: sessionStorage.getItem("userName")
    };
    let newInfo = document.getElementById("newValue").value;
    let infoType = "";
    switch (fieldToUpdate) {
      case "FirstName":
        data.FirstName = newInfo;
        infoType = "userFirstName";
        break;
      case "LastName":
        data.LastName = newInfo;
        infoType = "userLastName";
        break;
      case "Email":
        data.Email = newInfo;
        infoType = "userEmail";
        break;
      case "Username":
        data.Username = newInfo;
        infoType = "userName";
        break;
      default:
        break;
    }
    //send update API
    apiRequest("POST", "user/updateUserInfo", data)
        .then(({token, ...data}) => {
            console.log(data);
            toast.success(fieldToUpdate +" was updated!");
            sessionStorage.setItem(infoType, newInfo); 
            refreshFunction();
        })
        .catch(err => {
            console.log(err);
            toast.error(err.error);
        })
    //Close the popup
    onClose();
  }
  //Generates input area based on which field to update
  function generateUpdateInput() {
    if (fieldToUpdate === "Pic")
      return <>
        <TiUpload size={45} color="black" id="done" onClick={updateFiled}></TiUpload>
      </>
    return <>
      New {fieldToUpdate}: <input id="newValue" type="text" className="updateInput"></input>
      <CiCircleCheck size={35} color="green" id="done" onClick={updateFiled}></CiCircleCheck>
    </>
  }
  return (
    <div className="bg_blur">
      <div className="mainFrame">
        <div className="innerFrame">
          <center><div className="Title">
            Update {fieldToUpdate}
          </div>
            {generateUpdateInput()}
          </center>
          <button className="popup_close" onClick={onClose}>X</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserPopUp;