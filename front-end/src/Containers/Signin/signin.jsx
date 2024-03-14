import React, {useState} from 'react';
import '../../Css/signin.css';
import { FaRegUserCircle, FaLock } from "react-icons/fa";
import {apiRequest} from "../../utils/reqTool"
import { useNavigate } from "react-router-dom";


const Signin = ({ isSignedin }) =>{

    //todo: when the window size is small, the layout is messed up
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
                sessionStorage.setItem("userFirstName", user.FirstName);
                sessionStorage.setItem("userLastName", user.LastName);
                sessionStorage.setItem("userId", user._id);
                sessionStorage.setItem("userEmail", user.Email);
                isSignedin()
                navigate('/home');
            })
            .catch(err => {
                console.log(err);
                window.alert(err.error);
            })
            
        console.log('Login with:', username, password);
    };

    return (
        <div className={'LoginForm'}>
            <div className={'Top'}>
                <h1>Welcome to HabitConnect!!</h1>
                <p>"I am a random quote everyday to give you motivation." = Person McPerson</p>
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
                        onChange={e => setUsername(e.target.value)}
                        required/>

                    </div>
                    <div className={'inputBox'}>
                        <FaLock className="icon"/>     Password:
                        <input
                            type={"password"} placeholder={'  Password'}
                            name={"password"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required/>

                    </div>

                    <button type={"submit"}>Login</button>
                    <div className='remember-forget'>
                        <a href="#"> Forgot password</a>
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