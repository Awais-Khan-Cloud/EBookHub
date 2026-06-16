import Book from "../models/bookData.model.js";

export default async function getBookById(req, res) {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId); // correct query

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}