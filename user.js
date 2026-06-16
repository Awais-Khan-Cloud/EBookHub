import mongoose from "mongoose";


const emailRegex = /^\S+@\S+\.\S+$/;
const mobileRegex = /^[6-9]\d{9}$/;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  contact: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return emailRegex.test(v) || mobileRegex.test(v);
      },

      message: prop => `${prop.value} is neither a valid email nor a valid mobile number!`
    }
  },

  password: {
    type: String,
  },

  refreshToken : {
    type: String,
  }
}, {timestamps: true})

const User = mongoose.model("user", userSchema);
export default User;