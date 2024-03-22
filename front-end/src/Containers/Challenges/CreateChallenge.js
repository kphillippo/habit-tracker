import { useState } from 'react';
import { render } from 'react-dom'; // Import the render function
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../Css/challenges.css";
import { ImFire } from "react-icons/im";
import { LuPencil } from "react-icons/lu";

function CreateChallenge(props) {

    let currentStreak = props.data.currentStreak
    if(currentStreak == "undefined"){
        currentStreak = 0;
    }
    // Saves name and time of new challenge
    const [Cname, setCname] = useState('');
    const [Time, setTime] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const postInfo = () => {

    setShow(false);


    const tt = Time.split(":");
    let minute = tt[0];
    let second = tt[1];

    // Creates new row to nbe added into table
    var x = document.getElementById("Table");
    var len = x.rows.length;
    var row = x.insertRow(len);

    var cell1 = row.insertCell(0);
    cell1.innerHTML = Cname;

    // Define and render fire icon into correct position
    var cell2 = row.insertCell(1);
    const icon = <ImFire color='#e57028' /> 
    render(icon, cell2);
    cell2.innerHTML += currentStreak;

    var cell3 = row.insertCell(2);
    cell3.innerHTML = "You";

    var cell4 = row.insertCell(3);
    var elem2 = document.createElement("LuPencil");
    cell4.appendChild(elem2);


    /*document.getElementById("TableBody").innerHTML += <tr className="Trow">
                                                        <td width="50%" id="challenge">{Cname}</td>
                                                        <td width="20%"><ImFire color='#e57028'></ImFire> 21</td>
                                                        <td width="25%">You</td>
                                                        <td width="5%"><LuPencil id="pencil"></LuPencil></td>
                                                     </tr>*/
    console.log("Challenge name is " +Cname + "for " + minute +" minutes and " + second + "seconds");
  }


  return (
    <>
      <button className="newChallenge" onClick={handleShow}> Create new Challenge</button>   

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
            <div id='Mbody'>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Challenge</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='input'> Name 
                        <input type='text'
                            placeholder='Challenge name'
                            name={"Cname"}
                            value={Cname}
                            onChange={e => setCname(e.target.value)}
                            required/>
                        </div>

                        <div className='input'> Name 
                        <input type='text'
                            placeholder='30:00'
                            name={"Time"}
                            value={Time}
                            pattern='[0-9]{1, 2}+:[0-9]{1, 2}$'
                            onChange={e => setTime(e.target.value)}
                            required/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={postInfo}>Understood</Button>
                </Modal.Footer>
            </div>
      </Modal>
    </>
  );
}

export default CreateChallenge;