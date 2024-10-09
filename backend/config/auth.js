
/*
Here's how it works:

Token Verification
Check for Token:

If no token is found (!token), respond with a 401 Unauthorized status and a message saying "User not authenticated."
Verify Token:

Attempt to verify the token using jwt.verify(token, process.env.TOKEN_SECRET).
If the token is invalid or expired, jwt.verify will throw an error, which is caught by the catch block.
Handle Verification Errors:

The catch block logs the error and responds with a 401 Unauthorized status, indicating "Invalid or expired token."
*/
const jwt=require("jsonwebtoken");
require("dotenv").config();
const isAuthenticated=(req,res,next)=>{
    try {
        token=req.cookies.token;
        if(!token){
            return res.status(401).json({message:"User not Authenticated",success:"false"})
        }
        const decode=jwt.verify(token,process.env.JWTSECERET);
        console.log(decode)
        req.user=decode.userId;
        next();
    } catch (error) {
        res.status(401).json({message:"Invalid or expired token"})
    }    
}

module.exports=isAuthenticated
