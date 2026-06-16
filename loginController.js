import User from "../models/user.js"
import { verifyPassword } from "../utils/authServices.js";
import jwt from "jsonwebtoken"
import { hashPassword } from "../utils/authServices.js";


const accessToken = (user) => {
    return jwt.sign(
        {userId: user._id, role: "reader"},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
    )
}

const refreshToken = (user) => {
    return jwt.sign(
        {userId: user._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "30d"}
    )
}

const loginUser = async (req, res) => {
    const {contact, password} = req.body;

    try{
       const user = await User.findOne({contact})
       if(!user) {
        console.error("User doesnot exist")
        return res.status(404).json({message: "User doesnot exist"})
       }

       const isMatched = await verifyPassword(user.password, password)
       if(!isMatched) {
        console.error("Invalid Password Entered")
        return res.status(401).json({message: "Invlaid password Entered."})
       }

       const access = accessToken(user)
       const refresh = refreshToken(user)

       

    res.cookie("refreshToken", refresh, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    const {password:pwd, ...userWithoutPassword} = user.toObject()

    return res.status(200).json({
        message:  "Login successfull",
        accessToken: access,
        user: userWithoutPassword,
    })
  }

     catch(error) {
         res.status(500).json({error: error.message}) 
    }
}

const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken
    if(!incomingRefreshToken) {
        return res
        .status(401)
        .json({message: "Invlaid refresh Token"})
    }

    try {
        const decodedRefreshToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedRefreshToken?.user);

        if(!user) {
            return res
            .status(404)
            .json({message: "User not found."})
        }

        if(user.id !== decodedRefreshToken.user) {
            return res
            .status(404)
            .json({message: "userId not found"})
        }

        return res
        .json({
            accessToken: accessToken(user),
            message: "New access Token created successfully"
        })
    } catch (error) {
        console.error("Something went wrong.")
        return res.status(500).json({ message: "Internal Server Error" });
    }

}

export {
    loginUser,
    refreshAccessToken
}