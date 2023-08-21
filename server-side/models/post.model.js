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
    links: {
        type: [
            {
                name: String,
                link: String,
            }
        ],
        validate: [arrayMinLengthValidator, 'There must be one at least one link']
    }
    ,
    images: {
        type: [
            {
                url: String,
                filename: String,
            }
        ],
        validate: [arrayMinLengthValidator, 'There must be one at least one image']
    },
    body: {
        type: String,
    }
}, { timestamps: true })

function arrayMinLengthValidator(array) {
    return array.length >= 1; // Return true if the array has at least one item
  }

export const Post = mongoose.model('Post', postSchema)