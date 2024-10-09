const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true , unique:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    bookmark:{type:Array, default:[]},
    profilePic:{type:String},
    bio:{type:String},
    notification: [{
        type: {
            name: {
                type: String,
                
            },
            notificationText: {
                type: String,
            },
            profilePic:{
                type:String
            },
        },
    }],
    
    followers:{
        type:Array,
        default:[]
    },
    follwing:{
        type:Array,
        default:[]
    }
},{timestamps:true})
const userModel =mongoose.model('User',userSchema);
module.exports=userModel

