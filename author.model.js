import mongoose from "mongoose"
import { authorHashPassword } from "../utils/authServices.js"

const authorSchema = new mongoose.Schema({
    profileImagePath: {
        type: String,
        default: ""
    },

    profileImageUrl: {
        type: String,
        default: ""
    },

    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
    },

    contacts: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        sparse: true
    },

    password: {
        type: String,
        required: true,
        trim: true,
    }
}, {timestamps: true})

authorSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        return next()
    };

    this.password = await authorHashPassword(this.password)
    next();
})

const Author = mongoose.model("Author", authorSchema)

export {Author}