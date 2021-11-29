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