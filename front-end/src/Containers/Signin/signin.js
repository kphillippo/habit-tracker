import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { NavLink } from "react-router-dom";
import "../../Css/signin.css"
import { FaRegUserCircle, FaLock } from "react-icons/fa";

function Signin(){

    //todo: responsive design
    //problems: when the window size is small, the layout is messed up
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log('Login with:', username, password);
      };
    
    return(
        <div className="main-container">
            <span className="lg-font">Welcome to HabbitConnect! </span> <br></br>
            <span>"I an a random quote every day to give you motivation." -Person McPerson</span>
            <div className={'wrapper'}>
                <form action={""} >
                    <h1>Login</h1>
                    <div className={'inputBox'}>
                        <FaRegUserCircle className="icon"/> Username: <input type={"text"} placeholder={'  Username'} required/>

                    </div>
                    <div className={'inputBox'}>
                        <FaLock className="icon"/>     Password: <input type={"password"} placeholder={'  Password'} required/>

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
            {/* <Form className="log-in-form" onSubmit={handleSubmit}>
                <div className="form-content">
                <span className="lg-font">Log in</span>
                <FormGroup row className="formgroup">
                <Label for="username" sm={2}>Username:</Label>
                <Input
                    type="username"
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                </FormGroup>

                <FormGroup row>
                <Label for="password" sm={2}>Password:</Label>
                <Input
                    sm={5}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                </FormGroup>
                <Button className="submit-btn" type="submit">Log In</Button> <br></br>
                <span>Don't have an account? </span> <NavLink to="/signup"> Sign up </NavLink> <br></br>
                <NavLink to="/password-recover">Forgot password?</NavLink>
                </div>
            </Form> */}
        </div>
    );
}
export default Signin;