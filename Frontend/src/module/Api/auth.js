import { HttpClient } from "../HttpClient";

export class AuthClient extends HttpClient{
    constructor(_baseURL , _headers){
        super({
            _baseURL,
            _headers
        })
    }

    get Auth(){
        return {
            create : (user) => this.post("signup" , user),
            login : (user) => this.post("signin" , user)
        }
    }
}