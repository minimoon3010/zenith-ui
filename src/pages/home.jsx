import { useNavigate } from 'react-router-dom';
import UserMenu from './design/UserMenu.jsx';

export default function Home() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="home">
            <UserMenu onSignOut={handleSignOut} />
            {/* stats + create options go here next */}
        </div>
    );
}