import React, { useEffect, useState } from "react";
import "./dailies.css";
import { FaCog } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import HabitItem from "./HabitItem";
import TodoItem from "./TodoItem";
import { useNavigate } from "react-router-dom";
import NewToDoPopup from "./NewTodoPopup";
import HabitManager from "./HabitManager";
import {apiRequest} from "../../utils/reqTool"

function Dailies(props){

  let navigate = useNavigate()

  //states:
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const[newToDoPopup,setNewToDoPopup] = useState(false);
  const[habitManager,setHabitManager] = useState(false);
  const[habits, setHabits] = useState();
  const[todos, setTodos] = useState();
  const toast = props.toast;
  const [userToken, setUserToken] = useState(props.user.userToken);

  //check if the user is signed in
  function isSignIn(){
    console.log("check signin")
    if(!sessionStorage.getItem("userToken")){
        navigate("/signin")
        return false;
    }
    return true;
  }

  const triggerDataRefresh = () => {
    setUpdateTrigger(currentValue => currentValue + 1);
  };

//get habits list from backend
function getHabits(){
    apiRequest("GET", `habit/getHabits?user_id=${sessionStorage.getItem("userId")}`)
    .then(res => {
        console.log(res);
        setHabits(res);
    })
    .catch(err => {
        console.log(err);
        toast.error(err.error);
    })
}

//get todo list from backend
function getTodos(){
  console.log("get todos in the front-end")
    apiRequest("GET", `todo/getTodos?user_id=${sessionStorage.getItem("userId")}`)
    .then(res => {
        console.log(res);
        setTodos(res);
    })
    .catch(err => {
        console.log(err);
        toast.error(err.error);
    })
}

function createTodo(data){
        console.log(data)
        data.Date = new Date(data.Date);
        apiRequest("POST", "todo/createTodo", data)
        .then(({token, ...data}) => {
            console.log(data);
            toast.success("create a new todo!")
            triggerDataRefresh()
        })
        .catch(err => {
            console.log(err);
            toast.error(err.error);
        })
}

//hook that updates the state
useEffect(() => {
  if(isSignIn()){
    getTodos();
    getHabits();
  }
  else{
    navigate("/signin")
  }
}, [updateTrigger, userToken])

  return (
  <body>
    <div className="dailies-page">
      <div className = "tbl_container1">
            <div className = "tbl_container">
                    <div id = "div1">
                    <table id = "table1">
                      <tr>
                      <td width = "50%">Habit</td>
                      <td width = "22.5%">Streak</td>
                      <td width = "22.5%">Goal</td>
                      <td width = "5%"><button onClick={() => setHabitManager(true)} className = "btn_cog"><FaCog id = "cog" size = "2.5vw"></FaCog></button></td>
                      </tr>
                      </table>
                    </div>
                    <div id ="div2">
                        <table id = "table2">
                            {habits && habits.map((item) => (
                                <HabitItem
                                    key={item._id}
                                    data = {item}
                                    toast = {toast}
                                >
                                </HabitItem>
                            ))}
                            
                      </table>
                    </div>
              </div>
        </div>
    <div className = "tbl_container2">
        <div id = "div3">
          <table id = "table3">
            {todos && todos.map((item => (
                <TodoItem
                    key={item._id}
                    data={item}
                    isUpdated={() => triggerDataRefresh()}
                    toast = {toast}
                >
                </TodoItem>
            )))}
            
        </table>
        
        </div>
        <div className="TODO_bar">
        <input className="type-new" placeholder="Type new to do item here" type="text"/>
        <button className="plus" onClick ={() => setNewToDoPopup(true)} >< FaPlus size = "2vw"></FaPlus></button>
        </div>
    </div>
      <div className="my-habits">My Habits</div>
      <div className="to-do-list">To Do List</div>
      <div className = "date_container">
      <div className="january">January</div>
      <div className="calendar_container">
        <div className="calendar"><FaRegCalendar color="#000000" size = "3.5vw"></FaRegCalendar>
        <button className="calendar_button">29</button></div>
    </div>
      <button className="Up">^</button>
      <button className="Down">^</button>
      </div>
              
      <NewToDoPopup toast = {toast} trigger = {newToDoPopup} setTrigger = {setNewToDoPopup} isUpdated={() => triggerDataRefresh()} createTodo={(data) => createTodo(data)}/>
      <HabitManager toast = {toast} trigger = {habitManager} setTrigger = {setHabitManager} isUpdated={() => triggerDataRefresh()} habits={habits}></HabitManager>
    </div>
</body>
    );
 };
export default Dailies;

