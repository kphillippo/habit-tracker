const Friend = require('../models/Friends');
const UserModel = require('../models/User');

//send friend request
const sendFriendRequest = async (req, res) => {
    const {User, FriendsWith} = req.body
  
    try{
        //sees is the friend exists and returns an id
        const theFriend = await UserModel.getUserId(FriendsWith);
        
        //trys to send friend request
        const request = await Friend.sendFriendRequest(User, theFriend)
    
        res.status(200).json(request)
    }catch(error){
        res.status(400).json({error: error.message})
    }
  }

module.exports = {sendFriendRequest}