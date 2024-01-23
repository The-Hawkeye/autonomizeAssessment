// const express = require("express");
// const routes = require("./router")
const app = require("./app")
const mongoose = require("mongoose");



const PORT  = 3000;
const MONGO_URL = "mongodb+srv://anubhawmaurya:autonomizeapp@cluster0.nubmliw.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(MONGO_URL).then(()=>console.log("Connected to MongoDb")).catch((e)=>console.log(e));


app.listen(PORT,()=>{
    console.log("Server listening at port 3000")
})
