require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const mongoDB = "mongodb+srv://user:pass@cluster.rbzvfkr.mongodb.net/"

const PORT = process.env.PORT ||8081;

//listening function
app.listen(PORT,function(){
    console.log(`Sever is listening at port ${PORT}`);
})