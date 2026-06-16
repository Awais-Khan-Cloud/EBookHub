import { Link } from "react-router-dom";

export default function LoginCard() {
    return (
        <div className="absolute right-0 mt-2 w-64 z-50">
            {/* Pointer Arrow */}
            <div className="absolute -top-2 right-1/7 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-t border-l border-gray-300 z-10"></div>

            {/* Main Box */}
            <div className="relative bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
                    <h3 className="text-lg font-semibold text-gray-800">Welcome!</h3>
                <div className="flex gap-1">
                    <p className="text-blue-500 cursor-pointer"><Link to="/login">Login</Link></p>
                    <p className="px-2">or</p>
                    <p className="text-blue-500 cursor-pointer"><Link to="/createAccount">Create Account</Link></p>
                </div>

            </div>
        </div>
    );
}