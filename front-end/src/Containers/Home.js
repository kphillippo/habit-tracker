import React, {useState, useEffect} from 'react';
import "../Css/home.css"
import tempStatsImage from './tempStats.png';
import { IoMdFlame } from "react-icons/io";
import { BiTask } from "react-icons/bi";
import { GrAchievement } from "react-icons/gr";
import { GoGoal } from "react-icons/go";
import { apiRequest } from "./../utils/reqTool";
import { useNavigate } from "react-router-dom";


function Home(props) {
    const [todosNumber, setTodosNumber] = useState(0);
    const [streakN, setstreakN] = useState(0);
    const [quickInsight, setQuickInsight] = useState(0);
    const userStatus = props.data.userToken;
    let currentStreak = sessionStorage.getItem("userStreak");
    const streakActive = currentStreak>0 ? true: false;
    if (currentStreak == "undefined") {
        currentStreak = 0;
    }
    let navigate = useNavigate();//For links on windows to different pages

    if (sessionStorage.getItem("userId")) {
        apiRequest("GET", `todo/getTodos?user_id=${sessionStorage.getItem("userId")}`)
        .then(res => {
            setTodosNumber(res.length);
        })
        .catch(err => {
            console.log(err);
        })
        const userdata = {
            userId: sessionStorage.getItem("userId")
        }
        apiRequest("POST", "user/returnStreak", userdata)
        .then(res => {
            setstreakN(res.Streak);
        })
        .catch(err => {
            console.log(err);
        })
    }
    const getQuickInsights = async () => {    
        try {  
            const response = await apiRequest("GET", "stats/quickInsights?user_id=" + sessionStorage.getItem("userId"))  
            const data = await response;  
            console.log(data); 
            setQuickInsight(data);  
        } catch (err) {  
            console.error("Failed to fetch user info:", err);  
        } 
    };
    useEffect(() => {  
        getQuickInsights(); 
    },[]);
    //Generates a message to welcome user or guest 
    //Returns html with message
    function generateMessage() {
        let message = <></>;
        if (userStatus) {
            //Greet user
            message = <><div className="lg-font"> Welcome back, {props.data.userName}! </div> </>;
        } else {
            //Welcome guest
            message = <><div className="lg-font"> Welcome to HabitConnect! </div> </>;
        }
        return message;
    }
    //Generates random motivational quote 
    //Returns html with quote
    function generateQuote() {
        return sessionStorage.getItem("quote");
    }

    function generateGuestHome() {
        if (!userStatus) {
            return<>
            <div class = "guest">
                <div class = "home_guest_login">
                <div class = "home_title">Welcome to HabitConnect!</div>
                <div class = "point1"><ul></ul><li>Build lasting habits with our easy-to-use tracker</li></div>
                <div class = "point2"><ul></ul><li>Manage your to do list with ease. </li></div>
                <div class = "point3"><ul></ul><li>Rise in the leader boards, and compete against your friends in challenges!</li></div>
                <div class = "no_account">Don't have an account? <a href="http://localhost:3000/signup">Sign up today!</a></div>               
                </div>
                <div class = "home_dailies">
                    <div class = "dailies_home_title">Dailies</div>
                    <div class = "dailies_home_desc">Create and track your habits and to do list.</div>
                </div>
                <div class = "challenges_home">
                    <div class = "challenges_home_title">Challenges</div>
                    <div class = "challenges_home_desc">Challenge your friends to keep their streak alive.</div>
                </div>
                <div class = "leaderboard_home">
                    <div class = "leaderboard_home_title">My Leaderboard</div>
                    <div class = "leaderboard_home_desc">See how you rank along side your friends.</div>
                </div>
                <div class = "stats_home">
                    <div class = "stats_home_title">My Stats</div>
                    <div class = "stats_home_desc">Monitor your progress with a personalized statistics page.</div>
                </div>
            </div>
            </>;
        }
    }

    //Handles navigation to other pages
    function handleClick(location) {
        navigate(location);
    }

    //Generates streak window displaying current streak and indicating status
    //Returns html with window
    function generateStreakWindow() {
        if (userStatus) {
            let flameColor = "#c0c6b7";
            let message = <>You've been consistent for {streakN} days!<br></br>Extend your streak now!</>
            if (streakActive) {
                flameColor = "#e57028";
                message = <>Congrats! You extended your streak today!<br></br>Checkout what habits you completed?</>
            }
            return <>
                <div className='window' id="windowGeneral" onClick={() => handleClick('/dailies')}>
                    <center><div className="StreakNumber">
                        <IoMdFlame size={130} color={flameColor}></IoMdFlame>
                        {currentStreak}</div>
                    </center>
                    <center>{message}</center>
                </div>
            </>;
        }
    }

    //Generates stats window displaying recent habit trends
    //Returns html with window
    function generateStatsWindow() {
        if (userStatus) {
            return <>
                <div className='windowStats' id="windowGeneral" onClick={() => handleClick('/stats')}>
                <div><center>
                    <div style={{fontSize: 'larger'}}>My Quick Insights:</div>
                    <div>
                        <div><ul></ul><li>Longest streak: {quickInsight.LongestStreak}</li></div>
                        <div><ul></ul><li>Current streak: {quickInsight.CurrentStreak}</li></div>
                        <div><ul></ul><li>Total Habits Completed: {quickInsight.TotalHabitCompletions}</li></div>
                    </div></center>
                </div>
                </div>
            </>;
        }
    }

    //Generates tasks window displaying # tasks planned for today
    //Returns html with window
    function generateTasksWindow() {
        if (userStatus) {
            return <>
                <div className='window' id="windowGeneral" onClick={() => handleClick('/dailies')}>
                    <center><div className="StreakNumber" >
                        <BiTask size={130} color="#0E80AC"></BiTask>
                        {todosNumber}
                    </div></center>
                    <center>You have {todosNumber} tasks today!<br></br>
                        Finish them now?</center>
                </div>
            </>;
        }
    }

    //Generates leaderboard window 
    //Returns html with window
    function generateLeaderWindow() {
        if (userStatus) {
            return <>
                <div className='windowSecond' id="windowGeneral" onClick={() => handleClick('/leaderboard')}>
                    <center>
                        <GrAchievement size={130} color="#fcca03"></GrAchievement>
                    </center>
                    <center>Check out how your friends are doing on Leaderboard!</center>
                </div>
            </>;
        }
    }

    //Generates challenges window 
    //Returns html with window
    function generateChallengesWindow() {
        if (userStatus) {
            return <>
                <div className='windowSecond' id="windowGeneral" onClick={() => handleClick('/challenges')}>
                    <center>
                        <GoGoal size={130} color="#3ac7a8"></GoGoal>
                    </center>
                    <center>Feeling adventurous today? Try out new challenges!</center>
                </div>
            </>;
        }
    }

    return (
        <div className="main-container">
            {/* <div className="message">
            {generateMessage()}
            {generateQuote()}
            <div id="quote"></div>
            </div> */}
            <div>
                {generateGuestHome()}
            </div>
            <div className="windowGallery">
                <div className="windowLine">
                    {generateStreakWindow()}
                    {generateStatsWindow()}
                    {generateTasksWindow()}
                </div>

                <div className="windowLine">
                    {generateLeaderWindow()}
                    {generateChallengesWindow()}
                </div>
            </div>
        </div>
    );
}
export default Home;