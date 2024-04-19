import React, {useState} from 'react';
import '../../Css/signin.css';
import { FaRegUserCircle, FaLock } from "react-icons/fa";
import {apiRequest} from "../../utils/reqTool"
import {eyeOff, eye} from 'react-icons-kit/feather';
import Verify from '../Signup/verify';
import {Icon} from 'react-icons-kit';


function Forgot({data, toast}){

    //todo: when the window size is small, the layout is messed up
    const [email, setEmail] = useState('');
    const [showVerify, setVerify] = useState(false);
    const [code, setCode] = useState('');
    const [password , setPassword] = useState('');
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);


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

    const handleSubmit = (event) => {

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

    const handleMail = (event) => {
        event.preventDefault();
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

    return (
        <div className={'LoginForm'}>

            <div className={'wrapper'}>
                <form onSubmit={handleMail} >
                    <h1>Enter your email and new password</h1>
                    <div className={'inputBox'}>
                        <FaRegUserCircle className="icon"/> Email:
                        <input
                        type={"email"} placeholder={'  Email'}
                        name={"email"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required/>

                    </div>
                    <div className={'inputBox'}>
                        <FaLock className="icon"/> Password: 
                        <input type={type}
                            placeholder={'  New Password'}
                            name={"password"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-.]).{8,16}$"
                            required/>                                            
                        <div className='Icon'> 
                                <Icon class="absolute mr-10" icon={icon} size={25} onClick={handleToggle}/>
                            </div>                                            
                    </div>
                
                    <button type={"submit"} style={{marginBottom : "10px"}}>Submit</button>
                </form>
                <Verify show={showVerify} close={() => setVerify(false)} sub={handleSubmit} code ={code} email={email}/>
            </div>
        </div>
    );
};

export default Forgot;