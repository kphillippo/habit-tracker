import React from "react";
import "../../Css/Leaderboard.css";
import { GiTrophy } from "react-icons/gi";
import { ImFire } from "react-icons/im";
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill } from "react-icons/bs";

import {LuPencil} from "react-icons/lu";


function Leaderboard(){
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
                                <td width="60%"> You</td>
                                <td width="20%"> <ImFire color="orange"></ImFire> 31</td>
                            </tr>
                            <tr>
                                <td> <Bs2CircleFill id="placement" color="silver"/></td>
                                <td> Friend 1</td>
                                <td> <ImFire color="orange"></ImFire> 21</td>
                            </tr>
                            <tr>
                                <td> <Bs3CircleFill id="placement" color="brown"/> </td>
                                <td> Friend 2</td>
                                <td> <ImFire color="orange"></ImFire> 17</td>
                            </tr>
                            <tr>
                                <td> 4 </td>
                                <td> Friend 3</td>
                                <td> <ImFire color="orange"></ImFire> 12</td>
                            </tr>
                            <tr>
                                <td> 5 </td>
                                <td> Friend 4</td>
                                <td> <ImFire color="orange"></ImFire> 2</td>
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