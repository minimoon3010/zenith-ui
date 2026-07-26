import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {viewUserProfile} from '../../utils/user.js';
import '../../styles/dashboard.css';
import '../../styles/level-banner.css';


export default function LevelBanner() {
    /** @type {[UserProfile|null, Function]} */
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const firstName = profile?.firstName;
    const currentLevel = profile?.level ?? 0;
    const currentXp = profile?.xp ?? 0;
    const xpForNextLevel = 100 * Math.pow(2, currentLevel);
    const xpPercent = Math.min(100, Math.round((currentXp / xpForNextLevel) * 100));
    const userStreak = 9;

    useEffect(() => {
        async function loadProfile() {
            try {
                /** @type {UserProfile} */
                const data = await viewUserProfile();
                setProfile(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadProfile().catch((err) => console.error('Unexpected error in loadProfile:', err));
    }, []);




    return (
        <div className="glass-panel level-banner">

            <Link to="/view-profile" className="level-banner-avatar-link">
                <div className="level-banner-avatar-circle">
                    <button className="dashboard-page-trigger" aria-label="View Profile">
                        <svg viewBox="0 0 32 32" className="constellation-icon" aria-hidden="true">
                            <line x1="9" y1="10" x2="16" y2="22" className="constellation-line"/>
                            <line x1="16" y1="22" x2="24" y2="9" className="constellation-line"/>
                            <line x1="9" y1="10" x2="24" y2="9" className="constellation-line"/>
                            <circle cx="9" cy="10" r="2" className="constellation-star"/>
                            <circle cx="16" cy="22" r="2" className="constellation-star"/>
                            <circle cx="24" cy="9" r="2" className="constellation-star"/>
                        </svg>
                    </button>
                </div>
                <span className="level-banner-avatar-label">View my profile</span>
            </Link>

            <div className="level-banner-identity">
                <span className="level-banner-greeting">Welcome, {firstName}!</span>
                <span className="level-banner-rank">Cosmic Rank - Level {currentLevel}</span>
            </div>

            <div className="xp-bar-wrap">
                <div className="xp-bar-label">
                    <span>XP</span>
                    <span>{currentXp} / {xpForNextLevel}</span>
                </div>
                <div className="xp-bar-track">
                    <div
                        className="xp-bar-fill"
                        style={{
                            width: `${xpPercent}%`,
                            backgroundSize: xpPercent > 0 ? `${(100 / xpPercent) * 100}% 100%` : '500% 100%',
                            backgroundPosition: 'left center'
                        }}
                    />
                </div>
            </div>

            <div className="streak-badge">🔥 {userStreak} day streak</div>
        </div>
    )
}