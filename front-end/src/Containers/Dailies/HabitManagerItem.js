import React, { Component } from "react";
import "./dailies.css";
import { LuPencil } from "react-icons/lu";
import { IoTrashOutline } from "react-icons/io5";
import EditHabitPopup from "./EditHabitPopup";
import {apiRequest} from "../../utils/reqTool"

export default class HabitManagerItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            Title:props.data.Title,
            Streak:props.data.Streak,
            MeasurementType: props.data.MeasurementType,
            Goal: props.data.Goal,
            Current: 0,
            Status: false,
            editHabit: false,
            Owner: sessionStorage.getItem("userId")
        }
        this.toggleEditHabit = this.toggleEditHabit.bind(this);
        this.updateHabit = this.updateHabit.bind(this);
    }

    toggleEditHabit = () => {
        this.setState(prevState => ({ editHabit: !prevState.editHabit }));
    }

    
    updateHabit(data){
        console.log(data)
        //send a POST request to update Habit
        apiRequest("POST", "habit/update", data)
        .then(({token, ...user}) => {
            console.log(user);
            
        })
        .catch(err => {
            console.log(err);
            window.alert(err.error);
        })
        
    }

    render(){
        const { Status, Title, editHabit} = this.state;
        const deletedStyle = Status ? { textDecoration: 'line-through' } : {};
        const flameColor = Status?"#e57028":"#c0c6b7";
        const fontColor = Status?"#000000":"#c0c6b7";

        return(
            <>
                <tr>
                    <td class = "todo_item"> {Title}</td>
                    <td><button onClick={this.toggleEditHabit} class = "managerbtn_edit" > <LuPencil  color="#000000" size = "2.5vw"></LuPencil></button></td>
                    <td><button class = "managerbtn_delete"><IoTrashOutline id ="delete" size="2.5vw" color="#000000"></IoTrashOutline></button></td>
                </tr>
                {editHabit && <EditHabitPopup data={this.state} trigger={editHabit} setTrigger={this.toggleEditHabit} updateHabit={this.updateHabit} />}
            </>
        )
        
    }
}