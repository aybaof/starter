export class HttpClient {
    constructor(init = {}){
        this._baseURL = init._baseURL || "";
        this._headers = init._headers || {};
    }

    setHeader(key , value){
        this._headers[key] = value;
        return this;
    }

    getHeader(key){
        return this._headers[key]
    }

    setBearerAuth(token) {
        this._headers.Authorization = `Bearer ${token}`;
        return this;
    }

    async _fetchApi(endpoint , options = {}){
        const res = await fetch(this._baseURL + endpoint , {
            ...options,
            headers : this._headers
        })

        if(!res.ok) throw new Error(res.statusText);

        if(options.parseReponse !== false && res.status !== 204) return await res.json()

        return undefined
    }

    get(endpoint , body = {}){
        return this._fetchApi(
            endpoint,
            {
                ...options,
                method : 'GET' 
            }
        )
    }

    post(endpoint , body , options = {}){
        return this._fetchApi(
            endpoint,
            {
                ...options,
                body : JSON.stringify(body),
                method : 'POST' 
            }
        )
    }

    put(endpoint , body , options = {}){
        return this._fetchApi(
            endpoint,
            {
                ...options,
                body : JSON.stringify(body),
                method : 'PUT' 
            }
        )
    }
    
    delete(endpoint , body , options = {}){
        return this._fetchApi(
            endpoint,
            {
                ...options,
                body : JSON.stringify(body),
                method : 'DELETE'
            }
        )
    }
}