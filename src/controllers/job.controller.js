const express=require('express')


const router=express.Router()

const Job=require('../models/job.model')

// get all jobs in a particular city which matches a particular skill

router.get("/:job_location/:skill",async(req,res)=>{
    try{
        const particular=await Job.find({job_location:req.params.job_location,skill:req.params.skill}).lean().exec()
        res.status(200).send({particular})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})



// find all jobs by sorting the jobs as per their rating.
router.get("",async(req,res)=>{
    try{
        const job=await Job.find().sort({rating:1}).lean().exec()
        res.status(200).send({job})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})



// find all the jobs that will accept a notice period of 2 months.
router.get("/:notice_period",async(req,res)=>{
    try{
        const job=await Job.find({notice_period:req.params.notice_period}).lean().exec()
        res.status(200).send({job})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})




// find all the jobs that are available as Work from home.
router.get("/:job_type",async(req,res)=>{
    try{
        const job=await Job.find({job_type:req.params.job_type}).lean().exec()
        res.status(200).send({job})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})



router.get("",async(req,res)=>{
    try{
        const job=await Job.find().lean().exec()
        res.status(200).send({job})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})

router.post("",async(req,res)=>{
    try{
        const job=await Job.create(req.body)
        res.status(201).send(job)
    }catch(e){
        res.status(500).send({message:e.message})
    }
})

router.get("/:id",async(req,res)=>{
    try{
        const job=await Job.findById(req.params.id).lean().exec()
        res.status(200).send({job})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})


router.patch("/:id",async(req,res)=>{
    try{
        const job=await Job.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
        res.status(200).send({job})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const job=await Job.findByIdAndDelete(req.params.id).lean().exec()
        res.status(200).send({job})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})



module.exports=router