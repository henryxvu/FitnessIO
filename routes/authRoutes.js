import express from 'express';
import bcrypt from 'bcrypt';
import User from '../schemas/User.js';

const router = express.Router();

router.post("/signup", async (req, res) => {
    const data = req.body;

    const user = await User.findOne({username: data.username});
    if (user === null){
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = new User({username: data.username, password: hashedPassword, totalCalories: parseInt(data.totalCalories)});
        await newUser.save();
        console.log("User created:", data.username);
        res.json({message: "Success"})

    } 
    else {
        res.json({message: "existing username"})
    }
});

router.post("/login", async (req, res) => {
    console.log("login attempt")
    const data = req.body;
    const user = await User.findOne({username: data.username});
    if (user === null)
        res.json({message: "Failed. Invalid Username"});
    else {
            if (await bcrypt.compare(data.password, user.password))
                res.json({message: "Success", userId: user._id, totalCalories: user.totalCalories});
            else
                res.json({message: "Failed. Invalid Password"});
        }
});



export default router;