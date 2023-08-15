import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'

const schema = mongoose.Schema

const userSchema = new schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 3,
        max: 20
    },
    favorites: [
        {
            type: schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
}, { timestamps: true }
)


userSchema.plugin(passportLocalMongoose)

export const User = mongoose.model('User', userSchema)