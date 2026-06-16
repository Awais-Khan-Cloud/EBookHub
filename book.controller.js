import Book from "../models/bookData.model.js";

export const getAllBooks = async (req, res) => {
  try {

    const books = await Book.find().populate("author", "firstName lastName");

    res.status(200).json(books);

  } catch (error) {
    console.error("Fetch Books Error:", error);
    res.status(500).json({
      message: "Failed to fetch books",
      error: error.message
    });
  }
};