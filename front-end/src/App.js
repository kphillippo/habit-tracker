
import './CSS/App.css';
import React, { useState, useEffect } from "react";
import Home from "./Container/Home/Home"
import LoginForm from "./Container/LoginForm/LoginForm"
import NavBar from "./Components/NavBar"
import Footer from "./Components/Footer.js"
import Signup from "./Container/Signup/signup.js"
import Profile from "./Container/Profile/profile.js"
import Stats from "./Container/Stats/Stats.js"
import Challenges from "./Container/Challenges/Challenges.js"
import Help from "./Container/Help/Help.js"
import Leaderboard from "./Container/Leaderboard/Leaderboard.js"
import Journal from "./Container/Journal/Journal.js"
import Dailies from "./Container/Dailies/Dailies.js"
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
            <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
