//model for CRUD APIS
import mongoose, {Schema} from 'mongoose';

const postShema = Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true

        },

        description:{
            type: String,
            required: true,
            trim: true
        },

        age:{
            type: Number,
            required: true,
            min: 1,
            max: 150
        }

    },

    {
        timestamp: true
    }
);


export const Post = mongoose.model('Post', postShema);