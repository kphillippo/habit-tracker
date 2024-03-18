import React, {useState} from "react";
import Popup from "reactjs-popup";
import "../../Css/signup.css";
import {FaLock, FaRegUserCircle} from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import {NavLink} from "react-router-dom";
import {apiRequest} from "../../utils/reqTool"
import { useNavigate } from "react-router-dom";


const Signup = ({isSignedin, toast}) => {
    
    const [email, setEmail] = useState('');
    const [Fname, setFname] = useState('');
    const [Lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [password , setPassword] = useState('');
    let navigate = useNavigate();
    const handleSubmit = (event) =>{
        event.preventDefault();
        let data = {
            "Username": username,
            "Password": password,
            "Email": email,
            "FirstName": Fname,
            "LastName": Lname,
            "Streak": 0
          }
        apiRequest("POST", "user/signup", data)
            .then(({token, ...user}) => {
                console.log(user);
                sessionStorage.setItem("userToken", token);
                sessionStorage.setItem("userName", user.Username);
                sessionStorage.setItem("userStreak", user.Streak);
                isSignedin()
                navigate('/home');
                toast.success(`Welcome back ${user.Username}!`)
            })
            .catch(err => {
                console.log(err);
                toast.alert(err.error);
            })
        console.log('signed up with:', Fname, Lname, email, username, password);
        
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
                                                                             value={username}
                                                                             max={20}
                                                                             onChange={e => setUsername(e.target.value)}
                                                                             max={20}
                                                                             required/>
                    </div>

                    <div className={'inputBox'}>
                        <FaLock className="icon"/> Password: <input type={"password"}
                                                                    placeholder={'  Password'}
                                                                    name={"password"}
                                                                    value={password}
                                                                    onChange={e => setPassword(e.target.value)}
                                                                    required/>
                    </div>
                    <button className={"btn"} type={"submit"} onClick={handleSubmit}>Create Account</button>
                    {/* <Popup
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
                    </Popup> */}


                </form>
            </div>
        </div>
    );
}


export default Signup;