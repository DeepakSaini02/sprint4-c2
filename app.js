const express=require('express')
const mongoose=require('mongoose')
const app=express()

app.use(express.json())

const connect=()=>{
    return mongoose.connect("mongodb://localhost:27017/naukri")

}

// comapany Sachema-----------
const compSchema=new mongoose.Schema({
    comp_name:{type:String,required:true},
    vacancy:{type:Number,required:true},
    
},{
    versionKey:false,
    timestamps:true,
})

const Company=mongoose.model('company',compSchema)



// jobSchema------------

const jobSchema=new mongoose.Schema({
    job_name:{type:String,required:true},
    job_type:{type:String,required:true},
    notice_period:{type:Number,required:true},
    job_location:{type:String,required:true},
    rating:{type:Number,required:true},
    skill:{type:String,required:true},
    company_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"company",
        required:true
    }
},{
    versionKey:false,
    timestamps:true,
})

const Job=mongoose.model('job',jobSchema)


// get all jobs in a particular city which matches a particular skill

app.get("/jobs/:job_location/:skill",async(req,res)=>{
    try{
        const particular=await Job.find({job_location:req.params.job_location,skill:req.params.skill}).lean().exec()
        res.status(200).send({particular})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})



// find the company that has the most open jobs.

app.get("/comp/hijobs",async(req,res)=>{
    try{
        const hijobs=await Company.find().sort({vacancy:-1}).limit(1).lean().exec()
        res.status(200).send({hijobs})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})




// find all jobs by sorting the jobs as per their rating.
app.get("/jobs",async(req,res)=>{
    try{
        const job=await Job.find().sort({rating:1}).lean().exec()
        res.status(200).send({job})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})



// find all the jobs that will accept a notice period of 2 months.
app.get("/jobs/:notice_period",async(req,res)=>{
    try{
        const job=await Job.find({notice_period:req.params.notice_period}).lean().exec()
        res.status(200).send({job})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})



// find all the jobs that are available as Work from home.
app.get("/jobs/:job_type",async(req,res)=>{
    try{
        const job=await Job.find({job_type:req.params.job_type}).lean().exec()
        res.status(200).send({job})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})










//basic curd api for company

app.post("/comp",async(req,res)=>{
    try{
        const company=await Company.create(req.body)
        res.status(201).send(company)
    }catch(e){
        res.status(500).send({message:e.message})
    }
})


app.get("/comp",async(req,res)=>{
    try{
        const company=await Company.find().lean().exec()
        res.status(200).send({company})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})


// an api to get details of the company.
app.get("/comp/:id",async(req,res)=>{
    try{
        const company=await Company.findById(req.params.id).lean().exec()
        res.status(200).send({company})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})


app.patch("/comp/:id",async(req,res)=>{
    try{
        const company=await Company.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
        res.status(200).send({company})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})

app.delete("/comp/:id",async(req,res)=>{
    try{
        const company=await Company.findByIdAndDelete(req.params.id).lean().exec()
        res.status(200).send({company})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})

//basic curd api for jobs

app.get("/jobs",async(req,res)=>{
    try{
        const job=await Job.find().lean().exec()
        res.status(200).send({job})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})

app.post("/jobs",async(req,res)=>{
    try{
        const job=await Job.create(req.body)
        res.status(201).send(job)
    }catch(e){
        res.status(500).send({message:e.message})
    }
})

app.get("/jobs/:id",async(req,res)=>{
    try{
        const job=await Job.findById(req.params.id).lean().exec()
        res.status(200).send({job})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})


app.patch("/jobs/:id",async(req,res)=>{
    try{
        const job=await Job.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
        res.status(200).send({job})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})

app.delete("/jobs/:id",async(req,res)=>{
    try{
        const job=await Job.findByIdAndDelete(req.params.id).lean().exec()
        res.status(200).send({job})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})

app.listen(5000,async()=>{
    await connect();
    console.log("listen on port 5000");
})