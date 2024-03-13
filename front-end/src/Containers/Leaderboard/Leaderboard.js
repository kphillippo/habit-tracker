import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Leaderboard(props){

    let navigate = useNavigate()

    function isSignIn(){
        if(!props.user.userToken){
            navigate("/signin")
        }
    }

    useEffect(() => {
        isSignIn();
    })
    
    return(
        <div className="main-container">Leaderboard test</div>
    );
}
export default Leaderboard;