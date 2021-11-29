const mongoose=require("mongoose")

// comapany Sachema-----------
const compSchema=new mongoose.Schema({
    comp_name:{type:String,required:true},
    vacancy:{type:Number,required:true},
    
},{
    versionKey:false,
    timestamps:true,
})

module.exports=mongoose.model('company',compSchema)