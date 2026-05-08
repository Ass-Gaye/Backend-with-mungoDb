import { Post } from "../models/post.model.js";

//Create a post
const createPost = async (req, res) => {
    try {

    const {name, description, age} = req.body;

    if (!name || !description || !age) {
        return res.status(400).json({
            error: "Bad Request",
            message: "Missing required fields: name, description, age!"
        });

        const post = await Post.create({name, description, age});

        res.status(201).json({
            message: "post created successfully"
        });
    }
        
    }
     catch (error) {
        res.status(500).json({
            message: "Internal Server error", error
        });
        
    }
    
};

//Read all posts
const getPosts = async (req, res) => {
    try {

        const posts = await Post.find();
        res.staus(200).json(posts);
        
    } 
    catch (error) {
        res.status(500).json({
            message: "Internal Server error", error
        });
    }
    
};

//update a post
const updatePost = async (req, res) => {
    try {
        // basic validation to check if the body is empty...

        //{name: x, description: y, age: z} -> [name, description, age]
        //{} = truthy

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No data provided for update"
            });
            
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if (!post) {
            return res.status(400).json({
                message: "post Not Found"
            });
            
        }

        res.status(200).json({
            message: "post updated successfully", post
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        });
        
    }
    
};

const deletePost = async (req, res) => {
    
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(400).json({
                message: "post Not Found"
            });
            
        }

        res.status(200).json({
            message: "post successfully deleted."
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
        
    }
}


export {
    createPost,
    getPosts,
    updatePost,
    deletePost
    
};