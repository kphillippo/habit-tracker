import React, { Component } from "react";
import "./dailies.css";
import { IoMdFlame } from "react-icons/io";

import { FaPlusCircle } from "react-icons/fa";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { apiRequest } from "../../utils/reqTool";

export default class HabitItem extends Component {
    constructor(props){
        super(props);
        this.TimerID = null;
        this.state = {
            HabitID: props.data.habitID,
            Title:props.data.Title,
            Streak:props.data.Streak,
            MeasurementType: props.data.MeasurementType,
            Goal: props.data.Goal,
            Count: 0,
            Status: props.data.Status,
            editHabit: false,
            Date: new Date(),
            Timer: false
        }
        this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
        this.handleGoalBtnClick = this.handleGoalBtnClick.bind(this);
    }

    handleGoalBtnClick(){
        if(!this.state.Status){
            if(this.state.MeasurementType === 2){
                this.setState({
                    Count: this.state.Count + 1
                })
                if(this.state.Count === this.state.Goal-1){
                    this.setState({Status: true, Streak: this.state.Streak + 1})
                    //todo: send a POST request to update habit
                    console.log(this.state);
                    apiRequest("POST", "habitCheckIn/updateHabitCheckIn", this.state)
                    .then(({data}) => {
                        console.log(data);
                        this.props.toast.success("You just finished a habit!")
                    })
                    .catch(err => {
                        console.log(err);
                        this.props.toast.error(err.error);
                    })
                }
            }
            else if(this.state.MeasurementType === 1){
                if(this.state.Timer === false){
                    if (this.timerID !== null) clearInterval(this.timerID);
                    this.setState({Timer: true})
                    this.TimerID  = setInterval(() => {
                        if(this.state.Count === this.state.Goal){
                            this.setState({Status: true, Streak: this.state.Streak + 1});
                            this.handlePauseBtnClick(this.TimerID);
                            apiRequest("POST", "habitCheckIn/updateHabitCheckIn", this.state)
                            .then(({token, ...data}) => {
                                console.log(data);
                                this.props.toast.success("You just finished a habit!")
                            })
                            .catch(err => {
                                console.log(err);
                                this.props.toast.error(err.error);
                            })
                        }
                        this.setState({Count: this.state.Count+1});
                            
                    }, 1000);
                }
                else{
                    this.handlePauseBtnClick(this.TimerID);
                    this.setState({Timer: false})
                }
                
            }
        }
        
    }

    handlePauseBtnClick(timerID){
        clearInterval(timerID);
    }

    
    handleCheckBoxClick(event){
        this.setState({ Status: event.target.checked, Streak: this.state.Streak + 1});
        //todo: send POST request to check-in the habit
        console.log(this.state);
        apiRequest("POST", "habitCheckIn/updateHabitCheckIn", this.state)
                    .then(({data}) => {
                        console.log(data);
                        this.props.toast.success("You just finished a habit!");
                    })
                    .catch(err => {
                        console.log(err);
                        this.props.toast.error(err.error);
                    })

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
        console.log(this.props)
        const { Status, Title, editHabit, MeasurementType, Goal, Count} = this.state;
        const deletedStyle = Status ? { textDecoration: 'line-through' } : {};
        const flameColor = Status?"#e57028":"#c0c6b7";
        const fontColor = Status?"#000000":"#c0c6b7";
        const goal = MeasurementType === 2?Goal:`${Goal<60?0:Math.floor(Goal/60)}:${Goal%60<10?0:""}${Goal%60}`
        let count = MeasurementType === 2?Count:`${Count<60?0:Math.floor(Count/60)}:${Count%60<10?0:""}${Count%60}`
        return(
            <tr>
            <td className = "check"width = "5%"><input type = "checkbox" id="habit" name="habit" onClick={this.handleCheckBoxClick} disabled={this.state.Status} checked={this.state.Status}></input></td>
            <td className = "habit" width = "53%" style={deletedStyle}> {Title}</td>
            <td width = "2%"><IoMdFlame id ="flame" color={flameColor} size = "3.5vw"></IoMdFlame></td>
            <td width = "12.5%" style={{ color: fontColor }}>{this.state.Streak}</td>
            <td className = "amount" width = "20.5%">{count}/{goal}</td>
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