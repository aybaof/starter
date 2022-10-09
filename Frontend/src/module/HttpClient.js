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
        window.localStorage.setItem("Authorization" , token);
        return this;
    }

    async _fetchApi(endpoint , options = {}){
        const res = await fetch(this._baseURL + endpoint , {
            ...options,
            headers : this._headers
        })

        if(!res.ok) throw new Error(res.statusText);

        if(options.parseReponse !== false && res.status !== 204){
            const data = await res.json()
            const newToken = res.headers.get("Refresh-Token") || false
            if(newToken){
                this.setBearerAuth(newToken)
                window.localStorage.setItem("Authorization" , newToken);
            }
            return data  
        }  

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

export const HttpInstance = new HttpClient({
    _baseURL : "http://localhost:5000/api/" ,
    _headers : {
        "Content-Type" : "application/json"
    }
});