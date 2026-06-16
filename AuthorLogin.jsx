import {  Link, useNavigate } from "react-router-dom";
import { BookOpenText } from "lucide-react";
import axios from "axios"
import { useForm } from "react-hook-form";


const api = axios.create({
    baseURL: "http://localhost:5001",
    timeout: 5000,
    headers: {"Content-Type": "application/json"},
    withCredentials: true
})

export default function AuthorLogin() {



    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()
    
    const navigate = useNavigate()

const onSubmit = async (data) => {
  try {
    const response = await api.post("/authorLogin", data);

    if (response.status === 200) {

      // ✅ TOKEN SAVE
      localStorage.setItem("token", response.data.accessToken);

      console.log("Login Successful");
      navigate("/authorupload");
    }

  } catch (error) {
    if (error.response) console.error("Server Error: ", error.response.data);
    else if (error.request) console.error("No response from server: ", error.request);
    else console.error("Error: ", error.message);
  }
};

    

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-[350px] p-6 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <BookOpenText className="text-red-500 text-4xl" />
                    <h1 className="text-gray-900 text-3xl font-semibold">Ebook Hub</h1>
                </div>

                            <h3 className="text-lg font-semibold text-gray-800 text-center">
                    Author Login
                </h3>

                {/* Input section */}
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium">
                        Email Address
                    </label>
                    <input
                        {...register("contacts", { required: "Email is required" })}
                        placeholder="e.g. user@example.com"
                        className="h-10 px-4 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                    />
                </div>

                {/* Password */}
                          <div className="flex flex-col gap-1">
                            <label className="text-gray-700 text-sm font-medium">Password</label>
                            <input
                              type="password"
                              {...register("password", { required: "Password is required" })}
                              placeholder="Enter a password"
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
                        <Link to="/authorSignup">Create a Account</Link>
                    </span>
                </p>
            </div>
        </div>
        </form>
    );
}