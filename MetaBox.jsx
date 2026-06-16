import { useEffect, useRef, useState } from "react";
import axios from "axios";
import HomeNavbar from "../Components/NavbarComponents/HomeNavbar";
import { useParams } from "react-router-dom";

export default function MetaBox() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [toggleContent, setToggleContent] = useState(false);
  const [chapterIndex, setChapterIndex] = useState(0);

const titleRef = useRef(null);
const coverRef = useRef(null);
const descRef = useRef(null);
const commentsRef = useRef(null);

const scrollToSection = (ref) => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
};
  

  useEffect(() => {
    axios
      .get(`http://localhost:5001/bookMetaData/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleNext = () => {
    if (chapterIndex < book?.content.length - 1) {
      setChapterIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (chapterIndex > 0) {
      setChapterIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">

      <div className="grid sm:grid-cols-12 gap-8 p-8">
        {/* Sidebar */}
        <div className="hidden sm:block col-span-3">
          <div className="sticky top-6 w-full border border-red-100 shadow-xl rounded-2xl bg-white/70 backdrop-blur-lg flex flex-col items-center py-8 space-y-5">
            {[
  { name: "Title", ref: titleRef },
  { name: "Cover Photo", ref: coverRef },
  { name: "Description", ref: descRef },
].map(
              (item, i) => (
                <h6
                  key={i}
                  onClick={() => scrollToSection(item.ref)}
                  className="cursor-pointer px-5 py-3 w-3/4 text-center rounded-xl font-medium text-gray-700 bg-white/70 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 hover:text-white transition shadow-sm hover:shadow-lg"
                >
                  {item.name}
                </h6>
              )
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-12 sm:col-span-9 p-10 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col space-y-10">
          {/* Title */}
          <h1 ref={titleRef} className="font-extrabold text-5xl sm:text-6xl bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
            {book?.title}
          </h1>
          <div className="bg-gradient-to-r from-red-400 to-red-600 rounded-full h-1 w-full"></div>

          {/* Cover Image */}
          <div ref={coverRef} className="w-full flex items-center justify-center">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-white to-red-100 shadow-lg">
              <img
                src={book?.coverImage}
                alt="Book Cover"
                className="w-60 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Tagline */}
          <p className="text-gray-700 text-lg leading-relaxed italic text-center">
            “{book?.tagline || "An unforgettable story..."}”
          </p>

          {/* Categories & Languages */}
          <div className="flex flex-col gap-4">
            <p className="text-gray-600 text-base flex flex-wrap items-center gap-2">
              <span className="font-semibold text-gray-800">Category:</span>
              {book?.categories?.map((element, index) => (
                <span
                  key={index}
                  className="rounded-full shadow-sm bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-1.5 text-sm font-medium hover:shadow-md transition"
                >
                  {element}
                </span>
              ))}
            </p>

            <p className="text-gray-600 text-base flex flex-wrap items-center gap-2">
              <span className="font-semibold text-gray-800">Language:</span>
              {book?.languages?.map((element, index) => (
                <span
                  key={index}
                  className="rounded-full shadow-sm bg-gradient-to-r from-red-300 to-red-500 text-white px-4 py-1.5 text-sm font-medium hover:shadow-md transition"
                >
                  {element}
                </span>
              ))}
            </p>
          </div>

          {/* Description */}
          <blockquote ref={descRef} className="p-6 rounded-2xl bg-gradient-to-br from-red-50 to-white shadow-inner leading-relaxed text-gray-700 border-l-4 border-red-500 italic">
            {book?.description}
          </blockquote>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white 
              bg-gradient-to-r from-red-500 to-red-700 rounded-xl shadow-lg border border-red-400 
              transition-all duration-300 ease-in-out hover:from-red-600 hover:to-red-800 hover:scale-105 hover:shadow-[0_8px_30px_rgba(220,38,38,0.4)] active:scale-95"
              onClick={() => setToggleContent((prev) => !prev)}
            >
              {toggleContent ? "Close Reader" : "Read the Complete Novel"}
            </button>
          </div>

          {/* Reader Mode */}
          {/* Reader Mode (with animation) */}
{/* Reader Mode */}
<div
  className={`overflow-hidden transition-all duration-700 ease-in-out ${
    toggleContent ? "max-h-[3000px] opacity-100 mt-8" : "max-h-0 opacity-0"
  }`}
>
  {book?.content?.length > 0 && (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-white/90 to-red-50/70 backdrop-blur-xl shadow-xl border border-red-200 space-y-8">
      
      <h2 className="text-3xl font-bold text-red-700 border-b pb-3">
        {book.content[chapterIndex].heading}
      </h2>

      <p className="text-gray-800 leading-relaxed text-lg text-justify whitespace-pre-line">
        {book.content[chapterIndex].chapters}
      </p>

      <div className="flex justify-between items-center mt-8">
        <button onClick={handlePrev} disabled={chapterIndex === 0}>
          Previous
        </button>

        <span>
          Chapter {chapterIndex + 1} / {book.content.length}
        </span>

        <button
          onClick={handleNext}
          disabled={chapterIndex === book.content.length - 1}
        >
          Next
        </button>
      </div>

    </div>
  )}
</div>
        </div>
      </div>
    </div>
  );
}