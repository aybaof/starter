import { toast } from "react-toastify";

export class HttpClient {
    constructor(init = {}) {
        this._baseURL = init._baseURL || `api/`;
        this._headers = init._headers || { "Content-Type": "application/json" };
    }

    setHeader(key, value) {
        this._headers[key] = value;
        return this;
    }

    getHeader(key) {
        return this._headers[key]
    }

    setBearerAuth(token) {
        this._headers.Authorization = `Bearer ${token}`;
        window.localStorage.setItem("Authorization", token);
        return this;
    }

    async _fetchApi(endpoint, options = {}) {
        try {
            const res = await fetch(this._baseURL + endpoint, {
                credentials: 'include',
                headers: this._headers,
                ...options
            })

            if (!res.ok) {
                toast.warn(res.reason)
                throw new Error(res.statusText);
            }

            if (options.parseReponse !== false && res.status !== 204) {
                const data = await res.json()
                const newToken = res.headers.get("Refresh-Token") || false
                if (newToken) {
                    this.setBearerAuth(newToken)
                    window.localStorage.setItem("Authorization", newToken);
                }
                return data
            }
            return undefined
        } catch (err) {
            return false
        }
    }

    async _formData(endpoint, body, options = {}) {
        delete this._headers['Content-Type'];
        const res = await this._fetchApi(
            endpoint, {
            ...options,
            body: body,
            method: 'POST',
            credentials: 'include'
        }
        )
        this._headers['Content-Type'] = "application/json"
        return res;
    }

    get(endpoint, options = {}) {
        return this._fetchApi(
            endpoint,
            {
                ...options,
                method: 'GET'
            }
        )
    }

    post(endpoint, body, options = {}) {
        return this._fetchApi(
            endpoint,
            {
                ...options,
                body: JSON.stringify(body),
                method: 'POST'
            }
        )
    }

    put(endpoint, body, options = {}) {
        return this._fetchApi(
            endpoint,
            {
                ...options,
                body: JSON.stringify(body),
                method: 'PUT'
            }
        )
    }

    delete(endpoint, body, options = {}) {
        return this._fetchApi(
            endpoint,
            {
                ...options,
                body: JSON.stringify(body),
                method: 'DELETE'
            }
        )
    }
}

export const HttpInstance = new HttpClient();