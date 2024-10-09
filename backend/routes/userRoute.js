const express=require("express")
const {Register,editProfile, Login,Logout,bookMark,getMyProfile,getOtherProfiles,follow, unfollow, getUserProfile, getNotifications, deleteNotification}=require("../controllers/userController")
const auth=require("../config/auth")
const upload=require("../config/upload")
const router=express.Router()

router.post("/register",Register);
router.post("/login",Login);


router.get("/logout",Logout);
router.get("/getMyProfile",auth,getMyProfile);
router.get("/getOtherUsers",auth,getOtherProfiles)
router.get("/getUser/:id",auth,getUserProfile);
router.get("/getNotifications",auth,getNotifications)

router.put("/follow/:id",auth,follow);
router.put("/unfollow/:id",auth,unfollow)
router.put("/bookmark/:tweetId",auth,bookMark);
router.put("/deleteNotification/:id",auth,deleteNotification)

router.post("/upload",auth,upload.single("file"),editProfile)
module.exports =router;