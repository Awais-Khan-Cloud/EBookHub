import mongoose from "mongoose";

const categories = [
  "Fiction", "Non-Fiction", "Romance", "Science Fiction", "Fantasy",
  "Mystery", "Thriller", "Horror", "Historical", "Biography", "Self-Help",
  "Business", "Health & Fitness", "Education", "Poetry", "Cookbooks",
  "Travel", "Religion & Spirituality", "Children's", "Young Adult",
  "Graphic Novels", "Comics", "Art & Photography", "Science & Technology",
  "Politics", "Social Sciences", "Philosophy", "Music", "Sports", "Humor",
  "Classic Literature", "True Crime", "Parenting", "Lifestyle",
  "Environmental", "Memoir", "Adventure", "Detective", "Dystopian",
  "Essay", "Short Stories", "Anthology"
];

const languages = [
  "English","Hindi","French","Spanish","German","Chinese","Japanese",
  "Korean","Arabic","Portuguese","Russian","Italian","Turkish","Bengali",
  "Urdu","Tamil","Telugu","Gujarati","Marathi","Punjabi"
];

// Chapter Schema
const chapterSchema = new mongoose.Schema({
  heading: { type: String, required: true, trim: true },
  chapters: { type: String, required: true }
}, { _id: false });
// Main Book Schema
const bookDataSchema = new mongoose.Schema({
    title: { type: String, required: true, default: "", index: true },
    description: { type: String, required: true, default: "" },
    categories: [{ type: String, enum: categories, required: true }],
    languages: [{ type: String, enum: languages, required: true }],
    coverImage: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: [chapterSchema], default: [] }
}, { timestamps: true });

const Book = mongoose.model("Book", bookDataSchema);
export default Book;