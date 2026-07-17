import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/global.css'
import Authenticate from "./pages/authenticate.jsx";
import Register from "./pages/register.jsx";
import Home from "./pages/home.jsx";
import Profile from "./pages/profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Star from "./pages/design/star.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Star />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Authenticate />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/view-profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)