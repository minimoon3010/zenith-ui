import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './styles/global.css'
import Authenticate from "./pages/user/authenticate.jsx";
import Register from "./pages/user/register.jsx";
import Home from "./pages/home.jsx";
import Profile from "./pages/user/profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Background from "./pages/design/background.jsx";
import CreateConstellation from "./pages/constellation/createConstellation.jsx";

function AppRoutes() {
    const location = useLocation();
    const backgroundLocation = location.state?.backgroundLocation;

    return (
        <>
            <Background />
            <Routes location={backgroundLocation || location}>
                <Route path="/" element={<Authenticate />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/view-profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
            {backgroundLocation && (
                <Routes>
                    <Route path="/constellation/new" element={<CreateConstellation mode="create" />} />
                    <Route path="/constellation/view/id/:constellationId" element={<CreateConstellation mode="view" />} />
                </Routes>
            )}
        </>
    );
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </StrictMode>,
)