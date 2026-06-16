import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function StartupPage() {

  const [content, setContent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchBooks = async () => {

      try {

        const response = await axios.get(
          "http://localhost:5001/books"
        );

        if (response.status === 200) {
          setContent(response.data);
          console.log("Books fetched successfully");
        }

      } catch (error) {
        console.error("Error fetching books:", error);
        navigate("/notFound");
      }
    };

    fetchBooks();

  }, []);

  return (
    <div className="min-h-screen p-8">

      <h1 className="text-3xl font-bold text-center mb-12">
        All Books
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {content?.map((element, index) => (

          <div
            key={index}
            onClick={() => navigate(`/metaData/${element?._id}`)}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition"
          >

            <div className="h-64 w-full overflow-hidden rounded-t-xl">
              <img
                src={element?.coverImage}
                alt="Book Cover"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">
                {element?.title}
              </h2>

              <p className="text-sm text-gray-600 mt-1">
                {element?.author?.firstName || "Unknown Author"}
              </p>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}