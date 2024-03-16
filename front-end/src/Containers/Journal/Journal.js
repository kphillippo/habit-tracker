import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Journal(props){
    
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
        <div className="main-container">journal test</div>
    );
}
export default Journal;