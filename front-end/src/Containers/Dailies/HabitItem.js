import React, { Component } from "react";
import "./dailies.css";
import { IoMdFlame } from "react-icons/io";

import { FaPlusCircle } from "react-icons/fa";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";

export default class HabitItem extends Component {
    constructor(props){
        super(props);
        this.TimerID = null;
        this.state = {
            Title:props.data.Title,
            Streak:props.data.Streak,
            MeasurementType: props.data.MeasurementType,
            Goal: props.data.Goal,
            Current: 0,
            Status: false,
            editHabit: false,
            Disable: false,
            Date: new Date(),
            Timer: false
        }
        this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
        this.handleGoalBtnClick = this.handleGoalBtnClick.bind(this);
    }

    handleGoalBtnClick(){
        if(this.state.MeasurementType === 2){
            this.setState({
                Current: this.state.Current + 1
            })
            if(this.state.Current === this.state.Goal-1){
                this.setState({Status: true, Streak: this.state.Streak + 1, Disable: true})
                //todo: send a POST request to update habit
            }
        }
        else if(this.state.MeasurementType === 1){
            if(this.state.Timer === false){
                if (this.timerID !== null) clearInterval(this.timerID);
                this.setState({Timer: true})
                this.TimerID  = setInterval(() => {
                    if(this.state.Current === this.state.Goal){
                        this.setState({Status: true, Streak: this.state.Streak + 1, Disable: true});
                        this.handlePauseBtnClick(this.TimerID);
                    }
                    this.setState({Current: this.state.Current+1});
                        
                }, 1000);
            }
            else{
                this.handlePauseBtnClick(this.TimerID);
                this.setState({Timer: false})
            }
            
        }
        
        
    }

    handlePauseBtnClick(timerID){
        clearInterval(timerID);
    }

    
    handleCheckBoxClick(event){
        this.setState({ Status: event.target.checked, Streak: this.state.Streak + 1, Disable: true });
        //todo: send POST request to check-in the habit
    }

    componentWillUnmount() {
        if (this.timerID) clearInterval(this.timerID);
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
        console.log(this.props);
        const { Status, Title, editHabit, MeasurementType, Goal, Current} = this.state;
        const deletedStyle = Status ? { textDecoration: 'line-through' } : {};
        const flameColor = Status?"#e57028":"#c0c6b7";
        const fontColor = Status?"#000000":"#c0c6b7";
        const goal = MeasurementType === 2?Goal:`${Goal<60?0:Math.floor(Goal/60)}:${Goal%60<10?0:""}${Goal%60}`
        let current = MeasurementType === 2?Current:`${Current<60?0:Math.floor(Current/60)}:${Current%60<10?0:""}${Current%60}`
        return(
            <tr>
            <td className = "check"width = "5%"><input type = "checkbox" id="habit" name="habit" onClick={this.handleCheckBoxClick} disabled={this.state.Disable} checked={this.state.Status}></input></td>
            <td className = "habit" width = "53%" style={deletedStyle}> {Title}</td>
            <td width = "2%"><IoMdFlame id ="flame" color={flameColor} size = "3.5vw"></IoMdFlame></td>
            <td width = "12.5%" style={{ color: fontColor }}>{this.state.Streak}</td>
            <td className = "amount" width = "20.5%">{current}/{goal}</td>
            <td width = "2%">
                <button className = "btn_counter" onClick={this.handleGoalBtnClick}>
                    {this.state.MeasurementType === 2 && <FaPlusCircle  color="#92B27A" size = "2.5vw"></FaPlusCircle>}
                    {this.state.MeasurementType === 1 && !this.state.Timer && <FaCirclePlay  color="#92B27A" size = "2.5vw"></FaCirclePlay>}
                    {this.state.MeasurementType === 1 && this.state.Timer && <FaCirclePause  color="#92B27A" size = "2.5vw"></FaCirclePause>}
                </button>
            </td>
            <td width = "7%"></td>
        </tr>
        )
        
    }
}