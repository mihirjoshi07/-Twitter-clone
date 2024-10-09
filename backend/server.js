const express =require("express");
require("./config/DB")
require("dotenv").config()
const cors=require("cors");
const cookieParser=require("cookie-parser")
const path=require("path")

const app=express();

//middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cookieParser());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const corsOptions = {
    origin: 'http://localhost:3000',  // Allow this origin
    credentials: true,                // Allow credentials like cookies, authorization headers
  };
  
  app.use(cors(corsOptions));
//routes
const userRoutes=require("./routes/userRoute")
const tweetRoutes=require("./routes/tweetRoutes")

//api
app.use("/user",userRoutes)
app.use("/tweet",tweetRoutes)

app.get("/home",(req,res)=>{
    return res.status(200).json({message:"coming from backend"})
})


app.listen(process.env.PORT,()=>{
    console.log(`Server listen at  port ${process.env.PORT}`);
})
