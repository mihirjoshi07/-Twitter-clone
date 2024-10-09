const Tweet = require("../models/tweetSchema");
const userModel = require("../models/userSchema");
const User = require("../models/userSchema")


exports.createTweet = async (req, res) => {
    const { description } = req.body;
    const userId = req.user;
    try {
        if (!description) {
            return res.status(400).json({ message: "All Fields are required ", success: false })
        }

        const user = await User.findById(userId).select("-password");

        const myFollowers = user.followers;
        console.log(myFollowers)

        await userModel.updateMany(
            { _id: { $in: myFollowers } }, // Find users whose IDs are in the 'myFollowers' array
            {
                $push: {
                    notification: {
                        name: user.name,
                        notificationText: `Your connection ${user.name} has posted a new Tweet`,
                        profilePic:user.profilePic

                    }

                }
            } 
        );
        if (!user) {
            return res.status(404).json({ message: "User does not exists", success: "false" })
        }


        await Tweet.create({
            description,
            userId,
            name: user.name,
            username: user.username
        })



        return res.status(201).json({ message: "Tweet is Created successfully", success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error.",
            success: false
        });

    }
}


exports.getAllTweets = async (req, res) => {

    const userId = req.user;
    try {
        if (!userId) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const tweet = await Tweet.find({ userId }).sort({ createdAt: -1 });
        const user = await userModel.findById(userId).select("-password");

        const otherTweets = await Promise.all(user.follwing.map((otherId) => {
            return Tweet.find({ userId: otherId }).sort({ createdAt: -1 })
        }))
        return res.status(201).json({ tweets: tweet.concat(...otherTweets), success: true });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", success: false });
    }
}
exports.followingTweets = async (req, res) => {
    try {
        const userId = req.user;

        if (!userId) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Fetch all tweets from the users the current user is following
        const otherTweets = await Promise.all(user.follwing.map((otherId) => {
            return Tweet.find({ userId: otherId }).sort({ createdAt: -1 });
        }));

        // Flatten the array of arrays to a single array
        const flattenedTweets = otherTweets.flat();

        return res.status(201).json({ tweets: flattenedTweets, success: true });

    } catch (error) {
        console.error("Following tweets error:", error);
        return res.status(500).json({ message: "Server Error", success: false });
    }
};


exports.deleteTweet = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDoc = await Tweet.findByIdAndDelete(id);
        console.log("Deleted coutn ", deletedDoc)
        return res.status(200).json({
            message: "Tweet is deleted successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete Tweet", error });
    }
}


exports.likeDislike = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { tweetId } = req.params;
        console.log("userId : ", loggedInUser);
        console.log("Tweet Id : ", tweetId)

        const tweet = await Tweet.findById(tweetId);
        if (!tweet) return res.status(404).json({ message: "Tweet not found", success: false })

        if (tweet.like.includes(loggedInUser)) {
            await Tweet.findByIdAndUpdate(tweetId, { $pull: { like: loggedInUser } });
            return res.status(200).json({ message: "You Disliked a tweet" });
        }
        else {
            await Tweet.findByIdAndUpdate(tweetId, { $push: { like: loggedInUser } });
            return res.status(200).json({ message: "You Liked a tweet" });
        }


    } catch (error) {
        return res.status(500).json({ message: "something went wrong" });
    }
}

exports.bookMark = async (req, res) => {

    try {
        const userId = req.user;
        const { tweetId } = req.params;

        const user = await userModel.findById(userId);
        const tweet = await Tweet.findById(tweetId);

        if (!user) return res.status(404).json({ message: "User not found", success: false })

        if (!tweet) return res.status(404).json({ message: "Tweet not found", success: false })

        if (user.bookmark.includes(tweetId)) {
            await userModel.findByIdAndUpdate(userId, { $pull: { bookmark: tweetId } }).select("-password")
            const user = await userModel.findById(userId).select("-password");
            return res.status(200).json({ user, message: "You remove a tweet from bookmarks" });

        }
        else {
            await userModel.findByIdAndUpdate(userId, { $push: { bookmark: tweetId } })
            const user = await userModel.findById(userId).select("-password");
            return res.status(200).json({ user, message: "You added a tweet to bookmarks" });
        }

    } catch (error) {
        return res.status(500).json({ message: "something went wrong" });
    }

}

exports.getBookmarks = async (req, res) => {
    try {
        const userId = req.user;
        const tweet = await Tweet.findOne({ userId })
            .populate("userId", "bookmark").select("_id") // Populate userId with specific fields

        const fetchTweetIds = tweet.userId.bookmark;
        console.log("tweets  : ", fetchTweetIds)

        const fetchTweets = await Tweet.find({ _id: { $in: fetchTweetIds } });
        console.log(fetchTweets)

        if (!tweet) return res.status(404).json({ message: "No tweet Found", success: true });
        return res.status(200).json({ fetchTweets, success: true });
    } catch (error) {
        return res.status(500).json({ message: "something went wrong" });
    }
}

exports.totalTweets=async(req,res)=>{
    try {
            const {id}=req.params;
            if(!id) return res.status(400).json({message:"user not found",success:false});
                
            const tweetCount=await Tweet.find({userId:id}).countDocuments();
            return res.status(200).json({count:tweetCount,success:true});
    } catch (error) {
        return res.status(500).json({ message: "something went wrong" });   
    }
}