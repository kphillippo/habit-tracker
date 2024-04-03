
import React, { useEffect, useState } from "react";
import { apiRequest } from "../../utils/reqTool";
import { useNavigate } from "react-router-dom";
import "../../Css/Leaderboard.css";
import { GiTrophy } from "react-icons/gi";
import { IoMdFlame } from "react-icons/io";
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill } from "react-icons/bs";

import {LuPencil} from "react-icons/lu";


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

            let info = {
                "User": sessionStorage.getItem("userId")
            }
            
            const response = await apiRequest("POST", "friends/returnLeaderBoard", info)
            const data = await response;
            setleaderBoardInfo(data);
        } catch (err) {
            console.error("Failed to fetch user info:", err);
        } finally {
            setIsLoading(false);
        }
        
    };

    function isSignIn(){
        if(!sessionStorage.getItem("userToken")){
            //navigate("/signin")
            return false
        }
        return true;
        
    }

    useEffect(() => {
        if(isSignIn()) {
            getFriends()
        }
        else{
            navigate("/signin")
        }
        
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!leaderBoardInfo) {
        return <div>Error loading user information.</div>;
    }

    function generateLeaderBoard() {
        let friendsList = [];
        let dd1 = <Bs1CircleFill id="placement" color={"gold"}/>
        let dd2 = <Bs2CircleFill id="placement" color={"silver"}/>
        let dd3 = <Bs3CircleFill id="placement" color={"brown"}/>
        
        for (let i = 0; i < leaderBoardInfo.length; i++) {
            if(leaderBoardInfo[i].Username == null) {leaderBoardInfo[i].Username = userInfo.userName}
            if(i >= 0 && i <= 2){
                let placement;
                
                switch (i){
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
                friendsList[i] = (
                    <tr key={i}>
                        <td width="20%"> {placement}</td>
                        <td width="60%"> {leaderBoardInfo[i].Username}</td>
                        <td width="20%"> <IoMdFlame color="orange"></IoMdFlame> {leaderBoardInfo[i].Streak}</td>
                    </tr>
                );
            }
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