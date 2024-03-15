import React, { Component } from "react";
import "./dailies.css";
import { LuPencil } from "react-icons/lu";
import { IoTrashOutline } from "react-icons/io5";
import EditToDoPopup from "./EditTodoPopup.js";
import {apiRequest} from "../../utils/reqTool.js"

export default class TodoItem extends Component {
    constructor(props){
        super(...arguments)
        this.state = {
            todo: props.data,
            Title:props.data.Title,
            Status:false,
            editTodo: false,
            Date:props.data.Date,
            Remind:props.data.Remind,
            Repeat:props.data.Repeat,
            UserId:sessionStorage.getItem("userId"),
            ToDoId:props.data._id
        }
        this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
        this.toggleEditTodo = this.toggleEditTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
    }
    

    handleCheckBoxClick(event){
        this.setState({ Status: event.target.checked });
    }

    toggleEditTodo = () => {
        this.setState(prevState => ({ editTodo: !prevState.editTodo }));
    }

   updateTodo(data){
        data.Date = new Date(data.Date);
        console.log(data)
        apiRequest("POST", `todo/updateTodo`, data)
        .then(() => {
            this.props.isUpdated()
        })
        .catch(err => {
            console.log(err);
            window.alert(err);
        })
      }

      componentDidUpdate(prevProps) {
            if (prevProps.data!== this.props.data ) {
                // Perform the state update based on the new props
                this.setState({
                    Title: this.props.data.Title
                });
            }
        }

    render(){
        const { Status, Title, editTodo } = this.state;
        const deletedStyle = Status ? { textDecoration: 'line-through' } : {};

        return(
            <>
            <tr>
                {this.state.Status === true && <td><input type = "checkbox" id="todo" name="todo" onClick={this.handleCheckBoxClick} defaultChecked></input><label for = "todo" style={deletedStyle}> {this.state.Title}</label></td>}
                {this.state.Status === false && <td><input type = "checkbox" id="todo" name="todo" onClick={this.handleCheckBoxClick}></input><label for = "todo"> {this.state.Title}</label></td>}
                
                <td><button onClick={this.toggleEditTodo} className = "btn_edit2"><LuPencil id ="edit" size="2.5vw"color="#000000"></LuPencil></button></td>
                <td><button className = "btn_delete"><IoTrashOutline id ="delete" size="2.5vw" color="#000000"></IoTrashOutline></button></td>
            </tr>
            {editTodo && <EditToDoPopup data={this.state} trigger={editTodo} setTrigger={this.toggleEditTodo} updateTodo={(data) => this.updateTodo(data)} />}
            </>
        )

        
    }
}