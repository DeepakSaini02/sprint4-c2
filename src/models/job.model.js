const mongoose=require("mongoose")

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

module.exports=mongoose.model('job',jobSchema)