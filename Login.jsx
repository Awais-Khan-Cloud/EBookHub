import { Link, useNavigate } from "react-router-dom";
import { BookOpenText } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import {setToken} from "../../features/authSlice"


export default function LoginCard() {

    const [contact, setContact] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const token = useSelector((state) => state.authorization.token);
    const navigate = useNavigate()

    const handleContinue = async (e) => {
        e.preventDefault();

        const payload = {
            contact,
            password
        }

        try{
            const response = await fetch("http://localhost:5001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
                credentials: "include"
            })

            const data = await response.json()

            if(response.ok) {
                console.log("Login Successful", data);
                dispatch(setToken(data.accessToken))
                localStorage.setItem("accessToken", data.accessToken);
                console.log(token);
                console.log("Login Successful", data);
                navigate("/")
                
            }else{
                console.log("Login Failed", data.error)
            }

        } catch(error) {
            console.error("Network error: ", error.message)
        }

    }

    

    return (
        <form onSubmit={handleContinue}>
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-[350px] p-6 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <BookOpenText className="text-red-500 text-4xl" />
                    <h1 className="text-gray-900 text-3xl font-semibold">Ebook Hub</h1>
                </div>

                
            <h3 className="text-lg font-semibold text-gray-800 text-center">
                    User Login
                </h3>

                {/* Input section */}
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium">
                        Enter your Email Address
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. user@example.com"
                        className="h-10 px-4 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>

                {/* Password */}
                          <div className="flex flex-col gap-1">
                            <label className="text-gray-700 text-sm font-medium">Password</label>
                            <input
                              type="password"
                              placeholder="Enter a password"
                              onChange={(e) => setPassword(e.target.value)}
                              className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm text-gray-800 placeholder-gray-400"
                            />
                          </div>

                {/* Submit Button */}
                <button className="mt-2 h-10 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition">
                    Continue
                </button>

                <p className="text-sm text-gray-600 text-center">
                    New here?{" "}
                    <span className="text-red-500 cursor-pointer hover:underline">
                        <Link to="/createAccount">Create a Account</Link>
                    </span>
                </p>
            </div>
        </div>
        </form>
    );
}