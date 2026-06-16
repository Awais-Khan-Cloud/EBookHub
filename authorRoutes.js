import express from "express";
import { signupAuthor } from "../controllers/author.controller.js";
import { upload } from "../middleware/multerMiddleware.js";
import { authorLogin } from "../controllers/authorLogin.js";
import {uploadBook} from "../controllers/upload.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const authorRouter = express.Router();

authorRouter.post("/authorSignup", upload.single("profileImage"), signupAuthor);
authorRouter.post("/authorLogin", authorLogin);
authorRouter.post(
  "/authorUpload",
  verifyToken,
  upload.single("coverImage"),
  uploadBook
);

export default authorRouter;