import React, { useEffect } from "react";
import '../../Css/stats.css';
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
        <div className="parent">
            <div className={'my-stats'}>
                <h1>My Stats</h1>
                <div className={'quick-insights'}>
                    <h1>My Quick Insights</h1>
                </div>
            </div>
        </div>
    );
}
export default Stats;