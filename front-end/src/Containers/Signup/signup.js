import React, {useState} from "react";
import Popup from "reactjs-popup";
import "./signup.css";
import {FaLock, FaRegUserCircle} from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import {NavLink} from "react-router-dom";



function Signup(){
    
    const [email, setEmail] = useState('');
    const [Fname, setFname] = useState('');
    const [Lname, setLname] = useState('');
    const [usernamee, setUsername] = useState('');
    const [passwordd , setPassword] = useState('');

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log('signed up with:', Fname, Lname, email, usernamee, passwordd);

    };

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
                                                                               name={"Fname"}
                                                                               value={Fname}
                                                                               onChange={e => setFname(e.target.value)}
                                                                               required/>
                    </div>

                    <div className={'inputBox'}>
                        <FaRegUserCircle className="icon"/> Last Name: <input type={"text"}
                                                                              placeholder={'  Last Name'}
                                                                              name={"Lname"}
                                                                              value={Lname}
                                                                              onChange={e => setLname(e.target.value)}
                                                                              required/>
                    </div>

                    <div className={'inputBox'}>
                        <MdAlternateEmail className="icon"/> Email: <input type={"email"}
                                                                           name={"email"}
                                                                           placeholder={'  Email'}
                                                                           value={email}
                                                                           onChange={e => setEmail(e.target.value)}
                                                                           required/>
                    </div>

                    <div className={'inputBox'}>
                        <FaRegUserCircle className="icon"/> Username: <input type={"text"}
                                                                             placeholder={'  Username'}
                                                                             name={"usernamee"}
                                                                             value={usernamee}
                                                                             onChange={e => setUsername(e.target.value)}
                                                                             required/>
                    </div>

                    <div className={'inputBox'}>
                        <FaLock className="icon"/> Password: <input type={"password"}
                                                                    placeholder={'  Password'}
                                                                    name={"passwordd"}
                                                                    value={passwordd}
                                                                    onChange={e => setPassword(e.target.value)}
                                                                    required/>
                    </div>

                    <Popup
                        className={"popUp"}
                        trigger={<button className={"btn"} type={"submit"}>Create Account</button>}
                        position={"top center"}  offsetY={150}
                        closeOnDocumentClick
                    >
                        <div className={'v-wrapper'}>
                            <p>Enter the verification code sent to your email.<br/>
                            The code was sent to <span id={"person-email"}>v</span></p>
                            <p><h2>VERIFICATION CODE:</h2></p>

                            <form action={""}>
                                <div className={"flex-container"}>
                                    <div className={'flexInput'}>
                                        <input type={"number"} required/>
                                    </div>

                                    <div className={'flexInput'}>
                                        <input type={"number"} required/>
                                    </div>

                                    <div className={'flexInput'}>
                                        <input type={"number"} required/>
                                    </div>

                                    <div className={'flexInput'}>
                                        <input type={"number"} required/>
                                    </div>

                                    <div className={'flexInput'}>
                                        <input type={"number"} required/>
                                    </div>
                                </div>

                                <button className={"btn"} type={"submit"}>Verify</button>

                            </form>

                        </div>
                    </Popup>;


                </form>
            </div>
        </div>
    );
}


export default Signup;