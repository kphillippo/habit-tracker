import React, { Component } from 'react';

class EditHabitPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: props.trigger,
            Title:props.data.Title,
            Streak:0,
            Goal: props.data.Goal,
            Status: false,
            MeasurementType: "1",
            UserID: sessionStorage.getItem("userId"),
            HabitID: props.data.HabitID
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleSave(){
        if(!this.state.Title || !this.state.Goal){
            this.props.toast.error("All fields are required!")
        }
        else if(this.state.Title.length >= 20){
            this.props.toast.error("The name is too long!")
        }
        else{
            this.props.updateHabit(this.state)
            this.props.setTrigger(false)
        }

    }

    handleChange= (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleOptionChange(event) {
        this.setState({
            MeasurementType: event.target.value,
        });
    }

    render() {
        const { trigger, Title, Streak, Goal} = this.state;
        console.log(this.props)
        return trigger ? (
            <div className="newhabit_popup">
                <div className= "edithabit_popup-inner">
                    <div class = "newhabit_Title">Edit {Title}</div>
                    <div class = "newhabit_columns">
                        <label class = "newhabit_name_label" for = "name_input">Name:</label>
                        <div class="timer_input_wrapper">
                        <input id = "newhabit_name_input" type="text" name="Title" onChange={this.handleChange} value={Title}></input>
                        </div>


                        <label class = "newhabit_name_label" for="newhabit_timer_input">Timer:</label>
                        <div class="timer_input_wrapper">
                            <input id="newhabit_timer_input" type="number" name="Goal" value={Goal} disabled={this.state.MeasurementType !== "1"} onChange={this.handleChange}/>
                            <span>(s)</span>
                            <input type="radio" id="timerOption" name="MeasurementType" value="1" onChange={this.handleOptionChange} checked={this.state.MeasurementType === "1"} />
                        </div>
                            
                        <label class = "newhabit_name_label" for="newhabit_counter_input">Counter:</label>
                        <div class="timer_input_wrapper">
                                
                            <input id="newhabit_counter_input" type="number" name="Goal" value={Goal} disabled={this.state.MeasurementType !== "2"} onChange={this.handleChange}/>
                            <input type="radio" id="counterOption" name="MeasurementType" value="2" onChange={this.handleOptionChange} checked={this.state.MeasurementType === "2"} />
                        </div>

                            
                        <label class = "newhabit_frequency_label"for = "frequency_input">Current Streak:</label>
                        <div class="timer_input_wrapper">
                            {Streak}
                        </div>
                            
                        
                    </div>
                        <button class = "newhabit_close" onClick={() => this.props.setTrigger(false)}>X</button>
                        <button class = "newhabit_savesubmit" onClick={() => this.handleSave()}>Save & Close</button>
                   
                </div>
            </div> 
        ) : null;
    }
}

export default EditHabitPopup;