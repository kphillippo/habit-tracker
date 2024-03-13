import React, { Component } from 'react';

class EditHabitPopup extends Component {
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
        this.props.updateHabit(this.state)
    }

    handleChange= (event) => {
        const { name, value } = event.target;
        console.log(name)
        console.log(value)
        this.setState({
            [name]: value
        });
    }

    render() {
        const { trigger } = this.state;
        
        return trigger ? (
            <div className="edithabit_popup">
            <div className= "edithabit_popup-inner">
                <div className = "edithabit_Title">Edit My Habit</div>
                <div className = "edithabit_columns">
                    <label className = "edithabit_name_label" for = "edithabit_name_input">Name:</label>
                    <input id = "edithabit_name_input" type="text"></input>
                    
                    <label className = "edithabit_timer_label"for = "edithabit_timer_input">Timer:</label>
                    <input id = "edithabit_timer_input" type="text"></input>

                    <label className = "edithabit_counter_label"for = "edithabit_counter_input">Counter:</label>
                    <input id = "edithabit_counter_input" type="text"></input>
                    
                    <label className = "edithabit_frequency_label"for = "edithabit_frequency_input">Frequency:</label>

                    <select id = "edithabit_frequency_input">
                        <option value = "Daily">Every Day</option>
                        <option value = "Weekly">Every Week</option>
                        <option value = "Monthly">Every Month</option>
                    </select>
                </div>
                    <div className = "edithabit_currentstr">Current Streak:</div>
                    <button className = "edithabit_close" onClick={() => edithabit.setTrigger(false)}>X</button>
                    <button className = "edithabit_savesubmit" >Save & Close</button>
                {edithabit.children}
            </div>
        </div> 
        ) : null;
    }
}

export default EditHabitPopup;