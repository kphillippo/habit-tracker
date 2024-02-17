import './Css/App.css';
import React, { useState, useEffect } from "react";
import Home from "./Containers/Home.js"
import NavBar from "./Component/NavBar.js"
import Footer from "./Component/Footer.js"
import Signin from "./Containers/Signin/signin.js"
import Signup from "./Containers/Signup/signup.js"
import Profile from "./Containers/Profile/profile.js"
import Stats from "./Containers/Stats/Stats.js"
import Challenges from "./Containers/Challenges/Challenges.js"
import Help from "./Containers/Help/Help.js"
import Leaderboard from "./Containers/Leaderboard/Leaderboard.js"
import Journal from "./Containers/Journal/Journal.js"
import Dailies from "./Containers/Dailies/Dailies.js"
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import testData from "./mock/user.json"

function App() {

  const user_info = testData

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/dailies" element={<Dailies />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
