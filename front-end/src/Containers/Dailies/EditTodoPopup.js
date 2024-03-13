import React, { Component } from 'react';

class EditToDoPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: false
        };
    }

    render() {
        const { trigger } = this.state;
        
        return trigger ? (
            <div className="edittodo_popup">
                <div className="edittodo_popup-inner">
                    <div className="edittodo_Title">Edit My To Do</div>
                    <div className="edittodo_columns">
                        <label className="edittodo_name_label" htmlFor="edittodo_name_input">Name:</label>
                        <input id="edittodo_name_input" type="text" />

                        <label className="edittodo_timer_label" htmlFor="edittodo_timer_input">Date:</label>
                        <input id="edittodo_timer_input" type="text" />

                        <label className="edittodo_counter_label" htmlFor="edittodo_counter_input">Repeat:</label>
                        <select id="edittodo_counter_input">
                            <option value="Do not Repeat">Do not Repeat</option>
                            <option value="Notify Me">Notify Me</option>
                        </select>

                        <label className="edittodo_frequency_label" htmlFor="edittodo_frequecny_input">Remind:</label>
                        <select id="edittodo_frequency_input">
                            <option value="Do not Remind">Do not Remind</option>
                            <option value="Remind Me">Remind Me</option>
                        </select>
                        <label className="edittodo_status_label" htmlFor="edittodo_status_input">Status:</label>
                        <select id="edittodo_status_input">
                            <option value="Not Done">Not Done</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <button className="edittodo_close" onClick={() => this.setState({trigger: false})}>X</button>
                    <button className="edittodo_savesubmit" onClick={() => this.setState({trigger: false})}>Save & Close</button>
                </div>
            </div>
        ) : null;
    }
}

export default EditToDoPopup;