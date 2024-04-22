import React, { Component } from "react";
import "../Dailies/dailies.css";
import { LuPencil } from "react-icons/lu";
import { IoTrashOutline } from "react-icons/io5";
import EditChallenges from "./EditChallenges";
import {apiRequest} from "../../utils/reqTool"
import DeleteChallenge from "./DeleteChallenge";

export default class ChallengeManagerItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            Title:props.data.Title,
            Streak:props.data.Streak,
            MeasurementType: props.data.MeasurementType,
            Goal: props.data.Goal,
            Current: 0,
            Status: false,
            editChallenge: false,
            Owner: sessionStorage.getItem("userId"),
            ChallengeID: props.data.challengeID,
            challenge: props.data,
            deleteChallenge: false
        }

        this.toggleDeleteChallenge = this.toggleDeleteChallenge.bind(this);
        this.toggleEditChallenge = this.toggleEditChallenge.bind(this);
        this.updateChallenge = this.updateChallenge.bind(this);
        this.deleteChallenge = this.deleteChallenge.bind(this)
    }

    toggleDeleteChallenge = () => {
        this.setState(prevState => ({ deleteChallenge: !prevState.deleteChallenge }));
    }

    toggleEditChallenge = () => {
        this.setState(prevState => ({ editChallenge: !prevState.editChallenge }));
    }

    
    updateChallenge(data){
        data.Goal = Number(data.Goal);

        let info = {
            "GroupHabitID" : this.state.ChallengeID,
            "Title" : this.state.Title,
            "MeasurementType" : this.state.MeasurementType,
            "Goal" : data.Goal
        }
        
        apiRequest("POST", "groupHabit/editGroupHabit", info)
        .then(() => {
            this.props.isUpdated()
            this.props.toast.success("The habit is updated!")
        })
        .catch(err => {
            console.log(err);
            window.alert(err.error);
        })
    }

    deleteChallenge(bool){
        if(bool){
            let info = {
                "GroupHabitID": this.state.ChallengeID
            }
            apiRequest("DELETE", "groupHabit/deleteGroupHabit", info)
                .then(() => {
                    this.props.isUpdated()
                    this.props.toast.success("The habit is deleted!")
                })
                .catch(err => {
                    console.log(err);
                    this.props.toast.error(err.error);
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
       
        const { Status, Title, editChallenge, deleteChallenge} = this.state;

        return(
            <>
                <tr>
                    <td class = "todo_item"> {Title}</td>
                    <td><button onClick={this.toggleEditChallenge} class = "managerbtn_edit" > <LuPencil  color="#000000" size = "2.5vw"></LuPencil></button></td>
                    <td><button onClick={this.toggleDeleteChallenge} class = "managerbtn_delete"><IoTrashOutline id ="delete" size="2.5vw" color="#000000" ></IoTrashOutline></button></td>
                </tr>
                {editChallenge && <EditChallenges toast={this.props.toast} data={this.state} trigger={editChallenge} setTrigger={this.toggleEditChallenge} updateChallenge={this.updateChallenge} />}
                {deleteChallenge && <DeleteChallenge type={"habit"} data={this.state} trigger={deleteChallenge} setTrigger={this.toggleDeleteChallenge} deleteChallenge={this.deleteChallenge} />}
            </>
        )
        
    }
}