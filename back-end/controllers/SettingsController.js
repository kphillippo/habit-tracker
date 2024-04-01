const Settings = require('../models/Settings');

//toggle display profile to friends
const getSettings = async (req, res) => {
    try{
      const Owner = req.query.user_id;

      //gets the user's settings
      const user = await Settings.getSettings(Owner)
  
        const userID = user.User
        const DisplayProfileToFriends = user.DisplayProfileToFriends
        const DisplayName = user.DisplayName
        const DisplayEmail = user.DisplayEmail
        const DisplayPhoto = user.DisplayPhoto
        const DisplayStreaks = user.DisplayStreaks
        const DisplayStats = user.DisplayStats
        const AllowEmails = user.AllowEmails
        const HabitEmails = user.HabitEmails
        const ToDoEmails = user.ToDoEmails
        const FriendRequestEmails = user.FriendRequestEmails
        const GroupChallangeEmails = user.GroupChallangeEmails
        const MainColor = user.MainColor
        const FontSize = user.FontSize

      res.status(200).json({userID, DisplayProfileToFriends, DisplayName, DisplayEmail, DisplayPhoto, DisplayStreaks, DisplayStats, AllowEmails, HabitEmails, ToDoEmails, FriendRequestEmails, GroupChallangeEmails, MainColor, FontSize})
    }catch(error){
      res.status(400).json({error: error.message})
    }
}


//toggle display profile to friends
const setSettings = async (req, res) => {
    try{
        const {User, DisplayProfileToFriends, DisplayName, DisplayEmail, DisplayPhoto, DisplayStreaks, DisplayStats, AllowEmails, HabitEmails, ToDoEmails, FriendRequestEmails, GroupChallangeEmails, MainColor, FontSize} = req.body
      
        //gets the user's settings
        const user = await Settings.setSettings(User, DisplayProfileToFriends, DisplayName, DisplayEmail, DisplayPhoto, DisplayStreaks, DisplayStats, AllowEmails, HabitEmails, ToDoEmails, FriendRequestEmails, GroupChallangeEmails, MainColor, FontSize)

      res.status(200).json({})
    }catch(error){
      res.status(400).json({error: error.message})
    }
}

module.exports = { getSettings, setSettings }