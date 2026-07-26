import { useState } from 'react';
import UserMenu from './design/UserMenu.jsx';
import '../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Mock data — swap for real fetches once endpoints are wired up
const MOCK_CONSTELLATIONS = ['Morning Routine', 'Uni Coursework', 'Home Admin'];
const MOCK_STARS = ['Reply to emails', 'Gym session', 'Finish ZUI-2 ticket', 'Water plants'];
const MOCK_TRANSACTIONS = ['Coffee — £4.20', 'Groceries — £32.10', 'Uber — £11.00', 'Netflix — £7.99'];

export default function Dashboard() {
    const navigate = useNavigate();

    // Level / XP — replace with real user data from context or a fetch
    const firstName = 'Iba';
    const level = 0;
    const xp = 40;
    const xpForNextLevel = 100;
    const streak = 4;

    const [moodValue, setMoodValue] = useState(5);
    const [moodSubmittedOnce, setMoodSubmittedOnce] = useState(false);
    const [moodReason, setMoodReason] = useState('');

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleSliderRelease = () => {
        setMoodSubmittedOnce(true);
    };

    const handleMoodConfirm = () => {
        // POST /api/mood/new — status: moodValue, energy: moodReason
        console.log('Submitting mood:', { status: moodValue, energy: moodReason });
        setMoodSubmittedOnce(false);
        setMoodReason('');
    };

    const handleMoodDismiss = () => {
        setMoodSubmittedOnce(false);
        setMoodReason('');
    };

    const xpPercent = Math.min(100, Math.round((xp / xpForNextLevel) * 100));

    return (
        <div className="dashboard-page">
            <UserMenu onSignOut={handleSignOut} />

            {/* Level / streak banner */}
            <div className="glass-panel level-banner">

                <Link to="/view-profile" className="level-banner-avatar-link">
                    <div className="level-banner-avatar-circle">
                        <button className="dashboard-page-trigger" aria-label="View Profile">
                            <svg viewBox="0 0 32 32" className="constellation-icon" aria-hidden="true">
                                <line x1="9" y1="10" x2="16" y2="22" className="constellation-line" />
                                <line x1="16" y1="22" x2="24" y2="9" className="constellation-line" />
                                <line x1="9" y1="10" x2="24" y2="9" className="constellation-line" />
                                <circle cx="9" cy="10" r="2" className="constellation-star" />
                                <circle cx="16" cy="22" r="2" className="constellation-star" />
                                <circle cx="24" cy="9" r="2" className="constellation-star" />
                            </svg>
                        </button>
                    </div>
                    <span className="level-banner-avatar-label">View my profile</span>
                </Link>

                <div className="level-banner-identity">
                    <span className="level-banner-greeting">Welcome, {firstName}!</span>
                    <span className="level-banner-rank">Cosmic Rank - Level {level}</span>
                </div>

                <div className="xp-bar-wrap">
                    <div className="xp-bar-label">
                        <span>XP</span>
                        <span>{xp} / {xpForNextLevel}</span>
                    </div>
                    <div className="xp-bar-track">
                        <div className="xp-bar-fill" style={{ width: `${xpPercent}%` }} />
                    </div>
                </div>

                <div className="streak-badge">🔥 {streak} day streak</div>
            </div>

            {/* Mood check-in */}
            <div className="mood-checkin">
                <div className="glass-panel mood-slider-box">
                    <span className="mood-slider-prompt">How are you feeling? (1–10)</span>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={moodValue}
                        className="mood-slider"
                        onChange={(e) => setMoodValue(Number(e.target.value))}
                        onMouseUp={handleSliderRelease}
                        onTouchEnd={handleSliderRelease}
                    />
                    <button className="mood-view-past" type="button">
                        View past moods
                    </button>
                </div>

                <div className={`glass-panel mood-reason-box ${moodSubmittedOnce ? 'mood-reason-visible' : ''}`}>
                    <input
                        type="text"
                        placeholder="Tell me more? (optional)"
                        className="mood-reason-input"
                        value={moodReason}
                        onChange={(e) => setMoodReason(e.target.value)}
                    />
                    <button className="mood-reason-confirm" type="button" onClick={handleMoodConfirm} aria-label="Confirm mood">
                        ✓
                    </button>
                    <button className="mood-reason-dismiss" type="button" onClick={handleMoodDismiss} aria-label="Dismiss">
                        ✕
                    </button>
                </div>
            </div>

            {/* Widget row */}
            <div className="widget-grid">
                <div className="glass-panel widget-box">
                    <span className="widget-title">My Constellations</span>
                    <ul className="widget-list">
                        {MOCK_CONSTELLATIONS.length === 0 ? (
                            <li className="widget-list-empty">No constellations yet</li>
                        ) : (
                            MOCK_CONSTELLATIONS.map((c) => (
                                <li key={c} className="widget-list-item">{c}</li>
                            ))
                        )}
                    </ul>
                    <button className="widget-add-btn" type="button">+ Create constellation</button>
                </div>

                <div className="glass-panel widget-box">
                    <span className="widget-title">My Stars</span>
                    <ul className="widget-list">
                        {MOCK_STARS.length === 0 ? (
                            <li className="widget-list-empty">No stars yet</li>
                        ) : (
                            MOCK_STARS.map((s) => (
                                <li key={s} className="widget-list-item">{s}</li>
                            ))
                        )}
                    </ul>
                    <button className="widget-add-btn" type="button">+ Create star</button>
                </div>

                <div className="glass-panel widget-box">
                    <span className="widget-title">Latest Transactions</span>
                    <ul className="widget-list">
                        {MOCK_TRANSACTIONS.length === 0 ? (
                            <li className="widget-list-empty">No transactions yet</li>
                        ) : (
                            MOCK_TRANSACTIONS.map((t) => (
                                <li key={t} className="widget-list-item">{t}</li>
                            ))
                        )}
                    </ul>
                    <button className="widget-add-btn" type="button">+ Add transaction</button>
                </div>
            </div>
        </div>
    );
}
