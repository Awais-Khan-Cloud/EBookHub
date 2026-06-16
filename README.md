# 📚 EBookHub

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application for reading, uploading, and managing eBooks and novels. The platform allows users to read books and authors to upload and manage their content.

## 🚀 Features

### 👤 User Features
- User Registration and Login
- JWT Authentication
- Browse eBooks and Novels
- Read Books and Chapters
- Download Content

### ✍️ Author Features
- Author Registration and Login
- Upload New Books and Chapters
- Manage Uploaded Content
- Edit and Delete Chapters

### 🛠️ Admin Features
- Manage Users and Authors
- Manage Books and Chapters
- Monitor Platform Content

## 🏗️ Tech Stack

### Frontend
- React.js
- Vite
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB

### Authentication
- JSON Web Token (JWT)

### Cloud Services
- Cloudinary (Image Storage)

## 📂 Project Structure

```text
EBookHub/
├── client/         # React Frontend
├── server/         # Node.js Backend
├── README.md
├── package.json
└── .gitignore
```

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/Awais-Khan-Cloud/E-BookHub.git
cd E-BookHub
```

### Install Dependencies

#### Frontend
```bash
cd client
npm install
```

#### Backend
```bash
cd ../server
npm install
```

### Create Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run the Application

#### Backend
```bash
cd server
npm start
```

#### Frontend
```bash
cd client
npm run dev
```

## 🎯 Future Enhancements
- Book Reviews and Ratings
- Dark Mode
- Notifications System
- Reading History and Bookmarks
- Mobile Responsive Design

## 📸 Screenshots

Add screenshots of your application here.

## 👨‍💻 Author

**Awais Khan**

- GitHub: https://github.com/Awais-Khan-Cloud
- Project Repository: https://github.com/Awais-Khan-Cloud/E-BookHub

## 📄 License

This project is licensed under the MIT License.
