import React from "react";
import "./dailies.css";
import { FaCog } from "react-icons/fa";
import { IoMdFlame } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { FaPlusCircle } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegCalendar } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import {useState} from 'react';

function NewHabit(props){
    return (props.trigger) ? (
        <div className="popup">
            <div className= "popup-inner">
                <div class = "Title">Add New Habit</div>
                <div class = "columns">
                    <label class = "name_label" for = "name_input">Name:</label>
                    <input id = "name_input" type="text"></input>

                    <label class = "timer_label"for = "timer_input">Timer:</label>
                    <input id = "timer_input" type="text"></input>

                    <label class = "counter_label"for = "counter_input">Counter:</label>
                    <input id = "counter_input" type="text"></input>
                    
                    <label class = "frequency_label"for = "frequency_input">Frequency:</label>
                    <select id = "frequency_input">
                        <option value = "Daily">Every Day</option>
                        <option value = "Weekly">Every Week</option>
                        <option value = "Monthly">Every Month</option>
                    </select>
                </div>
                    <button class = "Close" onClick={() => props.setTrigger(false)}>X</button>
                    <button class = "SaveSubmit" >Save & Close</button>
                {props.children}
            </div>
        </div> 
    ) : "";
}

function EditHabit(edithabit){
    return (edithabit.trigger) ? (
        <div className="edithabit_popup">
            <div className= "edithabit_popup-inner">
                <div class = "edithabit_Title">Edit My Habit</div>
                <div class = "edithabit_columns">
                    <label class = "edithabit_name_label" for = "edithabit_name_input">Name:</label>
                    <input id = "edithabit_name_input" type="text"></input>

                    <label class = "edithabit_timer_label"for = "edithabit_timer_input">Timer:</label>
                    <input id = "edithabit_timer_input" type="text"></input>

                    <label class = "edithabit_counter_label"for = "edithabit_counter_input">Counter:</label>
                    <input id = "edithabit_counter_input" type="text"></input>
                    
                    <label class = "edithabit_frequency_label"for = "edithabit_frequency_input">Frequency:</label>
                    <select id = "edithabit_frequency_input">
                        <option value = "Daily">Every Day</option>
                        <option value = "Weekly">Every Week</option>
                        <option value = "Monthly">Every Month</option>
                    </select>
                </div>
                    <div class = "edithabit_currentstr">Current Streak:</div>
                    <button class = "edithabit_close" onClick={() => edithabit.setTrigger(false)}>X</button>
                    <button class = "edithabit_savesubmit" >Save & Close</button>
                {edithabit.children}
            </div>
        </div> 
    ) : "";
}
function EditToDo(edittodo){
    return (edittodo.trigger) ? (
        <div class ="edittodo_popup">
            <div className= "edittodo_popup-inner">
                <div class = "edittodo_Title">Edit My To Do</div>
                <div class = "edittodo_columns">
                    <label class = "edittodo_name_label" for = "edittodo_name_input">Name:</label>
                    <input id = "edittodo_name_input" type="text" ></input>

                    <label class = "edittodo_timer_label"for = "edittodo_timer_input">Date:</label>
                    <input id = "edittodo_timer_input" type="text"></input>

                    <label class = "edittodo_counter_label"for = "edittodo_counter_input">Repeat:</label>
                    <select id = "edittodo_counter_input">
                        <option value = "Do not Repeat">Do not Repeat</option>
                        <option value = "Notify Me">Notify Me</option>
                    </select>
                    
                    <label class = "edittodo_frequency_label"for = "edittodo_frequecny_input">Remind:</label>
                    <select id = "edittodo_frequency_input">
                        <option value = "Do not Remind">Do not Remind</option>
                        <option value = "Remind Me">Remind Me</option>
                    </select>
                    <label class = "edittodo_status_label" for ="edittodo_status_input">Status:</label>
                    <select id = "edittodo_status_input">
                        <option value = "Not Done">Not Done</option>
                        <option value = "Done">Done</option>
                    </select>
                </div>
                    <button class = "edittodo_close" onClick={() => edittodo.setTrigger(false)}>X</button>
                    <button class = "edittodo_savesubmit" onClick={() => edittodo.setTrigger(false)}>Save & Close</button>
                {edittodo.children}
            </div>
        </div> 
    ) : "";
}

function NewToDo(todo){
    
    return (todo.trigger) ? (
        <div class ="todo_popup">
            <div className= "todo_popup-inner">
                <div class = "todo_Title">Add To Do</div>
                <div class = "todo_columns">
                    <label class = "todo_name_label" for = "todo_name_input">Name:</label>
                    <input id = "todo_name_input" type="text" ></input>

                    <label class = "todo_timer_label"for = "todo_timer_input">Date:</label>
                    <input id = "todo_timer_input" type="text"></input>

                    <label class = "todo_counter_label"for = "todo_counter_input">Repeat:</label>
                    <select id = "todo_counter_input">
                        <option value = "Do not Repeat">Do not Repeat</option>
                        <option value = "Notify Me">Notify Me</option>
                    </select>
                    
                    <label class = "todo_frequency_label"for = "todo_frequecny_input">Remind:</label>
                    <select id = "todo_frequency_input">
                        <option value = "Do not Remind">Do not Remind</option>
                        <option value = "Remind Me">Remind Me</option>
                    </select>
                </div>
                    <button class = "todo_close" onClick={() => todo.setTrigger(false)}>X</button>
                    <button class = "todo_savesubmit" onClick={() => todo.setTrigger(false)}>Save & Close</button>
                {todo.children}
            </div>
        </div> 
    ) : "";
}

function Dailies(){
    const[buttonPopup,setButtonPopup] = useState(false);

    const[newToDoPopup,setNewToDoPopup] = useState(false);

    const[editHabitPopup,setEditHabitPopup] = useState(false);

    const[editToDo,setEditToDo] = useState(false);



    return (
  <body>
    <div class="dailies-page">
      <div class = "tbl_container1">
            <div class = "tbl_container">
                    <div id = "div1">
                    <table id = "table1">
                      <tr>
                      <td width = "50%">Habit</td>
                      <td width = "22.5%">Streak</td>
                      <td width = "22.5%">Goal</td>
                      <td width = "3%"><button class = "plus1" onClick ={() => setButtonPopup(true)}>< FaPlus size = "2vw"></FaPlus></button></td>
                      <td width = "2%"><button class = "btn_cog" onClick ={() => setButtonPopup(true)}><FaCog id = "cog" size = "2.5vw"></FaCog></button></td>
                      </tr>
                      </table>
                    </div>
                    <div id ="div2">
                        <table id = "table2">
                            <tr>
                                <td class = "check"width = "5%"><input type = "checkbox" id="habit" name="habit"></input></td>
                                <td class = "habit" width = "53%"> Go for a walk</td>
                                <td width = "2%"><IoMdFlame id ="flame" color="#e57028" size = "3.5vw"></IoMdFlame></td>
                                <td width = "12.5%">7</td>
                                <td class = "amount" width = "20.5%">0/2</td>
                                <td width = "2%"><button class = "btn_counter"><FaPlusCircle  color="#92B27A" size = "2.5vw"></FaPlusCircle></button></td>
                                <td width = "7%"><button class = "btn_edit" onClick ={() => setEditHabitPopup(true)}> <LuPencil  color="#000000" size = "2.5vw"></LuPencil></button></td>
                            </tr>
                            <tr>
                                <td class = "check"><input type = "checkbox" id="habit" name="habit"></input></td>
                                <td class = "habit">Drink Water</td>
                                <td><IoMdFlame id ="flame" color="#e57028" size = "3.5vw"></IoMdFlame></td>
                                <td>14</td>
                                <td class = "amount">0/5</td>
                                <td><button class = "btn_counter"><FaPlusCircle  color="#92B27A" size = "2.5vw"></FaPlusCircle></button></td>
                                <td><button class = "btn_edit"> <LuPencil  color="#000000" size = "2.5vw" ></LuPencil></button></td>
                            </tr>
                            <tr>
                                <td class = "check"><input type = "checkbox" id="habit" name="habit"></input></td>
                                <td class = "habit" >Exercise 30 mins</td>
                                <td><IoMdFlame id ="flame" color="#e57028" size = "3.5vw"></IoMdFlame></td>
                                <td>3</td>
                                <td class = "amount">30:00</td>
                                <td><button class = "btn_play"><FaCirclePlay  color="#92B27A" size = "2.5vw"></FaCirclePlay></button></td>
                                <td><button class = "btn_edit"> <LuPencil  color="#000000" size = "2.5vw"></LuPencil></button></td>
                            </tr>
                            <tr>
                                <td class = "check"><input type = "checkbox" id="habit" name="habit"></input></td>
                                <td class = "habit" > Make Bed</td>
                                <td><IoMdFlame id ="flame" color="#e57028" size = "3.5vw"></IoMdFlame></td>
                                <td>5</td>
                                <td class = "amount" wi>0/1</td>
                                <td><button class = "btn_counter"><FaPlusCircle  color="#92B27A" size = "2.5vw"></FaPlusCircle></button></td>
                                <td><button class = "btn_edit"> <LuPencil  color="#000000" size = "2.5vw" ></LuPencil></button></td>
                            </tr>
                            <tr>
                                <td class = "check"><input type = "checkbox" id="habit" name="habit"></input></td>
                                <td class = "habit">Study 1 Hour</td>
                                <td><IoMdFlame id ="flame" color="#e57028" size = "3.5vw"></IoMdFlame></td>
                                <td>0</td>
                                <td class = "amount" wi>60:00</td>
                                <td><button class = "btn_play"><FaCirclePlay  color="#92B27A" size = "2.5vw"></FaCirclePlay></button></td>
                                <td><button class = "btn_edit"> <LuPencil  color="#000000" size = "2.5vw"></LuPencil></button></td>
                            </tr>
                            <tr>
                                <td class = "check"><input type = "checkbox" id="habit" name="habit"></input></td>
                                <td class = "habit" >Meditate 10 mins</td>
                                <td><IoMdFlame id ="flame" color="#e57028" size = "3.5vw"></IoMdFlame></td>
                                <td>2</td>
                                <td class = "amount" wi>10:00</td>
                                <td><button class = "btn_play"><FaCirclePlay  color="#92B27A" size = "2.5vw"></FaCirclePlay></button></td>
                                <td><button class = "btn_edit"> <LuPencil  color="#000000" size = "2.5vw"></LuPencil></button></td>
                            </tr>
                            <tr>
                                <td class = "check"><input type = "checkbox" id="habit" name="habit"></input></td>
                                <td class = "habit"> Make Bed</td>
                                <td><IoMdFlame id ="flame" color="#e57028" size = "3.5vw"></IoMdFlame></td>
                                <td>5</td>
                                <td class = "amount">0/1</td>
                                <td><button class = "btn_counter"><FaPlusCircle  color="#92B27A" size = "2.5vw"></FaPlusCircle></button></td>
                                <td><button class = "btn_edit"> <LuPencil  color="#000000" size = "2.5vw" ></LuPencil></button></td>
                            </tr>
                      </table>
                    </div>
              </div>
        </div>
    <div class = "tbl_container2">
        <div id = "div3">
            <table id = "table3">
                <tr>
                    <td><input type = "checkbox" id="todo" name="todo"></input><label for = "todo"> Go for a walk</label></td>
                    <td><button class = "btn_edit2" onClick ={() => setEditToDo(true)}><LuPencil id ="edit" size="2.5vw"color="#000000"></LuPencil></button></td>
                    <td><button class = "btn_delete"><IoTrashOutline id ="delete" size="2.5vw" color="#000000"></IoTrashOutline></button></td>
                </tr>
                <tr>
                    <td><input type = "checkbox" id="todo" name="todo"></input><label for = "todo"> Call Mom</label></td>
                    <td><button class = "btn_edit2"><LuPencil id ="edit" size="2.5vw"color="#000000"></LuPencil></button></td>
                    <td><button class = "btn_delete"><IoTrashOutline id ="delete" size="2.5vw" color="#000000"></IoTrashOutline></button></td>
                </tr>
                <tr>
                    <td><input type = "checkbox" id="todo" name="todo"></input><label for = "todo"> Respond to work emails</label></td>
                    <td><button class = "btn_edit2"><LuPencil id ="edit" size="2.5vw"color="#000000"></LuPencil></button></td>
                    <td><button class = "btn_delete"><IoTrashOutline id ="delete" size="2.5vw" color="#000000"></IoTrashOutline></button></td>
                </tr>
                <tr>
                    <td><input type = "checkbox" id="todo" name="todo"></input><label for = "todo"> Bake banana bread</label></td>
                    <td><button class = "btn_edit2"><LuPencil id ="edit" size="2.5vw"color="#000000"></LuPencil></button></td>
                    <td><button class = "btn_delete"><IoTrashOutline id ="delete" size="2.5vw" color="#000000"></IoTrashOutline></button></td>
                </tr>
                <tr>
                    <td><input type = "checkbox" id="todo" name="todo"></input><label for = "todo"> Clean bathroom</label></td>
                    <td><button class = "btn_edit2"><LuPencil id ="edit" size="2.5vw"color="#000000"></LuPencil></button></td>
                    <td><button class = "btn_delete"><IoTrashOutline id ="delete" size="2.5vw" color="#000000"></IoTrashOutline></button></td>
                </tr>
            </table>
        </div>
        <div class="TODO_bar">
        <input class="type-new" placeholder="Type new to do item here"type="text"/>
        <button class="plus" onClick ={() => setNewToDoPopup(true)}>< FaPlus size = "2vw"></FaPlus></button>
        </div>
    </div>

      <div class="my-habits">My Habits</div>
      <div class="to-do-list">To Do List</div>

      <div class = "date_container">
        <div class="january">January</div>
        <div class="calendar_container">
        <div class="calendar"><FaRegCalendar color="#000000" size = "3.5vw"></FaRegCalendar>
        <button class="calendar_button">29</button></div>
        </div>
        <button class="Up">^</button>
        <button class="Down">^</button>
      </div>
    </div>
    <NewHabit trigger ={buttonPopup} setTrigger = {setButtonPopup}/>
    <NewToDo trigger = {newToDoPopup} setTrigger = {setNewToDoPopup}/>
    <EditHabit trigger ={editHabitPopup} setTrigger = {setEditHabitPopup}/>
    <EditToDo trigger ={editToDo} setTrigger = {setEditToDo}/>
</body>

    );
 };
export default Dailies;

