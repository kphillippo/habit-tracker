import '../../Css/stats.css';
import React, { useState, useEffect } from "react"; 
import { apiRequest } from "../../utils/reqTool";
import { useNavigate } from "react-router-dom";

function Stats(props){
    let navigate = useNavigate() 

    const [statsInfo, setStatsInfo] = useState(0); 

    const [habitsCompleted, setHabitsCompleted] = useState(0); 

    const getHabitsCompleted = async () => {  


        }; 

        useEffect(() => {

            getHabitsCompleted(); 

        }, []);    

    return (
        <body>
        <div class ="parent">
            <div className={'my-stats'}>
                <div class = "left">
                    <div class = "stats_text">
                    <div class = "stats_title">My Stats:</div>
                    <div class = "stats_quote">“The core advantage of data is that it tells you something 
                    about the world that you didn’t know before.” ~ Hilary Mason</div>
                    </div>
                </div>
                <div className={'quick-insights'}>
                    <div class = "quick_title">My Quick Insights:</div>
                    <div class = "quick_inner">
                        <div class = "longest_streak"><ul></ul><li>Longest streak:</li></div>
                        <div class = "current_streak"><ul></ul><li>Current streak:</li></div>
                        <div class = "total_habits"><ul></ul><li>Total Habits Completed:</li></div>
                        <div class = "total_todo"><ul></ul><li>Total To Do's Completed:</li></div>
                    </div>
                </div>
            </div>
            <div class = "my_analytics">
                <div class = "analytics_title">My Analytics</div>
                <div class = "graphs">
                    <div class = "graph1">
                        <div class = "graph1_title">This Month's Habit Completion</div>
                    </div>
                    <div class = "graph2">
                        <div class = "graph2_title">This Month's To Do Completion</div>
                    </div>
                    <div class = "graph3">
                        <div class = "graph3_title">All-Time Habit Completion</div>
                    </div>
                    <div class = "graph4">
                        <div class = "graph4_title">All-Time To Do Completion</div>
                    </div>
                </div>
            </div>

        </div>
        </body>
    );
}

export default Stats;