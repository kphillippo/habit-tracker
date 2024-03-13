import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Stats(props){

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
        <div className="main-container">stats test</div>
    );
}
export default Stats;