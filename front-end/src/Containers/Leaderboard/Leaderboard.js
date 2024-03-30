
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/Leaderboard.css";
import { GiTrophy } from "react-icons/gi";
import { IoMdFlame } from "react-icons/io";
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill } from "react-icons/bs";

import {LuPencil} from "react-icons/lu";


function Leaderboard(props){

    let navigate = useNavigate()
    let currentStreak = props.user.userStreak;
    if(currentStreak == "undefined"){
        currentStreak = 0;
    }

    function isSignIn(){
        if(!props.user.userToken){
            navigate("/signin")
        }
    }

    useEffect(() => {
        isSignIn();
    })
  
    return (
        <body>
        <div className= "leaderboard-page">
            <div className="innerBoard">
                <GiTrophy className="GiTrophy"></GiTrophy>
                <div className="tbl">
                    <table id="Table">
                        <tbody>
                            <tr>
                                <td width="20%"> <Bs1CircleFill id="placement" color="gold"/></td>
                                <td width="60%"> Freind 3</td>
                                <td width="20%"> <IoMdFlame color="orange"></IoMdFlame> 24</td>
                            </tr>
                            <tr>
                                <td> <Bs2CircleFill id="placement" color="silver"/></td>
                                <td> Friend 1</td>
                                <td> <IoMdFlame color="orange"></IoMdFlame> 21</td>
                            </tr>
                            <tr>
                                <td> <Bs3CircleFill id="placement" color="brown"/> </td>
                                <td> Friend 2</td>
                                <td> <IoMdFlame color="orange"></IoMdFlame> 17</td>
                            </tr>
                            <tr>
                                <td> 4 </td>
                                <td> Friend 4</td>
                                <td> <IoMdFlame color="orange"></IoMdFlame> 12</td>
                            </tr>

                            <tr>
                                <td> 5 </td>
                                <td> You</td>
                                <td> <IoMdFlame color="orange"></IoMdFlame> {currentStreak}</td>
                            </tr>

                            <tr>
                                <td> 6 </td>
                                <td> Friend 5</td>
                                <td> <IoMdFlame color="orange"></IoMdFlame> 2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </body>
    );
};
export default Leaderboard;