import {
    BookOpenText,
    Search,
    User
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {toggleLogin, toggleCategory} from "../../features/Navbar/navbarSlice.js";
import LoginCard from "./loginCard.jsx";
import CategoriesBox from "./CategoriesBox.jsx";

export default function Navbar() {
    const dispatch = useDispatch();
    
    console.log("Login Open State:", isLoginOpen);

    return (
        <div className="h-14 w-full bg-[#E76D6D] flex items-center justify-between px-10">

            {/* Logo */}
            <div className="ml-6 flex items-center gap-2 cursor-pointer">
                <BookOpenText className="text-white text-3xl" />
                <h1 className="text-white text-4xl">Ebook hub</h1>
            </div>

            <div className="flex items-center gap-4">

                                 <div
                                    className="text-white cursor-pointer relative"
                                >
                                    <h6 onClick={() => dispatch(toggleCategory())}>Categories</h6>
                                    {isCategoryOpen && (
                                        <div className="absolute top-10 right-0">
                                            <CategoriesBox />
                                        </div>
                                    )}
                                </div>

                {/* Login User */}
                <div onClick={() => dispatch(toggleLogin())}>
                    <User className="text-white h-5 cursor-pointer" />
                    {isLoginOpen ? <LoginCard /> : null}
                </div>
            </div>
        </div>
    );
}