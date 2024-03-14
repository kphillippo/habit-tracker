import React, { Component } from 'react';

class EditHabitPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: props.trigger,
            Title: props.data.Title,
            Frequency: props.data.Frequency,
            Goal: props.data.Goal,
            Streak: props.data.Streak,
            MeasurementType: props.data.MeasurementType,
            PrivacyType: props.data.PrivacyType
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
        const { trigger, Title, Streak } = this.state;
        
        return trigger ? (
            <div className="edithabit_popup">
                <div className= "edithabit_popup-inner">
                    <div class = "edithabit_Title">Edit {Title}</div>
                    <div class = "edithabit_columns">
                        <label class = "edithabit_name_label" for = "edithabit_name_input">Name:</label>
                        <input  id = "edithabit_name_input" 
                                type="text"
                                value={this.state.Title}
                        ></input>

                        <label class = "edithabit_timer_label"for = "edithabit_timer_input">Timer:</label>
                        <input id = "edithabit_timer_input" type="text"></input>

                        <label class = "edithabit_counter_label"for = "edithabit_counter_input">Counter:</label>
                        <input id = "edithabit_counter_input" type="text"></input>
                        
                        <label class = "edithabit_frequency_label"for = "edithabit_frequency_input">Frequency:</label>
                        <select id = "edithabit_frequency_input">
                            <option value = "Daily">Every Day</option>
                            <option value = "Weekly">Every Week</option>
                            <option value = "Monthly">Every Month</option>
                        </select>
                    </div>
                        <div class = "edithabit_currentstr">Current Streak: {Streak}</div>
                        <button class = "edithabit_close" onClick={() => this.props.setTrigger(false)}>X</button>
                        <button class = "edithabit_savesubmit" >Save & Close</button>
                </div>
            </div> 
        ) : null;
    }
}

export default EditHabitPopup;