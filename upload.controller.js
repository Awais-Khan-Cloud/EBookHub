// controllers/upload.controller.js
import Book from "../models/bookData.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadBook = async (req, res) => {
  try {
    const { title, description, price, visibility, content } = req.body;

    // categories/languages handle (array ya string dono case)
    let categories = req.body.categories || [];
    let languages = req.body.languages || [];

    if (typeof categories === "string") categories = [categories];
    if (typeof languages === "string") languages = [languages];

    categories = categories.map(c => (c.value ? c.value : c));
    languages = languages.map(l => (l.value ? l.value : l));

    console.log("Cookies:", req.cookies);
console.log("UserId from cookie:", req.cookies.userId);

    // ✅ chapters (content) parse karna
    let chapters = [];
    if (req.body.content) {
      try {
        chapters = JSON.parse(req.body.content);
      } catch (err) {
        return res.status(400).json({ message: "Invalid chapters JSON format" });
      }
    }

    // ✅ multer file (cover image)
    const coverImagePath = req.file?.path;
    if (!coverImagePath) {
      return res.status(400).json({ message: "Cover file missing" });
    }

    // ✅ Cloudinary upload (optional, agar chaho to local bhi rakh sakte ho)
    const cloudinaryResponse = await uploadOnCloudinary(coverImagePath);
    if (!cloudinaryResponse) {
      return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
    }

    // ✅ Book document create
    const newBook = new Book({
      title,
      description,
      price: price || 0,
      visibility: visibility || "draft",
      categories,
      languages,
      coverImage: cloudinaryResponse.secure_url,
      content : chapters,
      author: req.user.userId
    });

    await newBook.save();

    res.status(200).json({
      message: "Book uploaded successfully",
      book: newBook,
    });
  } catch (err) {
    console.error("❌ Upload Error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};