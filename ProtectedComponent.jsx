import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";  // 👈 Outlet import
import axios from "axios";
import { getNewAccessToken } from "../../utils/refresh-token.js";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../features/authSlice.js";

const api = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default function ProtectedRoute() {
  const [auth, setAuth] = useState(null);
  const token = useSelector(state => state.authorization.token)
  const dispatch = useDispatch();

  const checkAuth = async () => {
    if (!token) {
      try {
        const newToken = await getNewAccessToken();
        if (!newToken) throw new Error("No new token returned");

        dispatch(setToken(newToken));

        await api.get("/verify", {
          headers: { Authorization: `Bearer ${newToken}` },
        });

        setAuth(true);
      } catch (err) {
        console.error("Authentication failed after refresh:", err.response?.data || err.message);
        setAuth(false);
      }
    } else {
      try {
        await api.get("/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAuth(true);
      } catch (err) {
        console.warn("Token invalid or expired:", err.response?.data || err.message);
        setAuth(false);
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, [token]);

  if (auth === null) return <div>Loading...</div>;
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
}