import React from "react";
import "./signup.css";
import {FaLock, FaRegUserCircle} from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import {NavLink} from "react-router-dom";



function Signup(){
    return (
        <div className={'SignUp'}>
            <div className={'signup-Top'}>
                <h1>Create Your Account!</h1>
            </div>
            <div className={'wrapper'}>
                <form action={""}>
                    <div className={'inputBox'}>
                        <FaRegUserCircle className="icon"/> First Name: <input type={"text"}
                                                                               placeholder={' First Name'}
                                                                               required/>
                    </div>

                    <div className={'inputBox'}>
                        <FaRegUserCircle className="icon"/> Last Name: <input type={"text"}
                                                                              placeholder={'  Last Name'} required/>
                    </div>

                    <div className={'inputBox'}>
                        <MdAlternateEmail className="icon"/> Email: <input type={"email"} placeholder={'  Email'}
                                                                           required/>
                    </div>

                    <div className={'inputBox'}>
                        <FaRegUserCircle className="icon"/> Username: <input type={"text"}
                                                                             placeholder={'  Username'} required/>
                    </div>

                    <div className={'inputBox'}>
                        <FaLock className="icon"/> Password: <input type={"password"} placeholder={'  Password'}
                                                                    required/>
                    </div>

                    <NavLink
                        activeClassName = "active"
                        active
                        to="/Verify"
                    >
                        <button type={"submit"}>Create Account</button>
                    </NavLink>


                </form>
            </div>
        </div>
    );
}

export default Signup;