const API_BASE_URL = "http://localhost:8080/api";

export async function apiRequest(endpoint, method = "GET", body = null, headers = {}) {
    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
    };

    if (body) config.body = JSON.stringify(body);

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error en la solicitud");
        }

        return data;
    } catch (error) {
        throw error;
    }
}