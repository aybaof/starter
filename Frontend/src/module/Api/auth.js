import { HttpClient } from "../HttpClient";

export class AuthClient extends HttpClient{
    constructor(baseURL){
        super({
            baseURL
        })
    }

    get Auth(){
        return {
            create : (user) => this.post("/signup" , user),
        }
    }
}