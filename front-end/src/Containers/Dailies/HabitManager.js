import React, { Component } from 'react';

import HabitManagerItem from './HabitManagerItem';
import NewHabitPopup from './NewHabitPopup';
import {apiRequest} from "../../utils/reqTool"
import toast, { Toaster } from 'react-hot-toast';

class HabitManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: false,
            newHabit: false,
            habits: props.habits
        };
        this.toggleNewHabit = this.toggleNewHabit.bind(this);
        this.createHabit = this.createHabit.bind(this);
    }

    //trigger for new habit popup
    toggleNewHabit = () => {
        this.setState(prevState => ({ newHabit: !prevState.newHabit }));
    }

    createHabit(data){
        data.Goal = Number(data.Goal);
        // console.log(data)
        
        apiRequest("POST", "habit/createHabit", data)
        .then(({token, ...data}) => {
            console.log(data);
            this.props.isUpdated();
            this.props.toast.success("A habit is created!")
        })
        .catch(err => {
            console.log(err);
            this.props.toast.error(err.error);
        })
    }


    //hook in the react
    //it will be called everytime the component/state in the component is updated
    //api from react
    componentDidUpdate(prevProps) {
    // Only update state if the trigger prop has changed
        if (prevProps.trigger !== this.props.trigger) {
                this.setState({ 
                    trigger: this.props.trigger,
                });
            }
        if (prevProps.habits!== this.props.habits ) {
            // Perform the state update based on the new props
            this.setState({
                habits: this.props.habits
            });
        }
    }

    render() {
        const { trigger, newHabit } = this.state;
        
        return trigger ? (
            <>
            <div className="habitmanager_popup">
            
            <div className= "habitmanager_popup-inner">
                
                <div class = "habitmanager_Title">Habit Manager</div>
                <div class = "habitmanager_div">
                <table id = "habitmanager_table">
                        {this.state.habits.map((item) => (
                                <HabitManagerItem
                                    key={item.habitID}
                                    data = {item}
                                    isUpdated={() => this.props.isUpdated()}
                                    toast = {this.props.toast}
                                >
                                </HabitManagerItem>
                            ))}
                            
                </table>
                </div>
                    <button class = "habitmanager_close" onClick={() => this.props.setTrigger(false)}>X</button>
                    <button class = "habitmanager_Add_New_Habit" onClick={this.toggleNewHabit}>Add New Habit</button>
            </div>
        </div>
        {newHabit && <NewHabitPopup toast = {this.props.toast} data={this.state} trigger={newHabit} setTrigger={this.toggleNewHabit} createHabit={this.createHabit} />}
        </>
        ) : null;
    }
}

export default HabitManager;