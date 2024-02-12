import React from "react";
import "./verify.css"
import {FaLock, FaRegUserCircle} from "react-icons/fa";
import {MdAlternateEmail} from "react-icons/md";
import {NavLink} from "react-router-dom";


function Verify(){
    return (
        <div className={'v-wrapper'}>
            <p>Enter the verification code sent to your email</p>
            <p>The code was sent to <span id={"person-email"}></span></p>
            <p><h2>VERIFICATION CODE:</h2></p>

            <form action={""}>
                <div className={"flex-container"}>
                    <div className={'flexInput'}>
                        <input type={"text"} min={"0"} max={"9"}
                              pattern={"[0-9]{1}"} size={"1"} required/>
                    </div>

                    <div className={'flexInput'}>
                        <input type={"text"} min={"0"} max={"9"}
                               pattern={"[0-9]{1}"}  size={"1"} required/></div>

                    <div className={'flexInput'}>
                        <input type={"text"} min={"0"} max={"9"}
                               pattern={"[0-9]{1}"} size={"1"}required/></div>

                    <div className={'flexInput'}>
                        <input type={"text"} min={"0"} max={"9"}
                               pattern={"[0-9]{1}"} size={"1"} required/>                    </div>

                    <div className={'flexInput'}>
                        <input type={"text"} min={"0"} max={"9"}
                               pattern={"[0-9]{1}"} size={"1"} required/>                    </div>
                </div>

                <button type={"submit"}>Create Account</button>

            </form>
        </div>
    );
}

export default Verify;