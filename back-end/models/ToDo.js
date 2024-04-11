const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    Owner:{
        type: mongoose.ObjectId,
        required: true
    },
    Title:{
        type: String,
        required: true
    },
    Date:{
        type: Date,
        required: true
    },
    Repeat:{
        type: Boolean,
        required: true
    },
    Remind:{
        type: Boolean,
        required: true
    },
    Status:{
        type: Boolean,
        default: false
    }
}, {collection: 'ToDo'});

//returns the number of todo's that have not been done yet today
ToDoSchema.statics.getNumUncompletedTodosToday = async function(UserID) {
    const today = new Date();
    
    return await this.countDocuments({
        Owner: UserID,
        Date: {
            $gte: new Date(new Date(today).setUTCHours(0,0,0)),
            $lt: new Date(new Date(today).setUTCHours(23, 59, 59))
        }
    });
}

const TodoModel = mongoose.model('ToDo', ToDoSchema);
module.exports = TodoModel;