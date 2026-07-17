import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import Authenticate from "./pages/authenticate.jsx";
import Star from "./pages/design/star.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Star />
        <Authenticate />
    </StrictMode>,
)