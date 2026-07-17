import { jwtDecode } from 'jwt-decode';

export function getCurrentUserId() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.sub; // 'sub' is the standard JWT claim for subject — your JWTUtil sets this to userId
    } catch {
        return null;
    }
}