
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
import {apiRequest }from './utils/reqTool.js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";


import testData from "./mock/user.json"
import toast, { Toaster } from 'react-hot-toast';

function App() {
  //state
  const [isUpdated, setisUpdated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userStreak, setUserStreak] = useState(0);

  //a hook function, will update all states once the isUpdate state is updated
  useEffect(() => {
      if(sessionStorage.getItem("userToken")!="undefined"){
        setUserToken(sessionStorage.getItem("userToken"));
        setUserStreak(sessionStorage.getItem("userStreak"));
        setUserName(sessionStorage.getItem("userName"));
        setisUpdated(false);
      }

  }, [isUpdated])



  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Toaster></Toaster>
        <NavBar isSignedout={() => setisUpdated(true)} data={{userName, userToken, userStreak}}/>
        <Routes>
          <Route path="/home" element={<Home data={{userName, userToken, userStreak}} toast={toast}/>} />
          <Route path="/dailies" element={<Dailies user={{userName, userToken, userStreak}} toast={toast}/>} />
          <Route path="/journal" element={<Journal user={{userName, userToken, userStreak}} toast={toast}/>} />
          <Route path="/challenges" element={<Challenges user={{userName, userToken, userStreak}} toast={toast}/>} />
          <Route path="/leaderboard" element={<Leaderboard user={{userName, userToken, userStreak}} toast={toast}/>} />
          <Route path="/stats" element={<Stats user={{userName, userToken, userStreak}} toast={toast}/>} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile data={{userName, userToken}} toast={toast}/>} />
          <Route path="/signin" element={<Signin isSignedin={() => setisUpdated(true)} toast={toast}/>} />
          <Route path="/signup" element={<Signup isSignedin={() => setisUpdated(true)} toast={toast}/>} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
