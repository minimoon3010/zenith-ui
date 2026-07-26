import {useState, useEffect, useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {createConstellation, viewConstellationById} from '../../utils/constellation.js';
import '../../styles/constellation.css';

export default function CreateConstellation({mode}) {
    const navigate = useNavigate();
    const {constellationId} = useParams();
    const missionNameRef = useRef(null);

    const [missionName, setMissionName] = useState('');
    const [objective, setObjective] = useState('');
    const [nameInvalid, setNameInvalid] = useState(false);
    const [constellation, setConstellation] = useState(null);
    const [loading, setLoading] = useState(mode === 'view');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const close = () => navigate(-1);

    useEffect(() => {
        if (mode !== 'view') return;
        viewConstellationById(constellationId)
            .then(setConstellation)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [mode, constellationId]);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!missionName.trim()) {
            setError('Mission name is required');
            setNameInvalid(true);
            return;
        }
        setNameInvalid(false);
        setSubmitting(true);
        setError(null);
        try {
            await createConstellation({
                missionName: missionName.trim(),
                objective: objective.trim() || null,
            });
            window.dispatchEvent(new Event('constellation-created'));
            close();
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="constellation-overlay" onClick={close}>
            <div className="glass-panel constellation-popup" onClick={(e) => e.stopPropagation()}>
                {mode === 'create' ? (
                    <form onSubmit={handleCreate}>
                        <span className="widget-title">New Constellation</span>

                        <label className="constellation-field-label" htmlFor="missionName">
                            Mission name
                        </label>
                        <input
                            id="missionName"
                            ref={missionNameRef}
                            type="text"
                            placeholder="e.g. Morning Routine"
                            value={missionName}
                            onChange={(e) => {
                                setMissionName(e.target.value);
                                if (nameInvalid) setNameInvalid(false);
                            }}
                            onAnimationEnd={() => missionNameRef.current?.classList.remove('shake')}
                            autoFocus
                            className={nameInvalid ? 'field-invalid shake' : ''}
                        />

                        <label className="constellation-field-label" htmlFor="objective">
                            Objective (optional)
                        </label>
                        <textarea
                            id="objective"
                            placeholder="What's this constellation for?"
                            value={objective}
                            onChange={(e) => setObjective(e.target.value)}
                            rows={3}
                        />

                        {error && <p className="form-error">{error}</p>}

                        <div className="constellation-popup-actions">
                            <button type="button" className="cancel-btn" onClick={close} disabled={submitting}>
                                Cancel
                            </button>
                            <button type="submit" disabled={submitting}>
                                {submitting ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                    </form>
                ) : loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="form-error">Couldn't load constellation</p>
                ) : (
                    <div>
                        <span className="widget-title">{constellation.missionName}</span>
                        {constellation.objective && <p>{constellation.objective}</p>}
                        <button type="button" onClick={close}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
}