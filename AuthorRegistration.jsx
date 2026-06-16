import { Link } from "react-router-dom";
import { BookOpenText, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import avatar1 from "../../assets/EbookhubAvatar.png";
import ProfileImage from "./ProfileImage";
import { useDispatch, useSelector } from "react-redux";
import { setToggleProfileBox } from "../../features/otherFeatures";

const api = axios.create({
  baseURL: "http://localhost:5001",
  timeout: 15000,
  headers: { "Content-Type": "multipart/form-data" },
});

export default function CreateAccount() {
  const dispatch = useDispatch();
  const {toggleProfileBox, profileImage, previewUrl} = useSelector((state) => state.features); // ✅ Correct: access state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    const formData = new FormData()

    if(profileImage instanceof File) {
      formData.append("profileImage", profileImage)
    }else {
      formData.append("profileImageUrl", profileImage)
    }
    formData.append("firstName", data.firstName)
    formData.append("lastName", data.lastName)
    formData.append("contacts", data.contacts)
    formData.append("password", data.password)
    

    try {
      const response = await api.post("/authorSignup", formData);
      if (response.status === 200) console.log("Account created: ", response.data);
    } catch (error) {
      if (error.response) console.error("Server Error: ", error.response.data);
      else if (error.request) console.error("No response from server: ", error.request);
      else console.error("Error: ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="relative w-full max-w-sm bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 p-4 flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-center gap-2">
            <BookOpenText className="text-red-600 w-6 h-6" />
            <h1 className="text-gray-900 text-xl font-semibold tracking-tight">
              Ebook Hub
            </h1>
          </div>
          <p className="text-gray-600 text-xs">
            Create your author account to publish your books.
          </p>

          {/* Profile Image */}
          <div className="flex flex-col items-center justify-center relative">
            <img src={previewUrl || avatar1} alt="User Avatar" className="rounded-full h-14 w-14 shadow" />
            <div
              className="flex items-center gap-1 mt-1 text-red-600 text-xs cursor-pointer hover:underline"
              onClick={() => dispatch(setToggleProfileBox())}  // ✅ Correct usage
            >
              <Pencil size={12} />
              <span>Update</span>
            </div>

            {toggleProfileBox && (
              <div className="absolute top-0 left-full ml-4">
                <ProfileImage />
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-2">
            {/* First Name */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 text-xs font-medium">First Name</label>
              <input
                {...register("firstName", { required: "First name is required" })}
                placeholder="John"
                className="h-9 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <div className="h-4">
                {errors.firstName && (
                  <span className="text-xs text-red-500">{errors.firstName.message}</span>
                )}
              </div>
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 text-xs font-medium">Last Name</label>
              <input
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Doe"
                className="h-9 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <div className="h-4">
                {errors.lastName && (
                  <span className="text-xs text-red-500">{errors.lastName.message}</span>
                )}
              </div>
            </div>

            {/* Contacts */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 text-xs font-medium">Email Address / Mobile Number</label>
              <div className="flex flex-row">
                <input
                  {...register("contacts", { required: "Email is required" })}
                  placeholder="you@example.com"
                  className="flex-1 h-9 px-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                />
              </div>
              <div className="h-4">
                {errors.contacts && (
                  <span className="text-xs text-red-500">{errors.contacts.message}</span>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 text-xs font-medium">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Choose a strong password"
                className="h-9 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <div className="h-4">
                {errors.password && (
                  <span className="text-xs text-red-500">{errors.password.message}</span>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 h-9 rounded-md bg-gradient-to-r from-red-500 to-red-600 text-white font-medium text-xs hover:from-red-600 hover:to-red-700 transition shadow"
          >
            Create Account
          </button>

          <p className="text-xs text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/authorlogin" className="text-red-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}