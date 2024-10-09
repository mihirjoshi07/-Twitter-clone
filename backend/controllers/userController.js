const userModel = require("../models/userSchema");
const Tweet = require("../models/tweetSchema")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
require("dotenv").config()
const multer = require("multer");
const { json } = require("express");
const saltRounds = 8;

exports.Register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Invalid registration details", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await userModel.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({ message: "Account created successfully", success: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", success: false });
    }
};
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(401).json({ message: "All Fields are required", success: false })
        }

        let user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Incorrect Email or Password", success: false })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect Email or Password", success: false })
        }
        const token = await jwt.sign({ userId: user._id }, process.env.JWTSECERET, { expiresIn: "1d" })
        user = user.toObject();
        delete user.password;
        console.log(user)
        return res.status(200)
            .cookie("token", token, { expiresIn: "1d", httpOnly: true })
            .json({ message: `Welcome  ${user.name}`, user, success: true })

    } catch (error) {
        return res.status(500).json({ message: "Server Error", success: false });
    }
}

exports.Logout = (req, res) => {
    return res.cookie("token", "", { expiresIn: new Date(Date.now) }).json({ message: "User Logged out successfully" })
}

exports.bookMark = async (req, res) => {
    try {
        const userId = req.user;
        console.log(userId)
        const { tweetId } = req.params;

        const tweet = await Tweet.findById(tweetId);
        if (!tweet) return res.status(404).json({ message: "tweet not found" });

        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.bookmark.includes(tweetId)) {
            await userModel.findByIdAndUpdate(userId, { $pull: { bookmark: tweetId } });
            return res.status(200).json({ message: "Removed from the bookmarks" });
        }
        else {
            await userModel.findByIdAndUpdate(userId, { $push: { bookmark: tweetId } })
            return res.status(200).json({ message: "Added to the bookmarks" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Server Error", success: false });
    }
}

exports.getMyProfile = async (req, res) => {
    try {
        const userId = req.user;
        if (!userId) return res.status(404).json({ message: "user not found" });

        const user = await userModel.findById(userId).select("-password")

        return res.status(200).json({ user: user, success: true })

    } catch (error) {
        return res.status(500).json({ message: "Server Error", success: false });

    }
}

exports.getOtherProfiles = async (req, res) => {
    try {
        const userId = req.user;
        const otherUsers = await userModel.find({ _id: { $ne: userId } }).select("-password");
        if (!otherUsers) return res.status(404).json({ message: "No other users found" });
        console.log(otherUsers)
        return res.status(200).json(otherUsers);
    } catch (error) {
        return res.status(500).json({ message: "Server Error", success: false });
    }
}


exports.getUserProfile = async (req, res) => {
    try {
        const { id: currentProfileId } = req.params;
        if (!currentProfileId) return res.status(400).json({ message: "something went wrong", success: false })

        const user = await userModel.findById({ _id: currentProfileId }).select("-password");
        if (!user)
            return res.status(404).json({ messgae: "No user found", success: false });
        return res.status(200).json({ user, success: true });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", success: false });

    }
}
// Follow API
exports.follow = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const userId = req.params.id;

        // Fetch logged-in user and the target user (excluding password)
        const loggedUser = await userModel.findById(loggedInUser).select("-password");
        const user = await userModel.findById(userId).select("-password");

        // Check if both users exist
        if (!loggedUser || !user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Check if already following
        if (!user.followers.includes(loggedInUser)) {
            await user.updateOne({ $push: { followers: loggedInUser } });
            await loggedUser.updateOne({ $push: { follwing: userId } }); // Using 'follwing' as per your field name
            return res.status(200).json({ message: `${loggedUser.name} just followed ${user.name}`, success: true });
        } else {
            return res.status(400).json({ message: `You already follow ${user.name}`, success: false });
        }

    } catch (error) {
        console.error("Follow API error:", error);
        return res.status(500).json({ message: "Server Error", success: false });
    }
};

// Unfollow API
exports.unfollow = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const userId = req.params.id;

        // Fetch logged-in user and the target user (excluding password)
        const loggedUser = await userModel.findById(loggedInUser).select("-password");
        const user = await userModel.findById(userId).select("-password");

        // Check if both users exist
        if (!loggedUser || !user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Check if following
        if (user.followers.includes(loggedInUser)) {
            await user.updateOne({ $pull: { followers: loggedInUser } });
            await loggedUser.updateOne({ $pull: { follwing: userId } }); // Using 'follwing' as per your field name
            return res.status(200).json({ message: `${loggedUser.name} just unfollowed ${user.name}`, success: true });
        } else {
            return res.status(400).json({ message: `You are not following ${user.name}`, success: false });
        }

    } catch (error) {
        console.error("Unfollow API error:", error);
        return res.status(500).json({ message: "Server Error", success: false });
    }
};

exports.editProfile = async (req, res) => {
    const userId = req.user;
    const data = req.body;
    console.log(data)
    if (!data || !userId) {
        return res.status(400).json({ message: "No data uploaded.." });
    }
    try {

        if (req.file) {
            const fileName = req.file.filename;
            console.log(fileName)
            data.profilePic = fileName;
        }

        const newProfile = await userModel.findByIdAndUpdate(
            userId,
            data
        )
        await Tweet.updateMany({ userId }, { $set: { name: data.name, username: data.username } })

        if (!newProfile) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(newProfile)
        const user = await userModel.findById(userId);
        return res.status(200).json({ user, success: true })

    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


exports.getNotifications = async (req, res) => {
    try {
        const userId = req.user;
        let notifications = await userModel.findById(userId).select("-_id notification");

        //all the notificatioons [n1,n2,n3];
        notifications=notifications.notification;
        //Reverse it [n3,n2,n1]
        notifications.reverse();
        return res.status(200).json({ notifications: notifications, success: true });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", success: false });
    }
}

exports.deleteNotification = async (req, res) => {
    try {
        const userId = req.user;
        //notification Id
        const { id } = req.params;
        if (!userId || !id) return res.status(400).json({ message: "Failed to delete Notification", success: false });

        const result = await userModel.updateOne(
            { _id: userId }, // Find the user by userId
            { $pull: { notification: { _id: id } } } // Pull the notification with the matching _id
        );

        if (result.modifiedCount > 0) {
            console.log('Notification deleted successfully.');
            return res.status(200).json({message:"Notification deleted successfully..",success:true});
        }
    } catch (error) {
        return res.status(500).json({ message: "Server Error", success: false });
    }
}