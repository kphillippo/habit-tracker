const Notifications = require('../models/Notifications');


//returns notification list
const returnNotifications = async (req, res) => {
    try{
        const {User} = req.body
        console.log(User);

        //returns notification list
        const request = await Notifications.findNotifications(User);

        res.status(200).json(request)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//deletes a notification
const deleteNotification = async (req, res) => {
    try{
        const {notificationID} = req.body

        //returns notification list
        const request = await Notifications.deleteNotification(notificationID);

        res.status(200).json(request)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//returns the number of notifications a user has (maybe to display somewhere)
const numOfNotifications = async (req, res) => {
    try{
        const {User} = req.body

        //returns notification list
        const request = await Notifications.findNumNotifications(User);

        res.status(200).json(request)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = { returnNotifications, deleteNotification,  numOfNotifications }