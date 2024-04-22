
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/challenges.css";
import ReactDOM from "react-dom/client";
import { IoMdFlame } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import {apiRequest} from "../../utils/reqTool"
import NewChallengePopup from './NewChallengePopup'
import ChallengeManager from "./ChallengeManager";
//import EditChallenges from "./EditChallenges";



function Challenges(props){

    const [updateTrigger, setUpdateTrigger] = useState(0);
    const[challengeManager,setChallengeManager] = useState(false);
    const[challenges, setChallenges] = useState(null);
    const [userToken, setUserToken] = useState(props.user.userToken);
    const [isLoading, setIsLoading] = useState(true);
    const toast = props.toast;


    let  navigate = useNavigate();

    let currentStreak = props.user.userStreak;
    if(currentStreak == "undefined"){
        currentStreak = 0;
    }

    const triggerDataRefresh = async() => {
        setUpdateTrigger(currentValue => currentValue + 1);
    };

    const getChallenges = async() => {
        try{
            const response = await apiRequest("POST", `groupHabit/returnGroupHabits`)
            const data = await response;
            setChallenges(data)
        }catch (err) {
            console.error("Failed to fetch Challenges info:", err);
        } finally {
            setIsLoading(false);
        }   
    };

    
    const JoinChallenge = (event, challengeID, members) =>{
        event.preventDefault();
        let info = {
            "GroupHabitID": challengeID,
            "UserID" : sessionStorage.getItem("userId")
        }
        var isJoined = 0;
        for(var inf in members){
            if(sessionStorage.getItem("userId") == inf){
                isJoined = 1;
                break;
            }
        }     
        if(isJoined == 0){
            apiRequest("POST", "groupHabit/joinGroupHabit", info)
                .then(
                    props.toast.success("You are now part of the challenge !")                  
                )
                .catch(err =>{
                    props.toast.error(err.error)
            })
            window.location.reload();
            navigate('/challenges')
        }else{
            props.toast("User already part of challenge")
        }
    };

    function isSignIn(){
        console.log("check signin")
        if(!sessionStorage.getItem("userToken")){
            navigate("/signin")
            return false;
        }
        return true;
    };

    useEffect(() => {
        if( isSignIn()){
         getChallenges();
        }else{
         navigate('/signin')
        }
     }, [updateTrigger, userToken])

    if (isLoading) {
        return <div className="centr">Loading...</div>;   // Shows loading screen if information is still loading
    }
    if (!setChallenges) {             // Shows Error message if there is an error loading user leaderboard information
        return <div className="centr">Error loading user information.</div>;
    }

    function generateChallenges(){
        
        let joined;
        let challengeList = [];
        for(let i=0; i<challenges.length; i++){
            for(let j = 0; j < challenges[i].Members.length; j++){
                if(sessionStorage.getItem("userId") == challenges[i].Members[j]){
                    joined = <span> <IoMdFlame color='#e57028'></IoMdFlame>  {challenges[i].Streak[j]} </span>
                }else {
                    joined = <button className="joinedBtn" onClick={e => JoinChallenge(e, challenges[i]._id, challenges[i].Members)}>Join</button> 
                }
            }
            
            challengeList[i] = (
                <tr key = {i}>
                    <td width="50%" id="challenge" > {challenges[i].Title} </td>
                    <td width="20%">{joined} </td>
                    <td width="25%">{challenges[i].Owner}</td>
                    <td width="5%"><LuPencil id="pencil"></LuPencil></td>
                </tr>
            )
        }

        return <>
            <button  className="newChallenge" onClick={() => setChallengeManager(true)}>Create Challenge</button>
                <div className="challenge-page">
                    <div id="TableHead">
                        <table>
                            <tbody>
                            <tr>
                                <td width="5%"></td>
                                <td width="45%" id="challenge"> Challenges</td>
                                <td width="20%"> My Streak</td>
                                <td width="30%"> Creator</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="Lcontent">
                        <table id="Table">
                            <tbody id="TableBody">
                                {challengeList}
                            </tbody>
                        </table>
                    </div>
                </div>
        </>

    };

    return (
        <body>
            {generateChallenges()}
            <ChallengeManager toast = {toast} trigger = {challengeManager} setTrigger = {setChallengeManager} isUpdated = {() => triggerDataRefresh()} challenges = {challenges}></ChallengeManager>
        </body>        
    );
}

export default Challenges;
