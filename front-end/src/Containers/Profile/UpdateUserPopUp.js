import { CiCircleCheck } from "react-icons/ci";
import { TiUpload } from "react-icons/ti";
import "../../Css/userProfilePopups.css";
import { apiRequest } from "../../utils/reqTool";
import PasswordChecklist from "react-password-checklist";
import React, { useState } from "react";
import { Icon } from 'react-icons-kit';
import { eyeOff, eye } from 'react-icons-kit/feather';
import { sendMail } from '../Signup/sendEmail';
import Verify from "../Signup/verify";

/**
 * 
 * @param {*} parametersForPopup - function to close popup, which user information to update
 * @returns popup to update user information 
 */
function UpdateUserPopUp({ onClose, fieldToUpdate, toast, refreshFunction }) {
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState('password');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [showVerify, setVerify] = useState(false);

  //Function to update user information
  //Fields: First name, Last name, Email, username
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
      .then(({ token, ...data }) => {
        console.log(data);
        toast.success(fieldToUpdate + " was updated!");
        sessionStorage.setItem(infoType, newInfo);
        refreshFunction();
        //Close the popup
        onClose();
      })
      .catch(err => {
        console.log(err);
        toast.error(err.error);
      })
  }

  //Verify email before updating
  const handleMail = (event) => {
    event.preventDefault();
    const inf = getCode();
    setVerify(true);
    let info = {
      "to": document.getElementById("newValue").value,
      "subject": "Verification Code",
      "text": "Welcome to HabitConnect, here is your verification code: " + inf
    }
    console.log(info);
    apiRequest("POST", "verification/sendEmail", info)
      .then(({ token, ...user }) => {
        toast.success(`Email has been sent!`)
      })
      .catch(err => {
        toast.error(err.error);
      })
    console.log('Email has been sent to', document.getElementById("newValue").value);
  }

  //Code for email verification
  function getCode() {
    var i;
    let str = "";
    var codel = [];
    for (i = 0; i < 5; i++) {
      codel[i] = Math.floor(Math.random() * 10);
      str += codel[i].toString();
    }
    setCode(codel);
    return str;
  }

  //Seperate function to update password requires to enter old password 
  function updatePassword() {
    //set values 
    const data = {
      _id: sessionStorage.getItem("userId"),
      Password: document.getElementById("oldValue").value,
      newPassword: document.getElementById("newValue").value
    };
    //send update API
    apiRequest("POST", "user/updatePassword", data)
      .then(({ token, ...data }) => {
        console.log(data);
        toast.success(fieldToUpdate + " was updated!");
        refreshFunction();
        //Close the popup
        onClose();
      })
      .catch(err => {
        console.log(err);
        toast.error(err.error);
      })

  }
  const handleToggle = (event) => {
    event.preventDefault();
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  };
  //Seperate function for updating profile picture that requires file selection
  const updatePic = (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('userId', sessionStorage.getItem("userId"));
    formData.append('image', file);

    apiRequest("POST", "images/upload", formData)
      .then(({ token, ...data }) => {
        console.log(data.message);
        toast.success(fieldToUpdate + " was updated!"); 
        sessionStorage.setItem("userPic", "http://localhost:8081/api/images/"+data.image);
        refreshFunction(); 
        onClose(); 
      })
      .catch(err => {
        console.log(err);
        toast.error(err.error);
      });
  };
  const handleIconClick = () => {
    document.getElementById("fileUpload").click();
  };
  //Generates input area based on which field to update
  function generateUpdateInput() {
    if (fieldToUpdate === "Pic")
      return <>
        <TiUpload size={45} color="black" id="done" onClick={handleIconClick}>
        </TiUpload>
        <input
          id="fileUpload"
          type="file"
          style={{ display: 'none' }}
          onChange={updatePic}
        />
      </>
    if (fieldToUpdate === "Email")
      return <>
        New {fieldToUpdate}: <input id="newValue" type="text" className="updateInput"></input>
        <CiCircleCheck size={35} color="green" id="done" onClick={handleMail}></CiCircleCheck>
      </>
    if (fieldToUpdate === "Password")
      return <>
        Old {fieldToUpdate}: <input id="oldValue" type={type} className="updateInput" required></input><br></br>
        New {fieldToUpdate}: <input id="newValue" type={type} className="updateInput" value={password}
          onChange={e => setPassword(e.target.value)}
          onFocus={showChecklist}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-.]).{8,16}$"
          required></input><br></br>
        New {fieldToUpdate}: <input id="newValue" type={type} className="updateInput" value={passwordAgain}
          onChange={e => setPasswordAgain(e.target.value)}
          onFocus={showChecklist}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-.]).{8,16}$"
          required></input><br></br><br></br>
        <Icon class="absolute mr-10" icon={icon} size={25} onClick={handleToggle} />&nbsp;&nbsp;
        <button className="submit" onClick={updatePassword} >Submit</button><br></br>
        <div className="CheckList" id="Checklist">
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "lowercase", "match"]}
            minLength={8}
            value={password}
            valueAgain={passwordAgain}
          />
        </div>
      </>
    return <>
      New {fieldToUpdate}: <input id="newValue" type="text" className="updateInput"></input>
      <CiCircleCheck size={35} color="green" id="done" onClick={updateFiled}></CiCircleCheck>
    </>
  }
  //function to show the checklist
  function showChecklist() {
    document.getElementById("mainFrame").style.height = "55%"
    document.getElementById("Checklist").style.display = "block";
  }

  //Update the size of the popup based on the info being updated
  let popupH = "19%"
  if (fieldToUpdate === "Password") popupH = "35%"
  let popupW = "38%"
  if (fieldToUpdate === "Password") popupW = "40%"
  return (
    <div className="bg_blur">
      <div style={{ height: popupH, width: popupW }} className="mainFrame" id="mainFrame">
        <div className="innerFrame">
          <center><div className="Title">
            Update {fieldToUpdate}
          </div>
            {generateUpdateInput()}
          </center>
          <button className="popup_close" onClick={onClose}>X</button>
        </div>
      </div>
      <Verify show={showVerify} close={() => setVerify(false)} sub={updateFiled} code={code} email={email} />
    </div>
  );
}

export default UpdateUserPopUp;