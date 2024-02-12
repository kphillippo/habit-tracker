
import LoginForm from "./COmponents/Assets/LoginForm/LoginForm";
import Footer from "./COmponents/Container/Footer";
import NavBar from "./COmponents/Container/NavBar";
import Home from "./COmponents/Assets/Home/Home.js"
import Signup from "./COmponents/Assets/Signup/signup.js"
import Profile from "./COmponents/Assets/Profile/profile.js"
import Stats from "./COmponents/Assets/Stats/Stats.js"
import Challenges from "./COmponents/Assets/Challenges/Challenges.js"
import Help from "./COmponents/Assets/Help/Help.js"
import Leaderboard from "./COmponents/Assets/Leaderboard/Leaderboard.js"
import Journal from "./COmponents/Assets/Journal/Journal.js"
import Dailies from "./COmponents/Assets/Dailies/Dailies.js"
import Verify from "./COmponents/Assets/Verify/verify.js"


import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

function App() {
   return (
       <Router basename={process.env.PUBLIC_URL}>
           <div className="App">
               <NavBar/>
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
                   <Route path="/verify" element={<Verify />} />
               </Routes>
               <Footer/>
           </div>
       </Router>
   );
}


export default App;
