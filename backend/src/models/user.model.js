import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";


// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

// const BlogPost = new Schema({
//   author: ObjectId,
//   title: String,
//   body: String,
//   date: Date
// });

const userSchema = new Schema(
    
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 128,
            select: false
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        }

        // fullName: {
        //     type: String,
        //     required: true,
        //     trim: true
        // },
        // avatar: {
        //     type: String, // cloudinary url
        //     required: true
        // },
        // coverImage: {
        //     type: String // cloudinary url
        // },
        // watchHistory: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "Video"
        //     }
        // ]
    }, 

    { timestamps: true }


);

//before saving any password we need to hash it
userSchema.pre("saved", async function (next) {

    // if [password] is not modified don't hash again
    if (!this.isModified("password")) return next();

    //else hash the password
    this.password = await bcrypt.hash(this.password, 10);

    next();
    
});


//now let's compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
    
};




// here mongoose is talking to mongodb and then from the model the "User" is been extracted.
//  and then we will use it in the controller to create new user and also to find user 
// and update user and delete user and also to find all users and also to find user by id
//  and also to find user by username and also to find user by email and also to find user by password
//  and also to find user by fullName and also to find user by avatar and also to find user by coverImage
//  and also to find user by watchHistory and also to find user by createdAt and also to find user by updatedAt
export const User = mongoose.model("User", userSchema); //