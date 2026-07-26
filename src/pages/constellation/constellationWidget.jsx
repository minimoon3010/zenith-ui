import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {viewAllConstellations} from "../../utils/constellation.js";
import '../../styles/widgets.css'
import '../../styles/dashboard.css'

export default function ConstellationWidget() {
    const navigate = useNavigate();
    const location = useLocation();

    const [constellations, setConstellations] = useState([]);
    const [loadingConstellations, setLoadingConstellations] = useState(true);
    const [constellationsError, setConstellationsError] = useState(null);

    useEffect(() => {
        async function loadConstellations() {
            try {
                const data = await viewAllConstellations();
                const latestFive = [...data]
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5);
                setConstellations(latestFive);
            } catch (err) {
                setConstellationsError(err.message);
            } finally {
                setLoadingConstellations(false);
            }
        }

        loadConstellations().catch((err) => console.error('Unexpected error loading constellations:', err));

        window.addEventListener('constellation-created', loadConstellations);
        return () => window.removeEventListener('constellation-created', loadConstellations);
    }, []);

    return (
            <div className="glass-panel widget-box">
                <span className="widget-title">My Constellations</span>
                {loadingConstellations ? (
                    <p className="widget-list-empty">Loading...</p>
                ) : constellationsError ? (
                    <p className="widget-list-empty">Couldn't load constellations</p>
                ) : (
                    <ul className="widget-list">
                        {constellations.length === 0 ? (
                            <li className="widget-list-empty">No constellations yet</li>
                        ) : (
                            constellations.map((c) => (
                                <li
                                    key={c.id}
                                    className="widget-list-item"
                                    onClick={() => navigate(`/constellation/view/id/${c.id}`,
                                        {state: {backgroundLocation: location}})}
                                >
                                    {c.missionName}
                                </li>
                            ))
                        )}
                    </ul>
                )}
                <button
                    className="widget-add-btn"
                    type="button"
                    onClick={() => navigate('/constellation/new',
                        {state: {backgroundLocation: location}})}>
                    + Create constellation
                </button>
            </div>
    )
}