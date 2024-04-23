import React, {useState} from 'react';
import '../../Css/signin.css';
import { FaRegUserCircle, FaLock } from "react-icons/fa";
import {apiRequest} from "../../utils/reqTool"
import { useNavigate } from "react-router-dom";
import {Icon} from 'react-icons-kit';
import {eyeOff, eye} from 'react-icons-kit/feather';


const Signin = ({ isSignedin, toast }) =>{

    //todo: when the window size is small, the layout is messed up
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    let navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            "Username": username,
            "Password": password
          }
        apiRequest("POST", "user/login", data)
            .then(({token, ...user}) => {
                console.log(user);
                sessionStorage.setItem("userToken", token);
                sessionStorage.setItem("userName", user.Username);
                sessionStorage.setItem("userStreak", user.Streak);
                sessionStorage.setItem("userStreakOn", false);
                sessionStorage.setItem("userFirstName", user.FirstName);
                sessionStorage.setItem("userLastName", user.LastName);
                sessionStorage.setItem("userId", user._id);
                sessionStorage.setItem("userEmail", user.Email);
                isSignedin()
                navigate('/home');
                toast.success(`Welcome back ${user.Username}!`);
            })
            .catch(err => {
                console.log(err);
                toast.error(err.error);
            })
    };

    const handleToggle = () => {
        if (type==='password'){
           setIcon(eye);
           setType('text')
        } else {
           setIcon(eyeOff)
           setType('password')
        }
    }

    return (
        <div className={'LoginForm'}>
            <div className={'Top'}>
                <h1>Welcome to HabitConnect!</h1>
                <p>{sessionStorage.getItem("quote")}</p>
            </div>
            <div className={'wrapper'}>
                <form onSubmit={handleSubmit} >
                    <h1>Login</h1>
                    <div className={'inputBox'}>
                        <FaRegUserCircle className="icon"/> Username:
                        <input
                        type={"text"} placeholder={'  Username'}
                        name={"username"}
                        value={username}
                        maxlength="20"
                        oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                        onChange={e => setUsername(e.target.value)}
                        required/>

                    </div>
                    <div className={'inputBox'}>
                        <FaLock className="icon"/>     Password:
                        <input
                                type={type} placeholder={'  Password'}
                                name={"password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-.]).{8,16}$'
                                required/>
                                
                            <div className='Icon'> 
                                <Icon class="absolute mr-10" icon={icon} size={25} onClick={handleToggle}/>
                            </div>
                    </div>

                    <button type={"submit"}>Login</button>
                    <div className='remember-forget'>
                        <a href="/forgot"> Forgot password</a>
                    </div>

                    <div className={'register-link'}>
                        <p>Don't have an account? <a href={"/signup"}>Sign up </a></p>
                    </div>


                </form>
            </div>
        </div>
    );
};

export default Signin;