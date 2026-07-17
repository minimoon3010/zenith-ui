import { useState } from 'react';
import '../styles/authenticate.css';

export default function Authenticate() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);

            // temporary — replace with real navigation once routing exists
            alert('Login successful!');

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="display" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-lg)' }}>
                    Zenith
                </h1>

                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Email or username"
                        className="login-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p style={{ color: 'var(--color-pink)', fontSize: '0.85rem' }}>{error}</p>}
                    <button type="submit" className="login-button">
                        Sign In
                    </button>
                </form>

                <p className="login-footer">
                    Not a user? <a href="/register" className="login-link">Create an account</a>
                </p>
            </div>
        </div>
    );
}