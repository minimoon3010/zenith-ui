import {Link, useNavigate} from 'react-router-dom';
import UserMenu from './design/UserMenu.jsx';
import Dashboard from "./dashboard.jsx";

export default function Home() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="home">
            <UserMenu onSignOut={handleSignOut} />
            <Dashboard />
            {/* stats + create options go here next */}
        </div>
    );
}