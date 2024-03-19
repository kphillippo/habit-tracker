import React, { Component } from "react";
import "./dailies.css";
import { IoMdFlame } from "react-icons/io";

import { FaPlusCircle } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";

export default class HabitItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            Title:props.data.Title,
            Streak:props.data.Streak,
            MeasurementType: props.data.MeasurementType,
            Goal: props.data.Goal,
            Current: 0,
            Status: false,
            editHabit: false
        }
        this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
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

    
    handleCheckBoxClick(event){
        this.setState({ Status: event.target.checked });
        //todo: send POST request to check-in the habit
    }

    componentDidUpdate(prevProps) {
        // Compare the current props with the previous ones
        if (this.props.data !== prevProps.data) {
          // reset the state based on the new props
          this.setState({
            Title: this.props.data.Title,
            Streak: this.props.data.Streak,
            MeasurementType: this.props.data.MeasurementType,
            Goal: this.props.data.Goal
          });
        }
      }

    render(){
        const { Status, Title, editHabit} = this.state;
        const deletedStyle = Status ? { textDecoration: 'line-through' } : {};
        const flameColor = Status?"#e57028":"#c0c6b7";
        const fontColor = Status?"#000000":"#c0c6b7";
        return(
            <tr>
            <td className = "check"width = "5%"><input type = "checkbox" id="habit" name="habit" onClick={this.handleCheckBoxClick}></input></td>
            <td className = "habit" width = "53%" style={deletedStyle}> {Title}</td>
            <td width = "2%"><IoMdFlame id ="flame" color={flameColor} size = "3.5vw"></IoMdFlame></td>
            <td width = "12.5%" style={{ color: fontColor }}>{this.state.Streak}</td>
            <td className = "amount" width = "20.5%">{this.state.Current}/{this.state.Goal}{this.state.MeasurementType === 1 && ":00"}</td>
            <td width = "2%">
                <button className = "btn_counter" onClick={this.handleGoalBtnClick}>
                    {this.state.MeasurementType === 2 && <FaPlusCircle  color="#92B27A" size = "2.5vw"></FaPlusCircle>}
                    {this.state.MeasurementType === 1 && <FaCirclePlay  color="#92B27A" size = "2.5vw"></FaCirclePlay>}
                </button>
            </td>
            <td width = "7%"></td>
        </tr>
        )
        
    }
}