require("dotenv").config();
const express = require("express");
const app = express();
const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const mongoose = require("mongoose")
const mongoDB = "mongodb+srv://"+process.env.USERNAME+":"+process.env.PASSWORD+"@cluster.rbzvfkr.mongodb.net/";

const PORT = process.env.PORT ||8081;

//listening function
app.listen(PORT,function(){
    console.log(`Sever is listening at port ${PORT}`);
})