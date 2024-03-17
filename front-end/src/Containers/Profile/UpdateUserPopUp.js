import "../../Css/UpdateUserPopUp.css";
import { CiCircleCheck } from "react-icons/ci";
import { TiUpload } from "react-icons/ti";

function UpdateUserPopUp({ onClose, fieldToUpdate }) {
  function updateFiled() {
    //send update API
    onClose();
  }
  function generateUpdateInput() {
    if(fieldToUpdate=="Pic")
      return <>
      <TiUpload size={45} color="black" id="done" onClick={updateFiled}></TiUpload>
      </>
    return <>
      New {fieldToUpdate}: <input type="text" className="updateInput"></input>
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