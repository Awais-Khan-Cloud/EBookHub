import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Content() {
  const { category, subCategory } = useParams();
  const [content, setContent] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchByCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/${category}/${subCategory}`
        );

        if (response.status === 200) {
          setContent(response.data);
          console.log("Book data fetched Successfully");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/notFound")
      }
    };

    fetchByCategory();
  }, [category, subCategory]);

  return (
    <div className="min-h-screen p-8 transition-colors">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
        {category} {subCategory && `- ${subCategory}`} Books
      </h1>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {content?.map((element, index) => (
          <div
            key={index}
            onClick={() => navigate(`/metaData/${element?._id}`)}
            className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            {/* Book Cover */}
            <div className="h-64 w-full overflow-hidden rounded-t-xl">
              <img
                src={element?.coverImage}
                alt="Book Cover"
                className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* Book Details */}
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-500 transition">
                {element?.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {element?.author || "Unknown Author"}
              </p>
            </div>

            {/* Subtle Hover Accent */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/50 rounded-xl transition"></div>
          </div>
        ))}
      </div>
    </div>
  );
}