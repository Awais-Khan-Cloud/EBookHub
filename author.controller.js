import { Author } from "../models/author.model.js";

export const signupAuthor = async (req, res) => {
    try {
        const { firstName, lastName, contacts, password, profileImagePath, profileImageUrl} = req.body

        const newAuthor = new Author({
            firstName,
            lastName,
            contacts,
            password,
            profileImagePath: req.file ? req.file.path : "",
            profileImageUrl: profileImageUrl || ""
        })

        await newAuthor.save()

        res.status(200).json({ message: "Author account created!", author: newAuthor });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
}