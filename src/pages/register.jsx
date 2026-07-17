import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/authenticate.css';

export default function Register() {
    const [form, setForm] = useState({ firstName: '', username: '', email: '', password: '', birthday: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!response.ok) throw new Error('Registration failed');

            navigate('/'); // send them to login once registered
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
                    <input name="firstName" placeholder="First name" className="login-input" value={form.firstName} onChange={handleChange} />
                    <input name="username" placeholder="Username" className="login-input" value={form.username} onChange={handleChange} />
                    <input name="email" type="email" placeholder="Email" className="login-input" value={form.email} onChange={handleChange} />
                    <input name="password" type="password" placeholder="Password" className="login-input" value={form.password} onChange={handleChange} />
                    <input name="birthday" type="date" className="login-input" value={form.birthday} onChange={handleChange} />
                    {error && <p style={{ color: 'var(--color-pink)', fontSize: '0.85rem' }}>{error}</p>}
                    <button type="submit" className="login-button">Create Account</button>
                </form>
                <p className="login-footer">
                    Already have an account? <Link to="/" className="login-link">Sign in</Link>
                </p>
            </div>
        </div>
    );
}