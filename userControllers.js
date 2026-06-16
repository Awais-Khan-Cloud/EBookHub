import User from "../models/user.js";
import { hashPassword } from "../utils/authServices.js";

const createUser = async (req, res) => {
    // todo: get a user
    const {firstName, lastName, contact, password, refreshToken} = req.body;

    const hashedPassword = await hashPassword(password);


    try {
        const user = await User.create({
        firstName,
        lastName,
        contact,
        password: hashedPassword,
        refreshToken,
        })

        res.status(201).json({
            message: "User created Successfully",
            user,
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
      message: "Something went wrong while creating the user",
      error: error.message,
    });
}
}

export default createUser