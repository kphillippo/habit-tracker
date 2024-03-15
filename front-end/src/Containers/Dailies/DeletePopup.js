import React, { Component } from 'react';

class DeletePopup extends Component {
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

    handleYesClick(){
        if(this.props.type === "habit"){
            this.props.deleteHabit(true);
            this.props.setTrigger(false)
        }
        else if(this.props.type === "todo"){
            this.props.deleteTodo(true);
            this.props.setTrigger(false);
        }
    }


    handleNoClick(){
        if(this.props.type === "habit"){
            this.props.deleteHabit(false);
            this.props.setTrigger(false)
        }
        else if(this.props.type === "todo"){
            this.props.deleteTodo(false);
            this.props.setTrigger(false);
        }
    }

    render() {
        const { trigger } = this.state;
        const temp = (this.props.type === "habit")?"delete_popup-inner-1":"delete_popup-inner-2"
        return trigger ? (
            <div class ="delete_popup"> 

                <div className={temp}> 

                    <div class = "delete_Title">Are you sure you want to <b>delete</b> this {this.props.type === "habit" && "habit"} {this.props.type === "todo" && "todo"}?</div> 

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

export default DeletePopup;
















