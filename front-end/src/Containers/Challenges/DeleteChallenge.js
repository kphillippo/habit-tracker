import React, { Component } from 'react';

class DeleteChallenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: props.trigger,
        };
        this.handleYesClick = this.handleYesClick.bind(this);
        this.handleNoClick = this.handleNoClick.bind(this);
    }

    componentDidUpdate(prevProps) {
    // Only update state if the trigger prop has changed
    if (prevProps.trigger !== this.props.trigger) {
        this.setState({ trigger: this.props.trigger });
        }
    }

    //when the user click yes
    handleYesClick(){
        this.props.deleteChallenge(true);
        this.props.setTrigger(false)
    }

    //when the user click yes
    handleNoClick(){
        this.props.deleteChallenge(false);
        this.props.setTrigger(false)
    }

    render() {
        const { trigger } = this.state;
        const temp = "delete_popup-inner-1"
        return trigger ? (
            <div class ="delete_popup"> 

                <div className={temp}> 

                    <div class = "delete_Title">Are you sure you want to <b>delete</b> this Challenge</div> 

                    <button class = "delete_no" 
                        onClick={() => this.handleNoClick()}
                    >
                        No
                    </button> 

                    <button class = "delete_yes" 
                        onClick={() => this.handleYesClick()}
                    >
                        Yes
                    </button> 

                </div> 
            </div> 
        ) : null;
    }
}

export default DeleteChallenge;
















