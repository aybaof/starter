import { HttpClient } from "../HttpClient";

export class AuthClient extends HttpClient{
    constructor(_baseURL , _headers){
        super({
            _baseURL,
            _headers
        })

        this._baseURL = this._baseURL + "auth/"
    }

    get Auth(){
        return {
            create : (user) => this.post("signup" , user),
            login : (user) => this.post("signin" , user),
            init : () => this.get("")
        }
    }
}

const authClient = new AuthClient();

export const AuthApi = authClient.Auth;