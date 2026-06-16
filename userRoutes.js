import express from "express";
import createUser from "../controllers/userControllers.js";
import { loginUser, refreshAccessToken } from "../controllers/loginController.js";
import verifyToken from "../middleware/verifyToken.js";
import metaData from "../controllers/metaData.controller.js"
import getBookListByCategory from "../controllers/content.controller.js";

const router = express.Router();

router.post("/createAccount", createUser);
router.post("/login", loginUser)
router.get("/verify", verifyToken, (req, res) => {
    res.status(200).json({ message: "User verified", user: req.user });
});
router.post("/refresh-token", refreshAccessToken)
router.get("/bookMetaData/:id", metaData);
router.get("/:category/:subCategory", getBookListByCategory)

export {
    router
}