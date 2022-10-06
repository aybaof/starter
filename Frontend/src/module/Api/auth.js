import { HttpClient } from "../HttpClient";

export class AuthClient extends HttpClient{
    constructor(_baseURL){
        super({
            _baseURL,
        })
    }

    get Auth(){
        return {
            create : (user) => this.post("/signup" , user),
            login : (user) => this.post("/signin" , user)
        }
    }
}