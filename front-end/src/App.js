
import './Css/App.css';
import React, { useState, useEffect } from "react";
import Home from "./Containers/Home"
import Signin from "./Containers/Signin/signin"
import NavBar from "./Component/NavBar"
import Footer from "./Component/Footer.js"
import Signup from "./Containers/Signup/signup.js"
import Profile from "./Containers/Profile/profile.js"
import Stats from "./Containers/Stats/Stats.js"
import Challenges from "./Containers/Challenges/Challenges.js"
import Help from "./Containers/Help/Help.js"
import Leaderboard from "./Containers/Leaderboard/Leaderboard.js"
import Journal from "./Containers/Journal/Journal.js"
import Dailies from "./Containers/Dailies/Dailies.js"
import Request from './utils/reqTool.js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";


import testData from "./mock/user.json"

function App() {

  const [userInfo, setUserInfo] = useState(null);
  let apiTest
  console.log("app.js:")

  useEffect(() => {
    if(userInfo == null){
      getUserInfo()
    }
    console.log(userInfo)
  })

  function getUserInfo(){
    Request.getRequest("getUser")
    .then(data => {
      setUserInfo(data);
    })
    .catch(error => {
      console.error('Request failed:', error);
    });
  }
  


  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <NavBar data={testData}/>
        <Routes>
          <Route path="/home" element={<Home data={testData}/>} />
          <Route path="/dailies" element={<Dailies />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
