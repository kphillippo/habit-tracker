require("dotenv").config();
const express = require("express");
const app = express();
const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const cors = require("cors");
const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://"+process.env.USERNAME+":"+process.env.PASSWORD+"@"+config.database.host+":"+config.database.port+"/"+config.database.db;
const PORT = process.env.PORT || 8081;

//listening function
app.listen(PORT,function(){
    console.log(`Sever is listening at port ${PORT}`);
})

app.get("/", (req, res) => {

})