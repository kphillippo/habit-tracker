import "./Settings.css"; 
import React, { useState, useEffect } from "react"; 
import { apiRequest } from "../../utils/reqTool"; 
import { useRef } from 'react'; 
import { useNavigate } from "react-router-dom";

function Settings({props,toast}) { 

    let navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    //used for discard popup 
  
    const [buttonPopup, setButtonPopup] = useState(false); 
  
    //used to store states of each checkbox when someone presses a checkbox 
  
    const [display,setDisplay] = useState(false); 
    const [displayName,setDisplayName] = useState(false); 
    const [displayEmail,setDisplayEmail] = useState(false); 
    const [displayPhoto,setDisplayPhoto] = useState(false); 
    const [displayStreaks,setDisplayStreaks] = useState(false); 
    const [displayStats,setDisplayStats] = useState(false);
    const [friendRequestEmails,setFriendRequestEmails] = useState(false); 
  
    //gets the setting info which is edited whenever someone clicks a checkbox 
  
    const [settingsInfo, setSettingsInfo] = useState(0);  
  
    //gets the settings which isn't changed in case someone wants to discard changes 
  
    const [defaultSettings, setDefaultSettings] = useState(0);  
  
    //gets the checkboxes to change them back to the previous save  
  
    const checkbox1Ref = useRef(null); 
    const checkbox2Ref = useRef(null); 
    const checkbox3Ref = useRef(null); 
    const checkbox4Ref = useRef(null); 
    const checkbox5Ref = useRef(null); 
    const checkbox6Ref = useRef(null); 
    const checkbox7Ref = useRef(null);

    //gets from backend 
  
    const getSettings = async () => { 
      try { 
          const response = await apiRequest("GET", "settings/getSettings?user_id=" + sessionStorage.getItem("userId")) 
          const data = await response; 
          console.log(data) 
          setDefaultSettings(JSON.parse(JSON.stringify(data))); //gets a copy of the data
          setSettingsInfo(data); 
      } catch (err) { 
          console.error("Failed to fetch user info:", err); 
      }finally {
        setIsLoading(false);
      }
      }; 

      function isSignIn(){        // Checks if the user is signed in
        if(!sessionStorage.getItem("userToken")){
            return false
        }
        return true;
    }

      useEffect(() => {
        if(isSignIn()) {        // If user is signed in, the getFriends
            getSettings()
        }
        else{                   // Otherwise go to signin page
            navigate("/signin")
        }
        
    });
      if (isLoading) {
        return <div>Loading...</div>;   // Shows loading screen if information is still loading
      }
      if (!settingsInfo) {
        return <div>Error loading user information.</div>;
      }

    //updates backend
    //right now when you click the save button there is no feedback/popup, but it does save. If you want to check
    //just reload the site
    const saveSettings = () => { 
      settingsInfo.User = sessionStorage.getItem("userId"); 
      apiRequest("POST", "settings/setSettings", settingsInfo) 
        .then(({ token, ...data }) => { 
          console.log("Settings saved successfully:", data); 
        }) 
        .catch((err) => { 
          console.error("Error saving settings:", err); 
        });
        defaultSettings.DisplayProfileToFriends = settingsInfo.DisplayProfileToFriends;
        defaultSettings.DisplayName = settingsInfo.DisplayName;
        defaultSettings.DisplayEmail = settingsInfo.DisplayEmail;
        defaultSettings.DisplayPhoto = settingsInfo.DisplayPhoto;
        defaultSettings.DisplayStreaks = settingsInfo.DisplayStreaks;
        defaultSettings.DisplayStats = settingsInfo.DisplayStats;
        defaultSettings.FriendRequestEmails = settingsInfo.FriendRequestEmails;
        toast.success(`Settings Saved!`);
    }; 
  
    const handleChange = (key) => { 
  
      if(key === "display"){ 
          if(settingsInfo.DisplayProfileToFriends === false){ 
              settingsInfo.DisplayProfileToFriends = true; 
              setDisplay(!display); 
          } 
          else{
              settingsInfo.DisplayProfileToFriends = false; 
              setDisplay(!display); 
          } 
      } 
      if(key === "name"){   
        if(settingsInfo.DisplayName === false){  
        settingsInfo.DisplayName = true; 
        setDisplayName(!displayName); 
        } 
        else{   
            settingsInfo.DisplayName = false; 
            setDisplayName(!displayName); 
        } 
      } 
        if(key === "email"){ 
          if(settingsInfo.DisplayEmail === false){ 
          settingsInfo.DisplayEmail = true; 
          setDisplayEmail(!displayEmail); 
          } 
          else{ 
            settingsInfo.DisplayEmail = false; 
            setDisplayEmail(!displayEmail); 
          } 
       } 
        if(key === "photo"){ 
          if(settingsInfo.DisplayPhoto === false){ 
          settingsInfo.DisplayPhoto = true; 
          setDisplayPhoto(!displayPhoto); 
          } 
          else{ 
            settingsInfo.DisplayPhoto = false; 
            setDisplayPhoto(!displayPhoto); 
          } 
       } 
        if(key === "streaks"){ 
            if(settingsInfo.DisplayStreaks === false){ 
            settingsInfo.DisplayStreaks = true; 
            setDisplayStreaks(!displayStreaks); 
            } 
            else{ 
                settingsInfo.DisplayStreaks = false; 
                setDisplayStreaks(!displayStreaks); 
            } 
       } 
       if(key === "stats"){   
            if(settingsInfo.DisplayStats === false){ 
             settingsInfo.DisplayStats = true; 
             setDisplayStats(!displayStats); 
            }
            else{ 
            settingsInfo.DisplayStats = false; 
            setDisplayStats(!displayStats); 
            } 
       }
       if(key === "friends"){   
        if(settingsInfo.FriendRequestEmails === false){
         settingsInfo.FriendRequestEmails = true; 
         setDisplayStats(!friendRequestEmails); 
        }
        else{ 
        settingsInfo.FriendRequestEmails = false; 
        setDisplayStats(!friendRequestEmails); 
        } 
   }  
    }; 

    const discardSettings = () => { 
      if (defaultSettings.DisplayProfileToFriends !== settingsInfo.DisplayProfileToFriends) { 
          checkbox1Ref.current.click(); 
          settingsInfo.DisplayProfileToFriends = defaultSettings.DisplayProfileToFriends;  
      } 
      if (defaultSettings.DisplayName !== settingsInfo.DisplayName) {
          checkbox2Ref.current.click(); 
          settingsInfo.DisplayName = defaultSettings.DisplayName; 
      } 
      if (defaultSettings.DisplayEmail !== settingsInfo.DisplayEmail) { 
          checkbox3Ref.current.click(); 
          settingsInfo.DisplayEmail = defaultSettings.DisplayEmail; 
      } 
      if (defaultSettings.DisplayPhoto !== settingsInfo.DisplayPhoto){ 
          checkbox4Ref.current.click(); 
          settingsInfo.DisplayPhoto = defaultSettings.DisplayPhoto; 
      } 
      if(defaultSettings.DisplayStreaks !== settingsInfo.DisplayStreaks){ 
          checkbox5Ref.current.click(); 
          settingsInfo.DisplayStreaks = defaultSettings.DisplayStreaks;
      } 
      if(defaultSettings.DisplayStats !== settingsInfo.DisplayStats){ 
          checkbox6Ref.current.click(); 
          settingsInfo.DisplayStats = defaultSettings.DisplayStats; 
      }
      if(defaultSettings.FriendRequestEmails !== settingsInfo.FriendRequestEmails){ 
        checkbox7Ref.current.click(); 
        settingsInfo.FriendRequestEmails = defaultSettings.FriendRequestEmails; 
    }
    } 

    function DiscardPopup({ trigger, setTrigger }) {
      return trigger ? ( 
        <div className="delete_popup"> 
          <div className="delete_popup-inner"> 
            <div className="delete_Title">Are you Sure you want to Discard</div> 
            <div className="delete_Title2">any unsaved changes?</div> 
            <div> 
              <button className="delete_no" onClick={() => setTrigger(false)}> 
                Cancel 
              </button> 
            </div> 
            <div> 
              <button className="delete_yes" onClick={() => {setTrigger(false);  discardSettings();}}>Yes</button> 
            </div> 
          </div> 
        </div> 
      ) : null; 
    } 

    return ( 
          <body> 
          <div class = "setting_container"> 
              <div class = "button_container"> 
              <button class = "save" onClick = {saveSettings}>Save</button> 
              <button class = "discard" onClick ={() => setButtonPopup(true)}>Discard</button>  
              </div>  
              <div class = "privacy_container"> 
              <div class = "Privacy">Privacy</div> 
              <div class = "privacy_inner"> 
                 <div class = "row1"> 
                     <div class = "friends_profile">Display profile info to friends</div> 
                     <div class = "toggle"> 
                      <label class="switch"> 
                          <input type="checkbox" 
                          ref={checkbox1Ref} 
                          defaultChecked = {settingsInfo.DisplayProfileToFriends} 
                          onInput ={() =>  handleChange("display")} 
                          /> 
                          <span class="slider"></span> 
                      </label> 
                     </div> 
                 </div> 
                 <div class = "row2"> 
                     <div class = "display_name">Display name</div> 
                     <div class = "toggle"> 
                      <label class="switch"> 
                          <input type="checkbox"  
                          ref={checkbox2Ref} 
                          defaultChecked = {settingsInfo.DisplayName} 
                          onInput ={() => handleChange("name")} 
                          /> 
                          <span class="slider"></span> 
                      </label> 
                     </div> 
                 </div> 
                 <div class = "row3"> 
                     <div class = "display_email">Display email</div> 
                     <div class = "toggle"> 
                      <label class="switch"> 
                          <input type="checkbox"  
                          ref={checkbox3Ref}  
                          defaultChecked= {settingsInfo.DisplayEmail} 
                          onInput ={() => handleChange("email")} 
                          /> 
                          <span class="slider"></span> 
                      </label> 
                     </div> 
                 </div> 
                 <div class = "row4"> 
                     <div class = "display_photo">Display photo</div> 
                     <div class = "toggle"> 
                      <label class="switch"> 
                          <input type="checkbox" 
                          ref={checkbox4Ref} 
                          defaultChecked= {settingsInfo.DisplayPhoto} 
                          onInput ={() => handleChange("photo")} 
                          /> 
                          <span class="slider"></span> 
                      </label> 
                     </div> 
                 </div> 
                 <div class = "row5"> 
                     <div class = "display_streaks">Display streaks</div> 
                     <div class = "toggle"> 
                      <label class="switch"> 
                          <input type="checkbox" 
                          ref={checkbox5Ref} 
                          defaultChecked= {settingsInfo.DisplayStreaks} 
                          onInput ={() => handleChange("streaks")}
                          /> 
                          <span class="slider"></span> 
                      </label> 
                     </div> 
                 </div> 
                 <div class = "row6"> 
                     <div class = "display_stats">Display stats</div> 
                     <div class = "toggle"> 
                      <label class="switch"> 
                      <input type="checkbox" 
                          ref={checkbox6Ref} 
                          defaultChecked= {settingsInfo.DisplayStats} 
                          onInput ={() => handleChange("stats")} 
                          /> 
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
                   <div class = "email_notifications">Friend requests emails</div> 
                   <div class = "toggle_1"> 
                    <label class="switch"> 
                        <input type="checkbox"
                          ref={checkbox7Ref}
                          defaultChecked={settingsInfo.FriendRequestEmails}  
                          onInput = {()=> handleChange("friends")}/> 
                        <span class="slider"></span> 
                    </label> 
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
         <div class = "coming_soon"></div>
         <div class = "coming_soon_title">Coming in a Future Update</div>
     </div>
          <DiscardPopup trigger ={buttonPopup} setTrigger = {setButtonPopup}/> 
          </body> 
      ); 
   }; 
  export default Settings; 
  
   