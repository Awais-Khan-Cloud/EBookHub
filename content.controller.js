import Book from "../models/bookData.model.js";


export default async function getBookListByCategory(req, res) {

    const {category, subCategory} = req.params

    
        try {
            const listByCategory = await Book.find({ categories: category })

            if(!listByCategory || listByCategory.length === 0  ) {
                return res.status(404).json({ message: "No books found for this category" });
            }

            return res.status(200).json(listByCategory)

        } catch (error) {
            console.error("Error fetching books:", error);
            res.status(500).json({ message: "Server error while fetching books" });
        }
    
}