import { useState, useEffect } from "react";
import avatar1 from "../../assets/EbookhubAvatar.png";
import avatar2 from "../../assets/avatar2.png";
import avatar3 from "../../assets/avatar3.png";
import avatar4 from "../../assets/avatar4.png";
import avatar5 from "../../assets/avatar5.png";
import avatar6 from "../../assets/avatar6.png";
import avatar7 from "../../assets/avatar7.png";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { setToggleProfileBox, setProfileImage, setPreviewUrl } from "../../features/otherFeatures";

export default function ProfileImage() {
  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7];
  const defaultAvatar = avatars[0];
  const [selectAvatar, setSelectAvatar] = useState(null)
  const [uploadFile, setUploadFile] = useState(null);
  const dispatch = useDispatch();
  



  const handleSelectAvatar = (avatar) => {
    setSelectAvatar(avatar);
    setUploadFile(null);
  }

  const handleUploadFile = (e) => {
    if(!e.target.files[0]) return
    setUploadFile(e.target.files[0])
    setSelectAvatar(null)

    dispatch(setProfileImage(e.target.files[0]))
  }

  useEffect(() => {

    let objectUrl = null

    if(uploadFile) {
      objectUrl = URL.createObjectURL(uploadFile)
      dispatch(setPreviewUrl(objectUrl))
      dispatch(setProfileImage(uploadFile))
    }else if(selectAvatar) {
      dispatch(setPreviewUrl(selectAvatar))
      dispatch(setProfileImage(selectAvatar));
    }else{
      dispatch(setPreviewUrl(defaultAvatar))
      dispatch(setProfileImage(defaultAvatar));
    }

    return () => {
      if(objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [uploadFile, selectAvatar])

  return (
    <div className="flex flex-col w-[28rem] max-w-full bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200 animate-fadeIn relative">

  {/* Close Button (top-right corner) */}
  <button onClick={() => dispatch(setToggleProfileBox())} className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors">
    <X className="h-5 w-5" />
  </button>

  {/* Heading */}
  <h2 className="text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600 drop-shadow-sm text-center">
    Choose Your Avatar
  </h2>

  {/* Avatar Grid */}
  <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 mt-8 mb-6 place-items-center">
    {avatars.map((avatar, index) => (
      <img
        key={index}
        src={avatar}
        alt={`Avatar ${index + 1}`}
        onClick={() => handleSelectAvatar(avatar)}
        className="rounded-full h-20 w-20 cursor-pointer border-4 transition-all duration-300 hover:scale-110 border-transparent hover:border-red-400 hover:shadow-md"
      />
    ))}
  </div>

  <p className="font-medium text-gray-700 mb-4 text-center">or</p>

  {/* Upload Button */}
  <label
    htmlFor="fileUpload"
    className="w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-md cursor-pointer hover:shadow-red-300/70 transition-all duration-300 hover:scale-105"
  >
    Upload from gallery
  </label>
  <input
    id="fileUpload"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={handleUploadFile}
  />
</div>
  );
}