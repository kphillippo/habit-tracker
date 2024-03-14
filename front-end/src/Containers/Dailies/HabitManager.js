import React, { Component } from 'react';

import HabitManagerItem from './HabitManagerItem';
import NewHabitPopup from './NewHabitPopup';


class HabitManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: false,
            newHabit: false
        };
        this.toggleNewHabit = this.toggleNewHabit.bind(this);
    }

    toggleNewHabit = () => {
        this.setState(prevState => ({ newHabit: !prevState.newHabit }));
    }

    createHabit(data){
        console.log(data)
    }


    componentDidUpdate(prevProps) {
    // Only update state if the trigger prop has changed
    if (prevProps.trigger !== this.props.trigger) {
        this.setState({ trigger: this.props.trigger });
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
                        {this.props.habits.map((item) => (
                                <HabitManagerItem
                                    key={item.id}
                                    data = {item}
                                >
                                </HabitManagerItem>
                            ))}
                            
                </table>
                </div>
                    <button class = "habitmanager_close" onClick={() => this.props.setTrigger(false)}>X</button>
                    <button class = "habitmanager_Add_New_Habit" onClick={this.toggleNewHabit}>Add New Habit</button>
            </div>
        </div>
        {newHabit && <NewHabitPopup data={this.state} trigger={newHabit} setTrigger={this.toggleNewHabit} createHabit={this.createHabit} />}
        </>
        ) : null;
    }
}

export default HabitManager;