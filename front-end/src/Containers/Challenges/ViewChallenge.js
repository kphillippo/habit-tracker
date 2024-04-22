import React, { Component } from 'react';
import { apiRequest } from '../../utils/reqTool';
import { IoMdFlame } from "react-icons/io";
import '../../Css/viewChallenge.css';

class ViewChallenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: props.trigger,
            Title:props.data.Title,
            Streak: props.data.Streak,
            Goal: props.data.Goal,
            Status: false,
            MeasurementType: "1",
            UserID: sessionStorage.getItem("userId"),
            ChallengeID: props.data.ChallengeID,
            Owner: props.data.Owner,
            Members: props.data.Members
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
            this.props.updateChallenge(this.state)
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

    generateViewChallenge(){
        let joined;
        let memberList = [];
        for(let i=0; i<this.state.Members.length; i++){

            memberList[i] = (
                <tr key = {i}>
                    <td width={"10%"}></td>
                    <td width="70%" id="challenge" > {this.state.Members[i]} </td>
                    <td width="20%"><IoMdFlame color='#e57028'></IoMdFlame>  {this.state.Streak[i]}</td>
                </tr>
            )
        }
        const { trigger, Title, Owner, Goal} = this.state;
        return trigger ? <>
            <div className='views'>
                    <div className='viewTop'>
                        <span>View Challenge</span> 
                        <button className='viewClose'>&times</button>
                        <div className='inp'>
                            Name:
                            <span className='value'>{Title}</span>
                        </div>
                        <div className='inp'>
                            Timer:
                            <span className='value'>{Goal}</span>
                        </div>
                        <div className='inp'>
                            Creator:
                            <span className='value'>{Owner}</span>
                        </div>
                    </div>   
                    <div className="Lcontent">
                        <table id="Table">
                            <tbody id="TableBody">
                                {memberList}
                            </tbody>
                        </table>
                    </div>    
                    <button class = "newhabit_close" onClick={() => this.props.setTrigger(false)}>X</button>
            </div>
        </> : null;
    };

    render(){
        return (
            <body className='views'>
                {this.generateViewChallenge()}
            </body>
        );
       }
}

export default ViewChallenge;