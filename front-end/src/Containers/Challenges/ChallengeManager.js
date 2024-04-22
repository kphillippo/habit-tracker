import React, { Component } from 'react';

import ChallengeManagerItem from './ChallengeManagerItem';
import NewChallengePopup from './NewChallengePopup'
import {apiRequest} from "../../utils/reqTool"
import toast, { Toaster } from 'react-hot-toast';

class ChallengeManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: false,
            newChallenge: false,
            challenges: props.challenges
        };
        this.toggleNewChallenge = this.toggleNewChallenge.bind(this);
        this.createChallenge = this.createChallenge.bind(this);
    }

    //trigger for new habit popup
    toggleNewChallenge = () => {
        this.setState(prevState => ({ newChallenge: !prevState.newChallenge }));
    }

    createChallenge(data){
        data.Goal = Number(data.Goal);
        // console.log(data)
        
        apiRequest("POST", "groupHabit/createGroupHabit", data)
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
        if (prevProps.challenges!== this.props.challenges ) {
            // Perform the state update based on the new props
            this.setState({
                challenges: this.props.challenges
            });
        }
    }

    render() {
        const { trigger, newChallenge } = this.state;
        
        return trigger ? (
            <>
            <div className="habitmanager_popup">
            
            <div className= "habitmanager_popup-inner">
                
                <div class = "habitmanager_Title">Challenge Manager</div>
                <div class = "habitmanager_div">
                <table id = "habitmanager_table">
                        {this.state.challenges.map((item) => (
                                <ChallengeManagerItem
                                    key={item.challengeID}
                                    data = {item}
                                    isUpdated={() => this.props.isUpdated()}
                                    toast = {this.props.toast}
                                >
                                </ChallengeManagerItem>
                            ))}
                            
                </table>
                </div>
                    <button class = "habitmanager_close" onClick={() => this.props.setTrigger(false)}>X</button>
                    <button class = "habitmanager_Add_New_Habit" onClick={this.toggleNewChallenge}>Add New Challenge</button>
            </div>
        </div>
        {newChallenge && <NewChallengePopup toast = {this.props.toast} data={this.state} trigger={newChallenge} setTrigger={this.toggleNewChallenge} createChallenge={this.createChallenge} />}
        </>
        ) : null;
    }
}

export default ChallengeManager;