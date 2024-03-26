import React, { useState } from 'react';
import { render } from 'react-dom'; // Import the render function
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Verify(props){

    const [Imp1, setInp1] = useState('');
    const [Imp2, setInp2] = useState('');
    const [Imp3, setInp3] = useState('');
    const [Imp4, setInp4] = useState('');
    const [Imp5, setInp5] = useState('');

    const inputs = [Imp1, Imp2, Imp3, Imp4, Imp5];
    //const code = ["1", "2", "3", "4", "5"];
    
    const verif =(event) =>{
        //event.preventDefault();
        console.log("Code sent to verify.js is", props.code);
        props.close();
        
        var i;
        var bool;

        for(i=0; i<inputs.length; i++){
            if(inputs[i] == props.code[i]){
                bool = true;
            }else{
                bool = false;
                break;
            }
        }

        if(bool){ 
            console.log("Verification Complete!");
            props.sub(event);
        }
        else{   console.log("Could not verify.")}

    }

    return (
        <>

        <Modal
            show={props.show}
            onHide={props.close}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>  
                <Modal.Title>
                    <p>Enter the verification code sent to your email.<br/>
                    The code was sent to <span id={"person-email"}>{props.email}</span></p>
                    <p><h2>VERIFICATION CODE:</h2></p>
                </Modal.Title>
            </Modal.Header>
                <Modal.Body >
                    <div className='v-wrapper'> 
                        <form>
                            <div className={"flex-container"}>
                                <div className={'flexInput'}>
                                    <input type={"text"} 
                                        maxlength="1"
                                        oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                                        value={Imp1} 
                                        onChange={e => setInp1(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={'flexInput'}>
                                    <input type={"text"} 
                                        maxLength={1}
                                        oninput="this.value=this.value.replace(/[^0-9]/g,'');" 
                                        value={Imp2} 
                                        onChange={e => setInp2(e.target.value)} required/>
                                </div>

                                <div className={'flexInput'}>
                                    <input type={"text"}
                                        maxLength={1}
                                        oninput="this.value=this.value.replace(/[^0-9]/g,'');" 
                                        value={Imp3} 
                                        onChange={e => setInp3(e.target.value)}
                                    required/>
                                </div>
                                <div className={'flexInput'}>
                                    <input type={"text"} 
                                        maxLength={1}
                                        oninput="this.value=this.value.replace(/[^0-9]/g,'');" 
                                        value={Imp4} 
                                        onChange={e => setInp4(e.target.value)}
                                    required/>
                                </div>

                                <div className={'flexInput'}>
                                    <input type={"text"} 
                                        maxLength={1}
                                        oninput="this.value=this.value.replace(/[^0-9]/g,'');" 
                                        value={Imp5} 
                                        onChange={e => setInp5(e.target.value)}
                                    required/>
                                </div>
                            </div>

                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.close}>
                        Close
                    </Button> 
                    <Button variant="primary" onClick={verif} className={"btn"}>Verify</Button>
                </Modal.Footer>
            </Modal>
          
        </>
    );
}
export default Verify;