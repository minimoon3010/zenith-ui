import { Link } from 'react-router-dom';
import '../../styles/menu.css';

export default function UserMenu({ onSignOut }) {
    return (
        <div className="user-menu" tabIndex={0}>
            <button className="user-menu-trigger" aria-label="Account menu">
                <svg viewBox="0 0 32 32" className="constellation-icon" aria-hidden="true">
                    <line x1="9" y1="10" x2="16" y2="22" className="constellation-line" />
                    <line x1="16" y1="22" x2="24" y2="9" className="constellation-line" />
                    <line x1="9" y1="10" x2="24" y2="9" className="constellation-line" />
                    <circle cx="9" cy="10" r="2" className="constellation-star" />
                    <circle cx="16" cy="22" r="2" className="constellation-star" />
                    <circle cx="24" cy="9" r="2" className="constellation-star" />
                </svg>
            </button>

            <div className="user-menu-dropdown">
                <Link to="/view-profile" className="user-menu-item">View profile</Link>
                <Link to="/settings" className="user-menu-item">Settings</Link>
                <button onClick={onSignOut} className="user-menu-item user-menu-signout">Sign out</button>
            </div>
        </div>
    );
}