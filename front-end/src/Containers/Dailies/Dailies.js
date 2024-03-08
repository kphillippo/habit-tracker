import React from "react";
import "./dailies.css";
import { FaCalendar, FaCog } from "react-icons/fa";
import { IoMdFlame } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { FaPlusCircle } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegCalendar } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";


function Dailies(){
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
                      <td width = "5%"><button class = "btn_cog"><FaCog id = "cog" size = "2.5vw"></FaCog></button></td>
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
                                <td class = "amount" width = "20.5%">1/2</td>
                                <td width = "2%"><button class = "btn_counter"><FaPlusCircle  color="#92B27A" size = "2.5vw"></FaPlusCircle></button></td>
                                <td width = "7%"><button class = "btn_edit"> <LuPencil  color="#000000" size = "2.5vw" ></LuPencil></button></td>
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
                <td><button class = "btn_edit2"><LuPencil id ="edit" size="2.5vw"color="#000000"></LuPencil></button></td>
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
        <button class="plus">< FaPlus size = "2vw"></FaPlus></button>
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
</body>
    );
 };
export default Dailies;

