import React, { Component } from 'react';

class NewHabitPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: props.trigger,
            Title:props.data.Title,
            Streak:props.data.Streak,
            MeasurementType: props.data.MeasurementType,
            Goal: props.data.Goal,
            Current: 0,
            Status: false,
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSave(){
        this.props.updateHabit(this.state)
    }

    handleChange= (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    componentDidUpdate(prevProps) {
    // Only update state if the trigger prop has changed
    if (prevProps.trigger !== this.props.trigger) {
        this.setState({ trigger: this.props.trigger });
    }
}

    render() {
        const { trigger } = this.state;
        
        return trigger ? (
            <div className="newhabit_popup">
                <div className= "newhabit_popup-inner">
                    <div class = "newhabit_Title">Add New Habit</div>
                    <div class = "newhabit_columns">
                        <label class = "newhabit_name_label" for = "name_input">Name:</label>
                        <input id = "newhabit_name_input" type="text"></input>

                        <label class = "newhabit_timer_label"for = "timer_input">Timer:</label>
                        <input id = "newhabit_timer_input" type="text"></input>

                        <label class = "newhabit_counter_label"for = "counter_input">Counter:</label>
                        <input id = "newhabit_counter_input" type="text"></input>
                        
                        <label class = "newhabit_frequency_label"for = "frequency_input">Frequency:</label>
                        <select id = "newhabit_frequency_input">
                            <option value = "Daily">Every Day</option>
                            <option value = "Weekly">Every Week</option>
                            <option value = "Monthly">Every Month</option>
                        </select>
                    </div>
                        <button class = "newhabit_close" onClick={() => this.props.setTrigger(false)}>X</button>
                        <button class = "newhabit_savesubmit" >Save & Close</button>
                   
                </div>
            </div> 
        ) : null;
    }
}

export default NewHabitPopup;