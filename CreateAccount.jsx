import { Link } from "react-router-dom";
import { BookOpenText } from "lucide-react";
import { useForm } from "react-hook-form"
import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5001",
  timeout: 5001,
  headers: {"Content-Type": "application/json"}
})

export default function CreateAccount() {

const {
  register,
  handleSubmit,
  formState: {errors},
} = useForm()


const onSubmit = async (data) => {
  try {
    const response = await api.post("/createAccount", data);
    if(response.status === 200) {
      console.log("Account created successfully: ", response.data);
    }
  } catch (error) {
    if(error.response) {
      console.error("Server Error: ", error.response.data);
    }else if(error.request) {
      console.error("No response from server: ", error.request)
    } else {
      console.error("Error: ", error.message)
    }
  }
}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center gap-3">
            <BookOpenText className="text-red-600 w-7 h-7" />
            <h1 className="text-gray-900 text-2xl font-semibold tracking-tight">
              Ebook Hub
            </h1>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm">
            Create your account to access thousands of free eBooks.
          </p>

          {/* First Name */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 text-sm font-medium">First Name</label>
            <input
              {...register("firstName", {
                required: "First name is required",
                maxLength: {
                  value: 200,
                  message: "First name must be at most 200 characters"
                }
              })}
              placeholder="John"
              className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 text-sm font-medium">Last Name</label>
            <input
            {...register("lastName", {
                required: "Last name is required",
                maxLength: {
                  value: 200,
                  message: "Last name must be at most 200 characters"
                }
              })}
              
              placeholder="Doe"
              className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Email or Mobile */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 text-sm font-medium">
              Mobile Number or Email
            </label>
            <input
              {...register("contact", {
                required: "contacts is required",
                maxLength: {
                  value: 1000,
                  message: "contact must be at most 1000 characters"
                }
              })}
              placeholder="you@example.com or 987654321"
              className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 text-sm font-medium">Password</label>
            <input
            type="password"
            {...register("password", {
                required: "password is required",
                maxLength: {
                  value: 2000,
                  message: "password must be at most 2000 characters"
                }
              })}
              placeholder="Choose a strong password"
              className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Create Button */}
          <button
            type="submit"
            className="mt-2 h-10 rounded-md bg-red-600 text-white font-medium text-sm hover:bg-red-700 transition"
          >
            Create Account
          </button>

          {/* Already have account */}
          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-500 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}