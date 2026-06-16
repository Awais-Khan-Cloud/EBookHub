import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleSearch } from "../../features/Navbar/navbarSlice.js";

export default function SearchBox() {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center">
      <div className="w-60 h-8 rounded-l-full border border-white flex items-center flex-row-reverse">
        <input
          type="text"
          placeholder="Search..."
          aria-label="Search"
          className="w-full h-full px-4 bg-transparent text-white placeholder-red-100 outline-none focus:ring-white"
        />
      </div>

      <button
        onClick={() => dispatch(toggleSearch())}
        aria-label="Toggle search"
        className="flex items-center justify-center w-10 h-8 border border-white border-l-0 rounded-r-full hover:bg-white/10 transition"
      >
        <Search className="text-white h-5" />
      </button>
    </div>
  );
}