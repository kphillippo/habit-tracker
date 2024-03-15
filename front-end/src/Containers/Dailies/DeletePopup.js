import React, { Component } from 'react';

class DeletePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: props.trigger,
        };

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
            <div class ="delete_popup"> 

                <div className= "delete_popup-inner"> 

                    <div class = "delete_Title">Are you sure you want to <b>delete</b> this item?</div> 

                    <button class = "delete_no" 
                        onClick={() => {this.props.deleteHabit(false);this.props.setTrigger(false)}}
                    >
                        No
                    </button> 

                    <button class = "delete_yes" 
                        onClick={() => {this.props.deleteHabit(true);this.props.setTrigger(false)}}
                    >
                        Yes
                    </button> 

                </div> 
            </div> 
        ) : null;
    }
}

export default DeletePopup;
















