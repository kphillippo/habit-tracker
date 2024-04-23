import '../../Css/stats.css'; 

import React, { useState, useEffect, useRef } from "react";  

import { apiRequest } from "../../utils/reqTool"; 

import { useNavigate } from "react-router-dom"; 

import Chart from 'chart.js/auto'; 

 

function Stats(props){ 

    let navigate = useNavigate()  

    const [habitsCompleted, setHabitsCompleted] = useState(0);  
    const [timesHabit, setTimesHabit] = useState(0); 
    const [quickInsight, setQuickInsight] = useState(0);  
    const [timesCompleted, setTimesCompleted] = useState({}); 
    const chartRef = useRef({ chart: null }); 

    const getTimesCompletedByHour = async () => {    

        try {  
            const response = await apiRequest("GET", "stats/timesCompletedByHour?user_id=" + sessionStorage.getItem("userId"))  
            const data = await response;  
            console.log(data); 
            setTimesCompleted(data);  
        } catch (err) { 
            console.error("Failed to fetch user info:", err);  
        } 
    }; 

    const createGraph = () => { 

        const ctx = document.getElementById('myChart').getContext('2d'); 
        const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`); // Labels for 24-hour time format 
        const data = labels.map(label => timesCompleted[label.split(':')[0]] || 0); // Map data from API response or 0 if not available 

        if (chartRef.current && chartRef.current.chart) { 
            chartRef.current.chart.destroy(); // Destroy previous chart instance 
        } 

        chartRef.current.chart = new Chart(ctx, { 
            type: 'line', 
            data: {
                labels: labels, // X-axis labels 
                datasets: [{ 
                    label: 'Times Completed', 
                    data: data, // Y-axis data 
                    borderColor: 'rgb(75, 192, 192)', 
                    tension: 0.1 
                }] 
            }, 
            options: { 
                scales: { 
                    y: { 
                        beginAtZero: true 
                    } 
                } 
            } 
        }); 
    }; 

    const getTimesHabitCompleted = async () => {    
        try {  
            const response = await apiRequest("GET", "stats/timesHabitCompletedLast30Days?user_id=" + sessionStorage.getItem("userId"))  
            const data = await response;  
            console.log(data); 
            setTimesHabit(data);  
        } catch (err) {  
            console.error("Failed to fetch user info:", err);  
        } 
    };  

    const getQuickInsights = async () => {    
        try {  
            const response = await apiRequest("GET", "stats/quickInsights?user_id=" + sessionStorage.getItem("userId"))  
            const data = await response;  
            console.log(data); 
            setQuickInsight(data);  
        } catch (err) {  
            console.error("Failed to fetch user info:", err);  
        } 
    }; 

    function isSignIn(){
        console.log("check signin")
        if(!sessionStorage.getItem("userToken")){
            navigate("/signin")
            return false;
        }
        return true;
    };

    useEffect(() => {
        if(isSignIn()) {        // If user is signed in, the getFriends
            getTimesCompletedByHour(); 
            getTimesHabitCompleted(); 
            getQuickInsights();
        }
        else{                   // Otherwise go to signin page
            navigate("/signin")
        }
    },[]); 

    useEffect(() => { 
        createGraph(); // Call the function to create the graph when graphData is updated 
    }, [timesCompleted]);    

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
                        <div class = "longest_streak"><ul></ul><li>Longest streak: {quickInsight.LongestStreak}</li></div> 
                        <div class = "current_streak"><ul></ul><li>Current streak: {quickInsight.CurrentStreak}</li></div> 
                        <div class = "total_habits"><ul></ul><li>Total Habits Completed: {quickInsight.TotalHabitCompletions}</li></div> 
                    </div> 
                </div> 
            </div> 
            <div class = "my_analytics"> 
                <div class = "analytics_title">My Analytics</div> 
                <div class = "graphs"> 
                    <div class = "graph1"> 
                        <div class = "graph1_title">Check-In Time of Day this Month</div> 
                        <div class = "chart"><canvas id="myChart"></canvas> </div>
                    </div> 
                </div> 
            </div> 
        </div> 
        </body>
    ); 
} 

 

export default Stats; 