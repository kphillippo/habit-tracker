import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"

function Journal(props){
    
    let navigate = useNavigate()
    const [selectedDate, setSelectedDate] = useState(null);

    function isSignIn(){
        if(!props.user.userToken){
            navigate("/signin")
        }
    }


    useEffect(() => {
        isSignIn();
    })
    
    return(
        <div className="main-container">journal test
         <DatePicker 
            selected={selectedDate} 
            onChange={date => setSelectedDate(date)} 
            dateFormat="dd/MM/yyyy"
            isClearable
            showYearDropdown
            scrollableMonthYearDropdown
        />

        </div>
    );
}
export default Journal;