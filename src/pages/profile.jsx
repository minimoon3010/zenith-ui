import { useState, useEffect } from 'react';
import { getCurrentUserId } from '../utils/auth.js';
import UserMenu from './design/UserMenu.jsx';
import '../styles/profile.css';
import {useNavigate} from "react-router-dom";

export default function Profile() {

    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const userId = getCurrentUserId();
        const token = localStorage.getItem('token');

        fetch(`http://localhost:8080/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => setProfile(data));
    }, []);

    if (!profile) {
        return <p className="profile-loading">Loading...</p>;
    }

    function formatBirthday(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}`;
    }

    return (
        <div className="profile-page">
            <UserMenu onSignOut={handleSignOut} />
            <div className="profile-card">
                <h1 className="display">{profile.firstName}</h1>
                <p className="profile-username">@{profile.username}</p>

                <div className="profile-stats">
                    <div className="profile-stat">
                        <span className="profile-stat-value">{profile.level}</span>
                        <span className="profile-stat-label">Level</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-value">{profile.xp}</span>
                        <span className="profile-stat-label">XP</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-value">{formatBirthday(profile.birthday)}</span>
                        <span className="profile-stat-label">Birthday</span>
                    </div>
                </div>
            </div>
        </div>
    );
}