// Does the task (fetching, saving, updating, deleting data) asked in the request and then send the response to the client

//controllers are the one who will handle the request and then we will redirect to the right model
//  to get the data from the database and then we will send the response to the client

import { User } from "../models/user.model.js";


const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body; // get the data from the request body

        if (!username || !email || !password) { //validate the data
            return res.status(400).json({ message: "All fields are required" }); // send a response to the client
        }

        //if user already exists
        // const existingUser = await User.findOne({ $or: [{ username }, { email }] }); // find a user by username or email

        const existingUser = await User.findOne({ email: email.toLowerCase() }); // find a user by email

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" }); // send a response to the client
        }

        // const user = new User({ username, email, password }); // create a new user using the User model
         // await user.save(); // save the user to the database

        const user = await User.create({
             username,
             email: email.toLowerCase(),
             password,
             loggedIn: false // we will use this field to track if the user is logged in or not
            
            }); // create a new user using the User model and save it to the database


        res.status(201).json({ 
            message: "User registered successfully",
             user: {
                id: user._id,
                username: user.username,
                email: user.email
             }
        });
         // send a response to the client

    } 
    catch (error) {
        console.log("Error registering user", error);
        res.status(500).json({ message: "Failed to register user" }); // send a response to the client
    }
}   

const loginUser = async (req, res) => {
    try {
        
        const {email, password} = req.body;

        //checking if the user already exist...


        //finding user by email
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user)  return res.status(400).jason({
                message: "user not found"
            });

            //checking if password matches...
            const isMatch = await user.comparePassword(password);

            //else if password doesn't match
            if (!isMatch) return res.status(400).json({
                message: "Invalid credentials"
            });

            //else if password does matches...
            res.status(200).json({
                message: "User logign successfully",

                User: {
                    id: user._id,
                    email: user.email,
                    username: user.username
                }

            });

    } catch (error) {
        res.status(500).jason({
            message: "Internal server error"
        });
        
    }
    
}

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        //loging out by your email
        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(400).json({
                message: "User Not Found"
            });

            res.status(200).json({
                message: "User successfully logout"
            }); 
        }
        
    } 
    catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        });
        
    }
}

export { 
    registerUser,
    loginUser,
    logoutUser
}; // export the controller function to be used in the routes