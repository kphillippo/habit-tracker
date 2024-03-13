import React, { Component } from "react";
import "./dailies.css";
import { FaCalendar, FaCog } from "react-icons/fa";
import { IoMdFlame } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { FaPlusCircle } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegCalendar } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

export default class HabitItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            Title:props.data.Title,
            Streak:props.data.Streak,
            MeasurementType: props.data.MeasurementType,
            Goal: props.data.Goal,
            Current: 0
        }

        this.handleGoalBtnClick = this.handleGoalBtnClick.bind(this);
    }

    handleGoalBtnClick(){
        this.setState({
            Current: this.state.Current + 1
        })
        if(this.state.Current === this.state.Goal){
            //todo: send a POST request to update habit
        }
        
    }

    render(){
        console.log(this.state)
        return(
            <tr>
            <td class = "check"width = "5%"><input type = "checkbox" id="habit" name="habit"></input></td>
            <td class = "habit" width = "53%"> {this.state.Title}</td>
            <td width = "2%"><IoMdFlame id ="flame" color="#e57028" size = "3.5vw"></IoMdFlame></td>
            <td width = "12.5%">{this.state.Streak}</td>
            <td class = "amount" width = "20.5%">{this.state.Current}/{this.state.Goal}{this.state.MeasurementType === 2 && ":00"}</td>
            <td width = "2%"><button class = "btn_counter" onClick={this.handleGoalBtnClick}><FaPlusCircle  color="#92B27A" size = "2.5vw"></FaPlusCircle></button></td>
            <td width = "7%"><button class = "btn_edit"> <LuPencil  color="#000000" size = "2.5vw" ></LuPencil></button></td>
        </tr>
        )
        
    }
}