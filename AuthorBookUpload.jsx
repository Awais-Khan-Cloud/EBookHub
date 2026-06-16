import { useState } from "react";
import { UploadCloud, FileText, ImagePlay } from "lucide-react";
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { TableOfContents, BookUser, Settings, Plus } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import {reset} from "../../../Helper/authorBookUpload.js"
import {useDispatch, useSelector} from "react-redux"
import {setIsAddChapters} from "../../features/uploadFeature.js"


const api = axios.create({
  baseURL: "http://localhost:5001",
  timeout: 60000,
  withCredentials: true
});

// --- Constants ---
const categories = [
  "Fiction","Non-Fiction","Romance","Science Fiction","Fantasy",
  "Mystery","Thriller","Horror","Historical","Biography","Self-Help",
  "Business","Health & Fitness","Education","Poetry","Cookbooks",
  "Travel","Religion & Spirituality","Children's","Young Adult",
  "Graphic Novels","Comics","Art & Photography","Science & Technology",
  "Politics","Social Sciences","Philosophy","Music","Sports","Humor",
  "Classic Literature","True Crime","Parenting","Lifestyle",
  "Environmental","Memoir","Adventure","Detective","Dystopian",
  "Essay","Short Stories","Anthology"
];

const languages = [
  "English","Hindi","French","Spanish","German","Chinese","Japanese",
  "Korean","Arabic","Portuguese","Russian","Italian","Turkish","Bengali",
  "Urdu","Tamil","Telugu","Gujarati","Marathi","Punjabi"
];

const categoryOptions = categories.map(cat => ({ value: cat, label: cat }));
const languageOptions = languages.map(lan => ({ value: lan, label: lan }));

// --- Step Animation Wrapper ---
const StepContainer = ({ children, stepKey }) => (
  <motion.div
    key={stepKey}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default function AuthorBookUpload() {
 
  const dispatch = useDispatch();
  const isAddChapters = useSelector((state) => state.uploadFeature.isAddChapters)
  
  const [step, setStep] = useState(1);
  const [coverImage, setCoverImage] = useState(null);
  const [descCount, setDescCount] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [heading, setHeading] = useState("")
  const [chapters, setChapters] = useState("")
  const [state, setState] = useState({
    title: "",
    description: "",
    category: "",
    language: "",
    content: []
  })
  const totalSteps = 3;


  const handleEditChapter = (index) => {
  const chapter = state.content[index];
  setHeading(chapter.heading);   // 👈 input me purana heading aayega
  setChapters(chapter.chapters); // 👈 input me purana content aayega
  setEditIndex(index);           // 👈 track which chapter is being edited
  
  if (!isAddChapters) dispatch(setIsAddChapters()); // open form agar band hai
};

  const handleAddChapter = () => {
  if (!heading.trim() || !chapters.trim()) {
    toast.error("❌ Please fill the heading and content sections");
    return;
  }

  const newChapter = { heading, chapters };

  if (editIndex !== null) {
    // ✏️ Update existing chapter at same index
    const updatedContent = [...state.content];
    updatedContent[editIndex] = newChapter;
    setState({ ...state, content: updatedContent });
    setEditIndex(null);
    
  } else {
    // ➕ Add new chapter
    setState({ ...state, content: [...state.content, newChapter] });
  }

  // Reset inputs
  reset(setHeading, setChapters);
};

  const onSubmit = async (e) => {
    e.preventDefault()

    console.log("sending ", state);
    

    if (heading.trim() && chapters.trim()) {
      
   toast.warn(
      "You have an un-added chapter. Please click 'Add More Chapters' or clear the fields before publishing."
    );

     console.log(state.content);
     return
  }

    try {
      if (!coverImage) {
        console.error("❌ Please upload cover image.");
        return;
      }

      const formData = new FormData();
      formData.append("title", state.title);
      formData.append("description", state.description);
      formData.append("coverImage", coverImage.file);

      // Multi-select arrays
      (state.category || []).forEach(c => formData.append("categories[]", c.value));
      (state.language || []).forEach(l => formData.append("languages[]", l.value));

      if(state.content.length !== 0) {
        formData.append("content", JSON.stringify(state.content))
      }

      const token = localStorage.getItem("token");

const response = await api.post("/authorUpload", formData, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

      if (response.status === 200) {
        console.log("✅ Book uploaded", response.data);
        alert("✅ Book uploaded successfully!");
      }
    } catch (error) {
      if (error.response) console.error("Server Error: ", error.response.data);
      else if (error.request) console.error("No response from server: ", error.request);
      else console.error("Error: ", error.message);
    }
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return alert("❌ Cover image must be under 5MB");
    setCoverImage({ preview: URL.createObjectURL(file), file });
  };



  const nextStep = () => {
  if (step === 1) {
    if (!state.title.trim()) {
      alert("❌ Title is required");
      return;
    }
    if (!state.description.trim()) {
      alert("❌ Description is required");
      return;
    }
    if (!state.category || state.category.length === 0) {
      alert("❌ Please select at least one category");
      return;
    }
    if (!state.language || state.language.length === 0) {
      alert("❌ Please select at least one language");
      return;
    }
  }

  if (step === 2 && !coverImage) {
    alert("❌ Please upload a cover image.");
    return;
  }

  setStep(step + 1);
};


  


  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-red-100 flex items-center justify-center px-3 py-6">
      <ToastContainer />
      <div className="w-full max-w-3xl rounded-2xl shadow-xl border border-white/30 backdrop-blur-2xl bg-white/70 overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-pink-600 to-red-500 bg-clip-text text-transparent mb-8">
            📚 Upload Your Book
          </h1>

          {/* Progress Indicator */}
          <div className="relative mb-8">
            <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full" />
            <div
              className="absolute top-5 left-0 h-1 bg-gradient-to-r from-pink-500 to-red-400 rounded-full transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
            <div className="flex justify-between relative z-10 text-xs">
              {[{ id: 1, label: "Details", icon: <BookUser /> },
                { id: 2, label: "Add Content", icon: <TableOfContents /> },
                { id: 3, label: "Preview", icon: <Settings />}].map(({ id, label, icon }) => (
                <div key={id} className="flex flex-col items-center w-1/3">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold shadow-md transition-all ${
                      step >= id ? "bg-gradient-to-r from-pink-500 to-red-400 text-white scale-105" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {icon}
                  </div>
                  <span className={`mt-1 font-semibold ${step >= id ? "text-gray-800" : "text-gray-400"}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit}>
            <AnimatePresence mode="wait">
              {/* STEP 1: Details */}
              {step === 1 && (
                <StepContainer stepKey="step1">
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Book Title"
                        onChange={(e) => setState({...state, title: e.target.value})}
                        value={state.title}
                        className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-400 bg-white/90"
                      />
                      <span className="absolute left-3 top-3 text-base">✏️</span>
                    </div>

                    <div className="relative">
                      <textarea
                        placeholder="Write a short description..."
                        rows={4}
                        maxLength={500}
                        value={state.description}
                        onChange={ (e) => {
                          setState({ ...state, description: e.target.value }),
                          setDescCount(e.target.value.length);
                        }
                        }
                        className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-400 bg-white/90"
                      />
                      <span className="absolute left-3 top-2 text-base">📝</span>
                      <div className="text-right text-xs text-gray-500 mt-1">{descCount}/500</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1">Category</label>
                        <Select 
                          options={categoryOptions}
                          isMulti
                          placeholder="Select Category"
                          value={state.category}
                          onChange={(selected) => setState({ ...state, category: selected })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1">Language</label>
                       <Select 
                          options={languageOptions}
                          isMulti
                          placeholder="Select Category"
                          value={state.language}
                          onChange={(selected) => setState({ ...state, language: selected })}
                        />
                      </div>
                    </div>
                  </div>
                </StepContainer>
              )}

              {/* STEP 2: Uploads */}
              {step === 2 && (
                <StepContainer stepKey="step2">
                  <div className=" flex flex-col">
                  <div className="w-full flex items-center justify-center">
                    <div
                      onClick={() => document.getElementById("coverUpload").click()}
                      className="flex flex-col items-center justify-center h-62 w-62  border-2 border-dashed border-pink-300 rounded-xl bg-white/70 cursor-pointer hover:bg-pink-50"
                    >
                      <UploadCloud className="w-15 h-15 text-pink-500 mb-2 mt-2" />
                      <p className="text-gray-600 text-sm">{coverImage ? "Change Cover" : "Upload Book Cover"}</p>
                      <input id="coverUpload" type="file" accept="image/*" className="hidden " onChange={handleCoverUpload} />
                      {coverImage && <img src={coverImage.preview} alt="cover" className="mt-3  mb-3 w-24 h-32 object-cover rounded-lg" />}
                    </div>
                  </div>

                  {state.content.length !== 0 && (
                    <div className="flex gap-2 flex-wrap m-2 p-2 rounded border-solid border-2 border-red-500 shadow ">
                      {state.content.map((item, index) => (
                        <div
                        key={index}
                         className="m-2 p-2 bg-red-400 text-white rounded-xl"
                         onClick={() => handleEditChapter(index)}
                         >
                          {item.heading}
                         </div>
                      ))}
                    </div>
                  )}

                  <button 
                  type="button"
                    className="flex items-center justify-center gap-2 px-5 py-2 w-50 m-2 bg-red-600 text-white font-semibold rounded-lg 
             shadow-lg hover:bg-red-500 hover:shadow-xl transition-all duration-300 ease-in-out
             active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
             onClick={() => dispatch(setIsAddChapters())}
                    >
                      <Plus /> 
                      Add Chapters</button>
                  </div>

                  {isAddChapters && (
                    <>
                    
  <div className="flex flex-col gap-4 bg-white/90 rounded-2xl shadow-lg border border-gray-200 p-4">
    {/* Title Field */}
    <div className="flex flex-col">
      <label 
        htmlFor="title" 
        className="text-sm font-medium text-gray-700 mb-1"
      >
        Title
      </label>
      <input 
        id="title"
        type="text" 
        placeholder="Enter the chapter title"
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 
                   focus:outline-none focus:ring-2 focus:ring-pink-400 
                   bg-white shadow-sm placeholder-gray-400"
      />
    </div>

    {/* Content Field */}
    <div className="flex flex-col">
      <label 
        htmlFor="content" 
        className="text-sm font-medium text-gray-700 mb-1"
      >
        Content
      </label>
      <textarea
        id="content"
        placeholder="Write your content here..."
        value={chapters}
        onChange={(e) => setChapters(e.target.value)}
        rows={5}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 
                   focus:outline-none focus:ring-2 focus:ring-pink-400 
                   bg-white shadow-sm placeholder-gray-400 resize-none overflow-y-auto"
      />
    </div>

    {/* Add Chapter Button */}
    <button 
      type="button"
      onClick={handleAddChapter}
      className="flex items-center justify-center gap-2 px-5 py-2.5 
                 bg-gradient-to-r from-pink-600 to-red-600 text-white 
                 font-semibold rounded-xl shadow-md 
                 hover:from-pink-500 hover:to-red-500 
                 hover:shadow-lg transition-all duration-300 ease-in-out
                 active:scale-95 focus:outline-none 
                 focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50"
    >
      <Plus className="w-4 h-4" /> 
      Add More Chapters
    </button>
  </div>
</>
                  )}
                </StepContainer>
              )}




              {/* STEP 3: Preview + Settings */}
              {step === 3 && (
                <StepContainer stepKey="step3">
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-700 mb-2">🔎 Preview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/70 p-4 rounded-xl">
                      <div>
                        <h3 className="font-semibold">Title:</h3>
                        <p className="text-sm">{state.title}</p>
                        <h3 className="font-semibold mt-2">Description:</h3>
                        <p className="text-xs text-gray-600">{state.description}</p>
                        <h3 className="font-semibold mt-2">Category:</h3>
                        <p className="text-xs">{state.category?.map(c => c.label).join(", ")}</p>
                        <h3 className="font-semibold mt-2">Language:</h3>
                        <p className="text-xs">{state.language?.map(l => l.label).join(", ")}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        {coverImage && <img src={coverImage.preview} alt="cover" className="w-28 h-40 object-cover rounded-lg shadow" />}
                      </div>
                    </div>

                    <h6 className="m-2 p-2 text-black shadow font-bold "> Content...</h6>
                    {state.content.length !== 0 && (
                    <div className="flex flex-col gap-2 flex-wrap m-2 p-2 rounded border-solid border-2 border-red-500 shadow ">
                      {state.content.length !== 0 && (
  <div className="flex flex-col gap-2 flex-wrap m-2 p-2 rounded border-2 border-red-500 shadow">
    {state.content.map((item, index) => (
      <div
        key={index}
        className="m-2 p-2 bg-red-400 text-white rounded-xl"
        onClick={() => handleEditChapter(index)}
      >
        {item.heading}
      </div>
    ))}
  </div>
)}
                    </div>
                  )}
                    
                  </div>
                </StepContainer>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-2 rounded-xl bg-gray-200 text-sm font-semibold">
                  ← Previous
                </button>
              ) : <span />}
              {step < totalSteps ? (
                <button type="button" onClick={nextStep} className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-400 text-white text-sm font-semibold">
                  Next →
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button type="submit" className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-400 text-white text-sm font-semibold">🚀 Publish</button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}