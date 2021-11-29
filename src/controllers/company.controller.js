const express=require('express')


const router=express.Router()

const Company=require('../models/company.model')

// find the company that has the most open jobs.

router.get("/hijobs",async(req,res)=>{
    try{
        const hijobs=await Company.find().sort({vacancy:-1}).limit(1).lean().exec()
        res.status(200).send({hijobs})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})


router.post("",async(req,res)=>{
    try{
        const company=await Company.create(req.body)
        res.status(201).send(company)
    }catch(e){
        res.status(500).send({message:e.message})
    }
})


router.get("",async(req,res)=>{
    try{
        const company=await Company.find().lean().exec()
        res.status(200).send({company})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})


// an api to get details of the company.
router.get("/:id",async(req,res)=>{
    try{
        const company=await Company.findById(req.params.id).lean().exec()
        res.status(200).send({company})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})


router.patch("/:id",async(req,res)=>{
    try{
        const company=await Company.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
        res.status(200).send({company})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const company=await Company.findByIdAndDelete(req.params.id).lean().exec()
        res.status(200).send({company})
    }catch(e){
        res.status(500).send({message:e.message})
    }
})

module.exports=router