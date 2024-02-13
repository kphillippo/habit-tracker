import React, {useState} from 'react';
import './LoginForm.css';
import { FaRegUserCircle, FaLock } from "react-icons/fa";

const LoginForm = () =>{

    //problems: when the window size is small, the layout is messed up
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Login with:', username, password);
    };

    return (
        <div className={'LoginForm'}>
            <div className={'Top'}>
                <h1>Welcome to Lifetrack!!</h1>
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

                    <div className={'register-link'}>
                        <p>Don't have an account? <a href={"#"}>Sign up </a></p>
                    </div>

                    <div className='remember-forget'>
                        <label><input type="checkbox"/>Remember Me</label>
                        <a href="#"> Forgot password</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;