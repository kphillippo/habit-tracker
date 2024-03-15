import React, { Component } from "react";
import "./dailies.css";
import { LuPencil } from "react-icons/lu";
import { IoTrashOutline } from "react-icons/io5";
import EditHabitPopup from "./EditHabitPopup";
import {apiRequest} from "../../utils/reqTool"
import DeletePopup from "./DeletePopup";

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
            Owner: sessionStorage.getItem("userId"),
            HabitID: props.data._id,
            habit: props.data,
            deleteHabit: false
        }

        this.toggleDeleteHabit = this.toggleDeleteHabit.bind(this);
        this.toggleEditHabit = this.toggleEditHabit.bind(this);
        this.updateHabit = this.updateHabit.bind(this);
        this.deleteHabit = this.deleteHabit.bind(this)
    }

    toggleDeleteHabit = () => {
        this.setState(prevState => ({ deleteHabit: !prevState.deleteHabit }));
    }

    toggleEditHabit = () => {
        this.setState(prevState => ({ editHabit: !prevState.editHabit }));
    }

    
    updateHabit(data){
        data.Goal = Number(data.Goal);
        console.log(data)
        
        apiRequest("POST", "habit/updateHabit", data)
        .then(() => {
            this.props.isUpdated()
        })
        .catch(err => {
            console.log(err);
            window.alert(err.error);
        })
    }

    deleteHabit(bool){
        if(bool){
            apiRequest("DELETE", `habit/deleteHabit?user_id=${this.state.Owner}&habit_id=${this.state.HabitID}`)
                .then(() => {
                    this.props.isUpdated()
                    this.props.isDeleted()
                })
                .catch(err => {
                    console.log(err);
                    window.alert(err.error);
                })
        }
    }

    componentDidUpdate(prevProps) {
        // Compare the current props with the previous ones
        if (this.props.data !== prevProps.data) {
          // Perform the state update based on the new props
          this.setState({
            Title: this.props.data.Title,
            Streak: this.props.data.Streak,
            MeasurementType: this.props.data.MeasurementType,
            Goal: this.props.data.Goal
          });
        }
      }

    render(){
       
        const { Status, Title, editHabit, deleteHabit} = this.state;

        return(
            <>
                <tr>
                    <td class = "todo_item"> {Title}</td>
                    <td><button onClick={this.toggleEditHabit} class = "managerbtn_edit" > <LuPencil  color="#000000" size = "2.5vw"></LuPencil></button></td>
                    <td><button onClick={this.toggleDeleteHabit} class = "managerbtn_delete"><IoTrashOutline id ="delete" size="2.5vw" color="#000000" ></IoTrashOutline></button></td>
                </tr>
                {editHabit && <EditHabitPopup data={this.state} trigger={editHabit} setTrigger={this.toggleEditHabit} updateHabit={this.updateHabit} />}
                {deleteHabit && <DeletePopup type={"habit"} data={this.state} trigger={deleteHabit} setTrigger={this.toggleDeleteHabit} deleteHabit={this.deleteHabit} />}
            </>
        )
        
    }
}