import mongoose from "mongoose";

const schema = mongoose.Schema

const postSchema = new schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [
        {
            type: schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    links: [
        {
            name: String,
            link: String
        }
    ],
    images: [{
        url: String,
        filename: String
    }],
    body: {
        type: String,
    }
}, { timestamps: true })

export const Post = mongoose.model('Post', postSchema)