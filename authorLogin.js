// import { Author } from "../models/author.model.js";
// import { authorVerifyPassword } from "../utils/authServices.js";
// import jwt from "jsonwebtoken";

// const generateAuthorAccessToken = (author) => {
//   return jwt.sign(
//     {
//       userId: author._id,
//       role: "author"
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: "15m" }
//   );
// };

// export const authorLogin = async (req, res) => {
//   const { contacts, password } = req.body;

//   try {
//     const author = await Author.findOne({ contacts });
//     if (!author) return res.status(404).json({ message: "User does not exist" });

//     const isMatched = await authorVerifyPassword(author.password, password);
//     if (!isMatched) return res.status(401).json({ message: "Invalid password entered." });

//     const accessToken = generateAuthorAccessToken(author);

//     res.cookie("role", "author", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 1000 * 60 * 60 * 24,
//       sameSite: "strict"
//     });

//     // ✅ Here use 'author', not 'user'
//     res.cookie("userId", author._id.toString(), {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 1000 * 60 * 60 * 24,
//       sameSite: "strict"
//     });

//     return res.status(200).json({ message: "Login successful", role: "author" });

//   } catch (error) {
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

import { Author } from "../models/author.model.js";
import { authorVerifyPassword } from "../utils/authServices.js";
import jwt from "jsonwebtoken";

const generateAuthorAccessToken = (author) => {
  return jwt.sign(
    {
      userId: author._id,
      role: "author"
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

export const authorLogin = async (req, res) => {
  const { contacts, password } = req.body;

  try {
    const author = await Author.findOne({ contacts });
    if (!author)
      return res.status(404).json({ message: "User does not exist" });

    const isMatched = await authorVerifyPassword(
      author.password,
      password
    );
    if (!isMatched)
      return res.status(401).json({ message: "Invalid password entered." });

    const accessToken = generateAuthorAccessToken(author);

    return res.status(200).json({
      message: "Login successful",
      role: "author",
      accessToken
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};