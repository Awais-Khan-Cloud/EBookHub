import {
    BookOpenText,
    Search,
    Menu as MenuIcon
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, toggleSearch, toggleCategory } from "../../features/Navbar/navbarSlice.js";
import UserMenu from "./Menu.jsx";
import CategoriesBox from "./CategoriesBox.jsx";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeNavbar() {
    const { isSearchOpen, isMenuOpen, isCategoryOpen } = useSelector((state) => state.navbar);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Separate refs for each dropdown/component
    const searchRef = useRef();
    const menuRef = useRef();
    const categoryRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                if (isMenuOpen) dispatch(toggleMenu());
            }
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                if (isCategoryOpen) dispatch(toggleCategory());
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSearchOpen, isMenuOpen, isCategoryOpen, dispatch]);

    return (
        <div className="h-14 w-full bg-[#E76D6D] flex items-center justify-between px-10 relative">

            {/* Logo */}
            <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
                <BookOpenText className="text-white text-3xl" />
                <h1 className="text-white text-2xl font-bold">Ebook Hub</h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">


                {/* Categories */}
                <div className="text-white cursor-pointer relative" ref={categoryRef}>
                    <h6 onClick={() => dispatch(toggleCategory())}>Categories</h6>
                    {isCategoryOpen && (
                        <div className="absolute top-10 right-0 z-50">
                            <CategoriesBox />
                        </div>
                    )}
                </div>

                {/* Login / User Menu */}
                <div className="relative" ref={menuRef}>
                    <MenuIcon
                        onClick={() => dispatch(toggleMenu())}
                        className="text-white h-5 cursor-pointer"
                    />
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2">
                            <UserMenu />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}