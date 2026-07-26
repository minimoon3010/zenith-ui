import {useState} from 'react';
import UserMenu from './design/userMenu.jsx';
import '../styles/dashboard.css';
import {useNavigate} from 'react-router-dom';
import LevelBanner from "./design/levelBanner.jsx";
import Widgets from "./design/widgets.jsx";

export default function Dashboard() {
    const navigate = useNavigate();

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
        console.log('Submitting mood:', {status: moodValue, energy: moodReason});
        setMoodSubmittedOnce(false);
        setMoodReason('');
    };

    const handleMoodDismiss = () => {
        setMoodSubmittedOnce(false);
        setMoodReason('');
    };

    return (
        <div className="dashboard-page">
            <UserMenu onSignOut={handleSignOut}/>
            <LevelBanner/>

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
                    <button className="mood-reason-confirm" type="button" onClick={handleMoodConfirm}
                            aria-label="Confirm mood">
                        ✓
                    </button>
                    <button className="mood-reason-dismiss" type="button" onClick={handleMoodDismiss}
                            aria-label="Dismiss">
                        ✕
                    </button>
                </div>
            </div>

            <Widgets/>
        </div>
    );
}
