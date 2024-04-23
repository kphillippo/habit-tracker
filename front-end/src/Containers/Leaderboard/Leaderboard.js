
import React, { useEffect, useState } from "react";
import { apiRequest } from "../../utils/reqTool";
import { useNavigate } from "react-router-dom";
import "../../Css/Leaderboard.css";
import { GiTrophy } from "react-icons/gi";
import { IoMdFlame } from "react-icons/io";
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill } from "react-icons/bs";


function Leaderboard(props){

    const userInfo = props.user;
    const [leaderBoardInfo, setleaderBoardInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    let navigate = useNavigate()
    let currentStreak = props.user.userStreak;
    if(currentStreak == "undefined"){
        currentStreak = 0;
    }

    const getFriends = async () => {
        try {

            let info = {                                    // Defines info to be sent into apiRequest
                "User": sessionStorage.getItem("userId")    
            }           
            const response = await apiRequest("POST", "friends/returnLeaderBoard", info)    // Sets response to await response of apiRequest
            const data = await response;                                                    //  sets constant data to await response
            setleaderBoardInfo(data);                                                       // set Leaderboard info to data
        } catch (err) {
            console.error("Failed to fetch user info:", err);
        } finally {
            setIsLoading(false);
        }       
    };

    function isSignIn(){        // Checks if the user is signed in
        if(!sessionStorage.getItem("userToken")){
            return false
        }
        return true;
        
    }

    useEffect(() => {
        if(isSignIn()) {        // If user is signed in, the getFriends
            getFriends()
        }
        else{                   // Otherwise go to signin page
            navigate("/signin")
        }
        
    });

    if (isLoading) {
        return <div>Loading...</div>;   // Shows loading screen if information is still loading
    }
    if (!leaderBoardInfo) {             // Shows Error message if there is an error loading user leaderboard information
        return <div>Error loading user information.</div>;
    }

    function generateLeaderBoard() {
        let friendsList = [];                                           // Initialize friends list information as an array
        let dd1 = <Bs1CircleFill id="placement" color={"gold"}/>        // Places placement icons in variables
        let dd2 = <Bs2CircleFill id="placement" color={"silver"}/>
        let dd3 = <Bs3CircleFill id="placement" color={"brown"}/>
        
        for (let i = 0; i < leaderBoardInfo.length; i++) {              // Loop through the leangth of the leaderboard information returned
            if(leaderBoardInfo[i].Username == null) {leaderBoardInfo[i].Username = userInfo.userName}   // Temporary patch. Just to initialize user's username
            if(i >= 0 && i <= 2){   // If position is top 3
                let placement;      // Define placement Icon 
                
                switch (i){         // Checks what position in leaderboard this person is. and initialize placement variable based on that
                    case 0:
                        placement = dd1
                    break;
                    case 1:
                        placement = dd2
                    break;
                    case 2:
                        placement = dd3
                    break;
                }
                // Add row with friend info into friends list array
                friendsList[i] = (
                    <tr key={i}>
                        <td width="20%"> {placement}</td>
                        <td width="60%"> {leaderBoardInfo[i].Username}</td>
                        <td width="20%"> <IoMdFlame color="orange"></IoMdFlame> {leaderBoardInfo[i].Streak}</td>
                    </tr>
                );
            }
            // If friend us not top 3, then add regular placement
            else{
                friendsList[i] = (
                    <tr key={i}>
                        <td width="20%"> {i+1}</td>
                        <td width="60%"> {leaderBoardInfo[i].Username}</td>
                        <td width="20%"> <IoMdFlame color="orange"></IoMdFlame> {leaderBoardInfo[i].Streak}</td>
                    </tr>
                );
            }
        }
        return <>
        <body>
            <div className="leaderboard-title">My Leaderboard</div>
            <div className= "leaderboard-page">
                <div className="innerBoard">
                    <GiTrophy className="GiTrophy"></GiTrophy>
                    <div className="tbl">
                        <table id="Table">
                            <tbody>
                                {friendsList}  
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </body>
        </>;
    }
  
    return (
        <body>
            {userInfo.userToken && generateLeaderBoard()}
        </body>        
    );
};
export default Leaderboard;