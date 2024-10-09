const mongoose=require("mongoose");

const tweetSchema=new mongoose.Schema({
    description:{type:String,required:true},
    like:{type:Array, default:[]},
    comment:{type:Array, default:[]},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    name:{type:String,required:true},
    username:{type:String,required:true}

},{timestamps:true})

const Tweet=mongoose.model('Tweet',tweetSchema);
module.exports=Tweet

