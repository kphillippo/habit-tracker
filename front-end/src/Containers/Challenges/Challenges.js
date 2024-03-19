
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/challenges.css";
import ReactDOM from "react-dom/client";
import { ImFire } from "react-icons/im";
import { LuPencil } from "react-icons/lu";
import CreateChallenge from "./CreateChallenge";
import EditChallenges from "./EditChallenges";
//import EditChallenges from "./EditChallenges";


function Challenges(props){

    let navigate = useNavigate();
    let name = props.user.userName;

    function isSignIn(){
        if(!props.user.userToken){
            navigate("/signin")
        }
    }

    useEffect(() => {
        isSignIn();
    })

    let currentStreak = props.user.userStreak;
    if(currentStreak == "undefined"){
        currentStreak = 0;
    }

    const [showEdit, setEdit] = useState(false);



    
    return (
        <body>
        <CreateChallenge data={{currentStreak, name}} />
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
                    <tr className="Trow" onClick={() => setEdit(true)}>
                        <td width="50%" id="challenge">Exercise 30 minutes</td>
                        <td width="20%"><ImFire color='#e57028'></ImFire> {currentStreak} </td>
                        <td width="25%">You</td>
                        <td width="5%"><LuPencil id="pencil"></LuPencil></td>
                    </tr>
                    <tr className="Trow">
                        <td id="challenge">Exercise 30 minutes</td>
                        <td><ImFire color='#e57028'></ImFire> 21</td>
                        <td>You</td>
                        <td><LuPencil id="pencil"></LuPencil></td>
                    </tr>
                    <tr className="Trow">
                        <td id="challenge">Exercise 30 minutes</td>
                        <td><ImFire color='#e57028'></ImFire> 21</td>
                        <td>You</td>
                        <td><LuPencil id="pencil"></LuPencil></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <EditChallenges show={showEdit} close={() => setEdit(false)} currentStreak = {currentStreak}/>

        </body>

        

    );
}

export default Challenges;
