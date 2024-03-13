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
import HabitItem from "./HabitItem";
import TodoItem from "./TodoItem";
import mockHabits from "../../mock/habits.json";
import mockTodos from "../../mock/todos.json"

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
                            {mockHabits.map((item) => (
                                <HabitItem
                                    key={item.id}
                                    data = {item}
                                >
                                </HabitItem>
                            ))}
                            
                      </table>
                    </div>
              </div>
        </div>
    <div class = "tbl_container2">
        <div id = "div3">
          <table id = "table3">
            {mockTodos.map((item => (
                <TodoItem
                    key={item.id}
                    data={item}
                >
                </TodoItem>
            )))}
            
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

