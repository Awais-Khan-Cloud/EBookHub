import Navbar from "./Components/NavbarComponents/HomeNavbar"
import { ToastContainer } from 'react-toastify';
import { Outlet } from "react-router-dom";




export default function App() {
    return (
        <>
        <ToastContainer />
        <Navbar />
        <main>
        <Outlet />
        </main>
        </>
    )
}