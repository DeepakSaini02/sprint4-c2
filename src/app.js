const express=require('express')
const mongoose=require('mongoose')
const app=express()

app.use(express.json())

const connect=require("./configs/db")

const companyController=require("./controllers/company.controller")
const jobController=require("./controllers/job.controller")

app.use('/comp',companyController)
app.use('/jobs',jobController)




app.listen(5000,async()=>{
    await connect();
    console.log("listen on port 5000");
})