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
      if(sessionStorage.getItem("userToken")){
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
    }
      else {
        navigate('/Signin');
    }
  }; 
      useEffect(() => {
         getSettings()
      },[]);

      if (isLoading) {
        return <div>Loading...</div>;
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
             setFriendRequestEmails(!displayStats); 
            }
            else{ 
            settingsInfo.DisplayStats = false; 
            setFriendRequestEmails(!displayStats); 
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
            <div className="delete_Title">Are you sure you want to discard</div> 
            <div className="delete_Title2">your unsaved changes?</div> 
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
          <div className = "setting_container"> 
              <div className = "button_container"> 
              <button className = "save" onClick = {saveSettings}>Save</button> 
              <button className = "discard" onClick ={() => setButtonPopup(true)}>Discard</button>  
              </div>  
              <div className = "privacy_container"> 
              <div className = "Privacy">Privacy</div> 
              <div className = "privacy_inner"> 
                 <div className = "row1"> 
                     <div className = "friends_profile">Display profile info to friends</div> 
                     <div className = "toggle"> 
                      <label className="switch"> 
                          <input type="checkbox" 
                          ref={checkbox1Ref} 
                          defaultChecked = {settingsInfo.DisplayProfileToFriends} 
                          onInput ={() =>  handleChange("display")} 
                          /> 
                          <span className="slider"></span> 
                      </label> 
                     </div> 
                 </div> 
                 <div className = "row2"> 
                     <div className = "display_name">Display name</div> 
                     <div className = "toggle"> 
                      <label className="switch"> 
                          <input type="checkbox"  
                          ref={checkbox2Ref} 
                          defaultChecked = {settingsInfo.DisplayName} 
                          onInput ={() => handleChange("name")} 
                          /> 
                          <span className="slider"></span> 
                      </label> 
                     </div> 
                 </div> 
                 <div className = "row3"> 
                     <div className = "display_email">Display email</div> 
                     <div className = "toggle"> 
                      <label className="switch"> 
                          <input type="checkbox"  
                          ref={checkbox3Ref}  
                          defaultChecked= {settingsInfo.DisplayEmail} 
                          onInput ={() => handleChange("email")} 
                          /> 
                          <span className="slider"></span> 
                      </label> 
                     </div> 
                 </div> 
                 <div className = "row4"> 
                     <div className = "display_photo">Display photo</div> 
                     <div className = "toggle"> 
                      <label className="switch"> 
                          <input type="checkbox" 
                          ref={checkbox4Ref} 
                          defaultChecked= {settingsInfo.DisplayPhoto} 
                          onInput ={() => handleChange("photo")} 
                          /> 
                          <span className="slider"></span> 
                      </label> 
                     </div> 
                 </div> 
                 <div className = "row5"> 
                     <div className = "display_streaks">Display streaks</div> 
                     <div className = "toggle"> 
                      <label className="switch"> 
                          <input type="checkbox" 
                          ref={checkbox5Ref} 
                          defaultChecked= {settingsInfo.DisplayStreaks} 
                          onInput ={() => handleChange("streaks")}
                          /> 
                          <span className="slider"></span> 
                      </label> 
                     </div> 
                 </div> 
                 <div className = "row6"> 
                     <div className = "display_stats">Display stats</div> 
                     <div className = "toggle"> 
                      <label className="switch"> 
                      <input type="checkbox" 
                          ref={checkbox6Ref} 
                          defaultChecked= {settingsInfo.DisplayStats} 
                          onInput ={() => handleChange("stats")} 
                          /> 
                          <span className="slider"></span> 
                      </label> 
                     </div> 
                 </div> 
             </div> 
         </div> 
         <div className = "notifications_container"> 
           <div className = "Notifications">Notifications</div> 
           <div className = "notification_inner"> 
               <div className = "notifications_row1"> 
                   <div className = "email_notifications">Friend requests emails</div> 
                   <div className = "toggle_1"> 
                    <label className="switch"> 
                        <input type="checkbox"
                          ref={checkbox7Ref}
                          defaultChecked={settingsInfo.FriendRequestEmails}  
                          onInput = {()=> handleChange("friends")}/> 
                        <span className="slider"></span> 
                    </label> 
                   </div> 
               </div> 
           </div>
       </div> 
         <div className = "style_container"> 
          <div className ="style_title">Style Customization and Accessibility</div> 
          <div className = "style_inner"> 
              <div className = "style_row1"> 
                  <div className = "main_color">Main color</div> 
                  <div className = "color_container"> 
                      <button className = "green"></button> 
                      <button className = "blue"></button> 
                      <button className = "purple"></button> 
                  </div> 
              </div> 
              <div className = "style_row2"> 
                  <div className = "font_size">Font size</div> 
                  <div className = "drop_down_div"> 
                      <select className="drop_down"> 
                          <option value = "Large">Large</option> 
                          <option value = "Medium" selected = "selected">Medium</option> 
                          <option value = "Small">Small</option> 
                      </select> 
                  </div> 
              </div> 
          </div> 
         </div>
         <div className = "coming_soon"><div className = "coming_soon_title">Coming in a Future Update</div></div>
         
     </div>
          <DiscardPopup trigger ={buttonPopup} setTrigger = {setButtonPopup}/> 
          </body> 
      ); 
   }; 
  export default Settings; 
  
   