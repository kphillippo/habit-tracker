import React, { Component } from 'react';

class EditToDoPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: props.trigger,
            Title: props.data.Title,
            Status: props.data.Status,
            Repeat: props.data.Repeat,
            Remind: props.data.Remind,
            Date: props.data.Date
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSave(){
        this.props.updateTodo(this.state)
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
                    <div className="edittodo_Title">Edit {this.state.Title}</div>
                    <div className="edittodo_columns">
                        <label className="edittodo_name_label" htmlFor="edittodo_name_input">Name:</label>
                        <input  id="edittodo_name_input" 
                                type="text" 
                                name="Title"
                                value={this.state.Title}
                                onChange={this.handleChange}
                        />

                        <label className="edittodo_timer_label" htmlFor="edittodo_timer_input">Date:</label>
                        <input  id="edittodo_timer_input" 
                                type="text" 
                                name="Date"
                                value={this.state.Date}
                                onChange={this.handleChange}
                        />

                        <label className="edittodo_counter_label" htmlFor="edittodo_counter_input">Repeat:</label>
                        <select 
                            id="edittodo_counter_input"
                            type="text"
                            name="Repeat"
                            defaultValue={this.state.Repeat}
                            onChange={this.handleChange}
                            
                        >
                            <option value="Do not Repeat">Do not Repeat</option>
                            <option value="Notify Me">Notify Me</option>
                        </select>

                        <label className="edittodo_frequency_label" htmlFor="edittodo_frequecny_input">Remind:</label>
                        <select id="edittodo_frequency_input"
                                type="text"
                                name="Remind"
                                defaultValue={this.state.Remind}
                                onChange={this.handleChange}
                        >
                            <option value="noRemind">Do not Remind</option>
                            <option value="Remind">Remind Me</option>
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
                    <button className="edittodo_savesubmit" onClick={() => this.handleSave()}>Save & Close</button>
                </div>
            </div>
        ) : null;
    }
}

export default EditToDoPopup;