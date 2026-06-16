import { Settings, BookPlus, Moon, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
  return (

      <div className="w-50 border border-gray-300 bg-white rounded-xl shadow-lg">
        
        
        <div className="flex flex-col">
          <div onClick={() => navigate("/authorLogin")} className="p-3 flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
            <BookPlus className="w-5 h-5" />
            Publish Your Book
          </div>
          <div className="p-3 flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
            <Settings className="w-5 h-5" />
            Setting
          </div>
          <div onClick={() => navigate("/login")} className="p-3 flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
            <LogOut className="w-5 h-5" />
            Logout
          </div>
        </div>
      </div>
  );
}