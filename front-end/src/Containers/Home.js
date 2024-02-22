import React from "react";
import "../Css/home.css"
import tempStatsImage from './tempStats.png';
import { IoMdFlame } from "react-icons/io";
import { BiTask } from "react-icons/bi";
import { GrAchievement } from "react-icons/gr";
import { GoGoal } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function Home(props) {
    console.log("Home page props:");
    console.log(props);
    const userStatus = props.data.userToken;
    const streakActive = true;
    let currentStreak = props.data.userStreak;
    if(currentStreak == "undefined"){
        currentStreak = 0;
    }
    let navigate = useNavigate();//For links on windows to different pages

    //Generates a message to welcome user or guest 
    //Returns html with message
    function generateMessage() {
        let message = <></>;
        if (userStatus) {
            //Greet user
            message = <><div className="lg-font"> Welcome back, User! </div> </>;
        } else {
            //Welcome guest
            message = <><div className="lg-font"> Welcome to HabbitConnect! </div> </>;
        }
        return message;
    }
    //Generates random motivational quote 
    //Returns html with quote
    function generateQoute() {
        let quoteList = [
            <><div>"The only way to do great work is to love what you do." - Steve Jobs</div></>,
            <><div>"The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt</div></>,
            <><div>"It does not matter how slowly you go as long as you do not stop." - Confucius</div></>,
            <><div>"What you get by achieving your goals is not as important as what you become by achieving your goals." - Zig Ziglar</div></>,
        ];
        return quoteList[Math.floor(Math.random() * quoteList.length)];
    }

    //Handles navigation to other pages
    function handleClick(location) {
        navigate(location);
    }

    //Generates streak window displaying current streak and indicating status
    //Returns html with window
    function generateStreakWindow() {
        if (userStatus) {
            let flameColor = "#4e5445";
            let message = <>You've been consistent for {currentStreak} days!<br></br>Extend your streak now!</>
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
                    <img src={tempStatsImage} width="100%" alt="stats_display" />
                </div>
            </>;
        }
    }

    //Generates tasks window displaying # tasks planned for today
    //Returns html with window
    function generateTasksWindow() {
        if (userStatus) {
            let tasks = 5;
            return <>
                <div className='window' id="windowGeneral" onClick={() => handleClick('/dailies')}>
                    <center><div className="StreakNumber" >
                        <BiTask size={130} color="#0E80AC"></BiTask>
                        {tasks}
                    </div></center>
                    <center>You have {tasks} tasks today!<br></br>
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
                    <center>Feelig adventurous today? Try out new challenges!</center>
                </div>
            </>;
        }
    }

    return (
        <div className="main-container">
            <div className="message">
            {generateMessage()}
            {generateQoute()}
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