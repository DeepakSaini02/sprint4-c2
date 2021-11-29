const express=require('express')
const mongoose=require('mongoose')
const app=express()

app.use(express.json())
const connect=()=>{
    return mongoose.connect("mongodb://localhost:27017/naukri")

}

// companySachema-----------
const companySchema=new mongoose.Schema({
    name:{type:String,required:true},
    vacancy:{type:Number,required:true}

},{
    versionKey:false,
    timestamps:true,
})

const Company=mongoose.model("company",companySchema)

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

app.get("/jobs",async(req,res)=>{
    try{
        const company=await Company.find().lean().exec()
        res.status(200).send({company})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})

app.post("/jobs",async(req,res)=>{
    try{
        const company=await Job.create(req.body)
        res.status(201).send(company)
    }catch(e){
        res.status(500).send({message:e.message})
    }
})


app.listen(5000,async()=>{
    await connect();
    console.log("listen on port 5000");
})