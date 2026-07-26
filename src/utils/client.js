const BASE_URL = 'http://localhost:8080/api'; // match your Spring Boot server

async function request(path, options = {}) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? {Authorization: `Bearer ${token}`} : {}),
            ...options.headers,
        },
    });

    if (!response.ok) {
        const message = await response.text().catch(() => response.statusText);
        throw new Error(message || `Request failed: ${response.status}`);
    }
    if (response.status === 204) return null;
    return response.json();
}

export const apiGet = (path) => request(path, {method: 'GET'});
export const apiPost = (path, body) => request(path, {method: 'POST', body: JSON.stringify(body)});
export const apiPut = (path, body) => request(path, {method: 'PUT', body: JSON.stringify(body)});
export const apiDelete = (path) => request(path, {method: 'DELETE'});