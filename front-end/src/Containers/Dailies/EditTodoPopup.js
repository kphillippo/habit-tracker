import React, { Component } from 'react';
import DatePicker from "react-datepicker"


class EditToDoPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: props.trigger,
            Title: props.data.Title,
            Status: props.data.Status,
            Repeat: props.data.Repeat,
            Remind: props.data.Remind,
            Date: props.data.Date,
            UserId: sessionStorage.getItem("userId"),
            ToDoId:props.data.ToDoId
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSave(){
        if(this.state.Title === ""){
            this.props.toast.error("All fields are required!")
        }
        else{
            this.props.updateTodo(this.state);
            this.props.setTrigger();
        }
    }

    handleChange= (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    

    render() {
        const { trigger } = this.state;
        
        return trigger ? (
            <div className="edittodo_popup">
                <div className="edittodo_popup-inner">
                    <div className="edittodo_Title">Edit {this.props.data.Title}</div>
                    <div className="edittodo_columns">
                        <label className="edittodo_name_label" htmlFor="edittodo_name_input">Name:</label>
                        <input  id="edittodo_name_input" 
                                type="text" 
                                name="Title"
                                value={this.state.Title}
                                onChange={this.handleChange}
                        />

                        <label className="edittodo_timer_label" htmlFor="edittodo_timer_input">Date:</label>
                        <DatePicker 
                            selected={this.state.Date} 
                            onChange={date => this.setState({Date: date})} 
                            dateFormat="dd/MM/yyyy"
                            showYearDropdown
                            scrollableMonthYearDropdown
                        />

                        <label className="edittodo_counter_label" htmlFor="edittodo_counter_input">Repeat:</label>
                        <select 
                            id="edittodo_counter_input"
                            type="text"
                            name="Repeat"
                            defaultValue={this.state.Repeat}
                            onChange={this.handleChange}
                            
                        >
                            <option value="false">Do not Repeat</option>
                            <option value="true">Notify Me</option>
                        </select>

                        <label className="edittodo_frequency_label" htmlFor="edittodo_frequecny_input">Remind:</label>
                        <select id="edittodo_frequency_input"
                                type="text"
                                name="Remind"
                                defaultValue={this.state.Remind}
                                onChange={this.handleChange}
                        >
                            <option value="false">Do not Remind</option>
                            <option value="true">Remind Me</option>
                        </select>
                        <label className="edittodo_status_label" htmlFor="edittodo_status_input">Status:</label>
                        <select id="edittodo_status_input"
                                type="text"
                                name="Status"
                                defaultValue={this.state.Status}
                                onChange={this.handleChange}
                        >
                            <option value="false">Not Done</option>
                            <option value="true">Done</option>
                        </select>
                    </div>
                    <button className="edittodo_close" onClick={() =>  this.props.setTrigger()}>X</button>
                    <button className="edittodo_savesubmit" onClick={() => {this.handleSave();}}>Save & Close</button>
                </div>
            </div>
        ) : null;
    }
}

export default EditToDoPopup;