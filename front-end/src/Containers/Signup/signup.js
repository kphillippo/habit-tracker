import React, {useState} from "react";
import Popup from "reactjs-popup";
import "../../Css/signup.css";
import {FaLock, FaRegUserCircle} from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import {NavLink} from "react-router-dom";
import {apiRequest} from "../../utils/reqTool"
import { useNavigate } from "react-router-dom";
import Verify from "./verify";
import PasswordChecklist from "react-password-checklist"
import {Icon} from 'react-icons-kit';
import {eyeOff, eye} from 'react-icons-kit/feather';


const Signup = ({isSignedin, toast}) => {
    
    const [email, setEmail] = useState('');
    const [Fname, setFname] = useState('');
    const [Lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [passwordAgain , setPasswordAgain] = useState('');
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const [code, setCode] = useState('');
    
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
                toast.error(err.error);
            })
        console.log('signed up with:', Fname, Lname, email, username, password);
        
    };

    function getCode(){
        var i;
        let str = "";
        var codel = [];
        for(i = 0; i < 5; i++){
            codel[i] = Math.floor(Math.random() * 10);
            str += codel[i].toString();
        }
        setCode(codel);
        console.log(str);
        return str;
    }

    const handleMail = (event) => {
        event.preventDefault();
        if(password != passwordAgain){
            toast.error("Passwords do not match");
        }else{
            const inf = getCode();
            setVerify(true);
            let info = {
                "to": email,
                "subject": "Test Test Testing",
                "text": "Welcome to HabitConnect, here is your verification code: " + inf
            }
            apiRequest("POST", "verification/sendEmail", info)
                .then(({token, ...user}) => {
                    toast.success(`Email has been sent to ${user.Email}!`)
                })
                .catch(err => {
                    toast.error(err.error);
                })
            console.log('Email has been sent to', email);
        }
    }

    const handleToggle = (event) => {
        event.preventDefault();
        if (type==='password'){
           setIcon(eye);
           setType('text')
        } else {
           setIcon(eyeOff)
           setType('password')
        }
    };

    const [showVerify, setVerify] = useState(false);

    return (
        <div className={'SignUp'}>
            <div className={'signup-Top'}>
                <h1>Create Your Account!</h1>
            </div>
            <div className={'wrapper'}>
                <form >
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
                                                                             maxlength="20"
                                                                             oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                                                                             onChange={e => setUsername(e.target.value)}
                                                                             required/>
                                             
                    </div>

                    <div className={'inputBox'}>
                        <FaLock className="icon"/> Password: <input type={type}
                                                                    placeholder={'  Password'}
                                                                    name={"password"}
                                                                    value={password}
                                                                    onChange={e => setPassword(e.target.value)}
                                                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-.]).{8,16}$"
                                                                    required/>
                        <div className='Icon'> 
                                <Icon class="absolute mr-10" icon={icon} size={25} onClick={handleToggle}/>
                            </div>                                            
                    </div>

                    <div className={'inputBox'}>
                        <FaLock className="icon"/> Password: <input type={type}
                                                                    placeholder={'  Confirm Password'}
                                                                    name={"passwordAgain"}
                                                                    value={passwordAgain}
                                                                    onChange={e => setPasswordAgain(e.target.value)}
                                                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-.]).{8,16}$"
                                                                    required/>
                        <div className='Icon'> 
                                <Icon class="absolute mr-10" icon={icon} size={25} onClick={handleToggle}/>
                            </div>                                            
                    </div>

                    <button className={"btn"} onClick={handleMail} >Create Account</button>
                </form>
                <div className="CheckList">
                    <PasswordChecklist
                        rules={["minLength","specialChar","number","capital","lowercase", "match"]}
                        minLength={8}
                        value={password}
                        valueAgain={passwordAgain}
                    />
                </div>
                <Verify show={showVerify} close={() => setVerify(false)} sub={handleSubmit} code ={code} email={email}/>
            </div>

        </div>
    );
}


export default Signup;