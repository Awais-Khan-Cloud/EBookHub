import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      {/* Heading */}
      <h1 className="text-[8rem] font-bold text-red-500 leading-none">404</h1>
      <h2 className="text-2xl font-semibold mt-2">Page Not Found</h2>

      {/* Description */}
      <p className="mt-2 text-gray-500 text-center max-w-md">
        The page you are looking for does not exist or might have been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}