import "./Settings.css";
import React,{useState} from "react";

function DiscardPopup(props){ 

    return (props.trigger) ? ( 

        <div className="delete_popup"> 

            <div className= "delete_popup-inner"> 

                <div class = "delete_Title">Are you Sure you want to Discard</div>
                <div class = "delete_Title2">any unsaved changes?</div> 

                <div><button class = "delete_no" onClick={() => props.setTrigger(false)}>Cancel</button></div>
                <div><button class = "delete_yes">Yes</button></div>

                {props.children} 

            </div> 

        </div>  

    ) : ""; 

} 

function Settings(){
    const[buttonPopup,setButtonPopup] = useState(false);

    return (
        <body>
    <div class = "setting_container">
       <div class = "button_container">
       <button class = "save">Save</button>
       <button class = "discard" onClick ={() => setButtonPopup(true)}>Discard</button>
       </div> 
       <div class = "privacy_container">
           <div class = "Privacy">Privacy</div>
           <div class = "privacy_inner">
               <div class = "row1">
                   <div class = "friends_profile">Display profile info to friends</div>
                   <div class = "toggle">
                    <label class="switch">
                        <input type="checkbox"></input>
                        <span class="slider"></span>
                    </label>
                   </div>
               </div>
               <div class = "row2">
                   <div class = "display_name">Display name</div>
                   <div class = "toggle">
                    <label class="switch">
                        <input type="checkbox"></input>
                        <span class="slider"></span>
                    </label>
                   </div>
               </div>
               <div class = "row3">
                   <div class = "display_email">Display email</div>
                   <div class = "toggle">
                    <label class="switch">
                        <input type="checkbox"></input>
                        <span class="slider"></span>
                    </label>
                   </div>
               </div>
               <div class = "row4">
                   <div class = "display_photo">Display photo</div>
                   <div class = "toggle">
                    <label class="switch">
                        <input type="checkbox"></input>
                        <span class="slider"></span>
                    </label>
                   </div>
               </div>
               <div class = "row5">
                   <div class = "display_streaks">Display streaks</div>
                   <div class = "toggle">
                    <label class="switch">
                        <input type="checkbox"></input>
                        <span class="slider"></span>
                    </label>
                   </div>
               </div>
               <div class = "row6">
                   <div class = "display_stats">Display stats</div>
                   <div class = "toggle">
                    <label class="switch">
                        <input type="checkbox"></input>
                        <span class="slider"></span>
                    </label>
                   </div>
               </div>
           </div>
       </div>
       <div class = "notifications_container">
           <div class = "Notifications">Notifications</div>
           <div class = "notification_inner">
               <div class = "notifications_row1">
                   <div class = "email_notifications">Allow notifications via email</div>
                   <div class = "toggle">
                    <label class="switch">
                        <input type="checkbox"></input>
                        <span class="slider"></span>
                    </label>
                   </div>
               </div>
               <div class = "notifications_row2">
                   <div class = "allow_emails">Allow emails:</div>
               </div>
               <div class = "notifications_row3">
                    <div class = "part1">
                    <div class = "habit_reminders">Habit Reminders:</div>
                    <div class = "check1"><input type = "checkbox" class = "email_noti_check"></input></div>
                    </div>
                    <div class = "part2">
                    <div class = "todo_reminders">Todo Reminders:</div>
                    <div class = "check2"><input type = "checkbox" class = "email_noti_check"></input></div>
                    </div>
                    <div class = "part3">
                    <div class = "friend_requests">Friend requests: </div>
                    <div class = "check3"><input type = "checkbox" class = "email_noti_check"></input></div>
                    </div>
                    <div class = "part4">
                    <div class = "group_challenges_announcements">Group challenges announcment:</div>
                    <div class = "check4"><input type = "checkbox" class = "email_noti_check"></input></div>
                    </div>
               </div>
           </div>
       </div>
       <div class = "style_container">
        <div class ="style_title">Style Customization and Accessibility</div>
        <div class = "style_inner">
            <div class = "style_row1">
                <div class = "main_color">Main color</div>
                <div class = "color_container">
                    <button class = "green"></button>
                    <button class = "blue"></button>
                    <button class = "purple"></button>
                </div>
            </div>
            <div class = "style_row2">
                <div class = "font_size">Font size</div>
                <div class = "drop_down_div">
                    <select class="drop_down">
                        <option value = "Large">Large</option>
                        <option value = "Medium" selected = "selected">Medium</option>
                        <option value = "Small">Small</option>
                    </select>
                </div>
            </div>
        </div>
       </div>
   </div>
   <DiscardPopup trigger ={buttonPopup} setTrigger = {setButtonPopup}/>
</body>
    );
 };
export default Settings;

