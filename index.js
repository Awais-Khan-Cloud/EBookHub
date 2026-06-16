import express from "express";
import connectDB from "./Connection/db.js";
import dotenv from 'dotenv';
import { router } from "./routes/userRoutes.js";
import bookRoutes from "./routes/book.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authorRouter from "./routes/authorRoutes.js"
import path from "path";

dotenv.config();
connectDB();
const app = express();
const PORT = 5001;

app.use("/public", express.static(path.join("public")));


app.use(express.json());
app.use(cookieParser());

// CORS setup for cookies
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Routes
app.use("/", authorRouter);
app.use("/", router);
app.use("/", bookRoutes);

app.listen(PORT, () => {
  console.log(`Nodejs is running on Port no ${PORT}`);
});