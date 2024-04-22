import React, {useState} from 'react';
import '../../Css/signin.css';
import { FaRegUserCircle, FaLock } from "react-icons/fa";
import {apiRequest} from "../../utils/reqTool"
import {eyeOff, eye} from 'react-icons-kit/feather';
import Verify from '../Signup/verify';
import {Icon} from 'react-icons-kit';
import { useNavigate } from "react-router-dom";


function Forgot({data, toast}){

    //todo: when the window size is small, the layout is messed up
    const [email, setEmail] = useState('');
    const [showVerify, setVerify] = useState(false);
    const [code, setCode] = useState('');
    const [password , setPassword] = useState('');
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    let navigate = useNavigate();


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

    // Function to check if email exists
    const doesEmailExists = async (event) => {
        event.preventDefault();
        try{
            let info = {
                "Email": email
            }
            const response = await apiRequest("POST", "user/emailExists", info)
            let data = await response
            toast(data)
            // If email exists, send verification code
            if(data === "Email exists!"){   
                handleMail(event)
            }else{toast("Please enter a registered email")}
        }catch (err) {
            console.error("Failed to fetch user info:", err);
        }
    }

    function generateHTML(){
        var inf = getCode();

        const message = `
        <html>
        <p>
        <span style="color:rgb(56, 118, 29);">
          <strong>HabitConnect Password Reset Request</strong>
        </span>
        </p>
        <p>
            <strong>We’ve received a request to reset the password for your HabitConnect account.</strong>
        </p>
        <p>Please enter this verification code in the window where you made this request to reset your password:&nbsp;</p>
        <p>
            <strong>`+inf+`</strong>
        </p>
        <p>This code is valid while your HabitConnect window stays open.&nbsp;</p>
        <p>If you did not request to reset your password, ignore this email.</p>
        <span style="color:rgb(153, 153, 153);">Have questions or trouble logging in? Please contact us
        </span>
        <a target="_blank" href="mailto:habittrackerrr@gmail.com">
            <span style="color:rgb(17, 85, 204);">here</span>
        </a>
        <span style="color:rgb(153, 153, 153);">.
        </span>
        </html>
        `;
        return message;
    }
    

    const handleMail = (event) => {
        event.preventDefault();
        const inf = getCode();
            setVerify(true);
            let info = {
                "to": email,
                "subject": "HabitConnect: Password Reset Request",
                //"text": "Welcome to HabitConnect, here is your verification code: " + inf,
                "text": generateHTML()
            }
            apiRequest("POST", "verification/sendEmail", info)  // Calls for api to send email with credentials in info
                .then(({token, ...user}) => {
                    toast.success(`Email has been sent to `+ email)
                })
                .catch(err => {
                    toast.error(err.error);
                })
            console.log('Email has been sent to', email);
    }

    // Function to reset user password, by taking in email and new password
    // This is the function sent to the verify modal to as sub prop
    const resetPassword = (event) => {
        event.preventDefault();
        let info = {
            "Email": email,
            "Password": password
        }
        apiRequest("POST", "user/forgotPassword", info)
        .then(({token, ...user}) => {
            toast.success(`Your password has been reset`)
            navigate('/signin')
        })
        .catch(err => {
            toast.error(err.error);
        })
    }

    return (
        <div className={'LoginForm'}>

            <div className={'wrapper'}>
                <form onSubmit={doesEmailExists} >
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
                
                    <button style={{marginBottom : "10px"}}>Submit</button>
                </form>
                <Verify show={showVerify} close={() => setVerify(false)} sub={resetPassword} code ={code} email={email}/>
            </div>
        </div>
    );
};

export default Forgot;